// components/CourseCategories.tsx
"use client";
import { useState } from 'react';

interface CourseCategoriesProps {
  categories: string[];
  onCategorySelect: (category: string) => void;
}

export default function CourseCategories({ categories, onCategorySelect }: CourseCategoriesProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    onCategorySelect(category);
  };
  
  return (
    <div className="mb-8">
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => handleCategoryClick('all')}
          className={`px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
            activeCategory === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All Courses
        </button>
        
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
              activeCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
