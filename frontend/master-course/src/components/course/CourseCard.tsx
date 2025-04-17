// components/CourseCard.tsx

import { Course } from '@/util/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';


interface CourseCardProps {
    course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
    // Generate a simple course ID for display (first 4 characters of _id or random)
    const displayId = course._id ? course._id.substring(0, 4) : Math.floor(1000 + Math.random() * 9000).toString();

    // Format date for display (current date as fallback)
    const formattedDate = new Date().toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
    });

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">{course.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription>{course.description}</CardDescription>
            </CardContent>
        </Card>
        // <div className="overflow-hidden bg-white border border-gray-100 rounded-xl shadow-sm">
        //     {/* Course Image - placeholder */}

        //     <div className="p-5">
        //         {/* Course ID and Actions Row */}
        //         <div className="flex items-center justify-between mb-3">
        //             <span className="text-xs font-medium text-gray-500">{displayId}</span>
        //             <button className="text-gray-400 hover:text-gray-600">
        //                 <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
        //                     <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
        //                 </svg>
        //             </button>
        //         </div>

        //         {/* Course Title */}
        //         <h2 className="mb-2 text-lg font-semibold text-gray-900">{course.title}</h2>

        //         {/* Course Description - limited to 2 lines */}
        //         <p className="mb-4 text-sm text-gray-600 line-clamp-2">{course.description}</p>

        //         {/* Price and Date Row */}
        //         <div className="flex items-center justify-between mt-4">
        //             <span className="text-sm font-semibold text-blue-600">${course.price.toFixed(2)}</span>
        //             <span className="text-xs text-gray-500">{formattedDate}</span>
        //         </div>

        //         {/* View Details Button - Full Width */}
        //         <button className="w-full px-4 py-2 mt-4 text-sm font-medium text-white transition-colors duration-200 bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
        //             View Details
        //         </button>
        //     </div>
        // </div>
    );
}