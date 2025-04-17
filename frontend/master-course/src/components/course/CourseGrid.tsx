
import { Course } from '@/util/types';
import CourseCard from './CourseCard';

interface CoursesGridProps {
  courses: Course[];
  filteredCourses: Course[] | null;
}

export default function CoursesGrid({ courses, filteredCourses }: CoursesGridProps) {
  const coursesToDisplay = filteredCourses || courses;
  
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {coursesToDisplay.map((course) => (
        <CourseCard key={course._id} course={course} />
      ))}
    </div>
  );
}
