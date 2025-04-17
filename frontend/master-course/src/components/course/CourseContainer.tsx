"use client";
// components/CoursesContainer.tsx
import { useState } from 'react';
import SearchBar from './SearchBar';
import CourseCategories from './CourseCategories';

import CoursesGrid from './CourseGrid';
import { Course } from '@/lib/types';
import ErrorMessage from '../common/ErrorMessage';

interface CoursesContainerProps {
  courses: Course[];
  error: Error | null;
}

export default function CoursesContainer({ courses, error }: CoursesContainerProps) {
  const [filteredCourses, setFilteredCourses] = useState<Course[] | null>(null);
  
  // Extract unique categories from courses
  const categories = courses && courses.length > 0
    ? Array.from(new Set(courses.map(course => course.category || 'Uncategorized')))
    : [];

  const handleSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setFilteredCourses(null); // Show all courses when search is empty
      return;
    }
    
    const lowercaseSearch = searchTerm.toLowerCase();
    const filtered = courses.filter((course) => {
      return (
        course.title.toLowerCase().includes(lowercaseSearch) ||
        (course.description && course.description.toLowerCase().includes(lowercaseSearch)) ||
        (course.instructor && course.instructor.toLowerCase().includes(lowercaseSearch))
      );
    });
    
    setFilteredCourses(filtered);
  };

  const handleCategorySelect = (category: string) => {
    if (category === 'all') {
      setFilteredCourses(null); // Show all courses
      return;
    }
    
    const filtered = courses.filter((course) => {
      return course.category === category || 
        (!course.category && category === 'Uncategorized');
    });
    
    setFilteredCourses(filtered);
  };

  return (
    <div className="mb-12">
      <SearchBar onSearch={handleSearch} />
      
      {categories.length > 0 && (
        <CourseCategories 
          categories={categories} 
          onCategorySelect={handleCategorySelect} 
        />
      )}
      
      {error ? (
        <ErrorMessage message={error.message} />
      ) : (
        <>
          {filteredCourses !== null && filteredCourses.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-xl text-gray-600">No courses match your search criteria.</p>
              <button 
                onClick={() => setFilteredCourses(null)}
                className="px-4 py-2 mt-4 text-sm font-medium text-blue-600 bg-blue-100 rounded-md hover:bg-blue-200"
              >
                Show all courses
              </button>
            </div>
          ) : (
            <CoursesGrid 
              courses={courses} 
              filteredCourses={filteredCourses}
            />
          )}
        </>
      )}
    </div>
  );
}