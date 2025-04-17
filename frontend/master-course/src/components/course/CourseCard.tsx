// components/CourseCard.tsx

import { Course } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import Link from 'next/link';



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
        <Card className="relative group group-hover:border group-hover:border-blue-300">
            {/* Category label */}
            <div className="absolute top-6 right-6 bg-yellow-400 border border-yellow-050 text-white rounded-full px-3 py-1 text-xs font-semibold z-10">
                {course.category ? course.category : 'Uncategorized'}
            </div>

            <CardHeader className="pt-24">
                <CardTitle className="text-3xl font-normal text-gray-900">{course.title}</CardTitle>
            </CardHeader>

            <CardContent>
                {/* Optional Description */}
            </CardContent>

            <CardFooter className='flex flex-col items-start gap-10'>
                <div className="flex items-center gap-3">
                    <Avatar className="w-8 h-8 border">
                        <AvatarFallback className='capitalize'>
                            {(() => {
                                const names = course.instructor?.split(" ") || [];
                                if (names.length >= 2) {
                                    return `${names[0][0]}${names[1][0]}`;
                                } else if (names.length === 1 && names[0].length > 0) {
                                    return names[0][0];
                                }
                                return "?";
                            })()}
                        </AvatarFallback>
                    </Avatar>

                    <CardDescription>
                        {course.instructor}
                    </CardDescription>
                </div>

                <div>
                    <Link href={`/course/${course.key}`}>
                        <Button size="sm" className='rounded-full W'>View the Lessons</Button>
                    </Link>
                </div>
            </CardFooter>

        </Card >


    );
}