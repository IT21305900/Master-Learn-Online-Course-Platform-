// app/page.tsx
import { Suspense } from 'react';
import { Course } from '@/util/types';
// import Header from '@/components/Header';
// import HeroSection from '@/components/HeroSection';


import CoursesContainer from '@/components/course/CourseContainer';


async function getCourses(): Promise<Course[]> {
  try {
    // When running inside Docker network, we can use service names
    const response = await fetch('http://nginx/course', {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Error fetching courses: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to fetch courses:', error);
    throw error;
  }
}

export default async function Page() {
  let courses: Course[] = [];
  let error: Error | null = null;
  
  try {
    courses = await getCourses();
  } catch (err) {
    error = err as Error;
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Header />
      <HeroSection />
       */}
      <main className="container px-4 py-8 mx-auto">
        <h2 className="mb-6 text-3xl font-bold text-center text-gray-800">Available Courses</h2>
        
        <Suspense fallback={
          <div className="flex items-center justify-center py-12">
            <div className="w-12 h-12 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600"></div>
          </div>
        }>
          <CoursesContainer courses={courses} error={error} />
        </Suspense>
      </main>
      
      <footer className="py-8 mt-12 text-center text-white bg-gray-800">
        <div className="container mx-auto">
          <p>&copy; {new Date().getFullYear()} EduLearn LMS. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}