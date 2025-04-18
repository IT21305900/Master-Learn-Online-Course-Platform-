// [cid]/page.tsx
import React from 'react'
import { notFound } from 'next/navigation'
import { Course, Lesson } from '@/lib/types'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ChevronRight, BookOpen, Clock, User } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

const PROXYURL = process.env.NEXT_PUBLIC_PROXY_URL!;

async function getCourse(cid: string): Promise<Course> {
    console.log('Fetching course with ID:', cid)
    try {
        // When running inside Docker network, we can use service names
        // In Azure, change to: https://lms-nginx.azurewebsites.net/course/${cid}
        const response = await fetch(`${PROXYURL}/course/${cid}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store',
        });

        if (!response.ok) {
            throw new Error(`Error fetching course: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Failed to fetch course:', error);
        throw error;
    }
}

async function getLesson(lid: string): Promise<Lesson | null> {
    if (!lid) return null;

    try {
        // In Azure, change to: https://lms-nginx.azurewebsites.net/lesson/${lid}
        const response = await fetch(`${PROXYURL}/lesson/${lid}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store',
        });

        if (!response.ok) {
            throw new Error(`Error fetching lesson: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Failed to fetch lesson:', error);
        return null;
    }
}

export default async function CoursePage({
    params,
    searchParams
}: {
    params: { cid: string },
    searchParams: { lid?: string }
}) {
    const { cid } = params;
    const { lid } = searchParams;

    // Fetch course data
    const course = await getCourse(cid);

    if (!course) {
        return notFound();
    }

    // Fetch lesson data if lid is provided
    const lesson = lid ? await getLesson(lid) : null;

    // Get first lesson ID to show by default if no lesson selected
    const firstLessonId = (course.modules ?? []).length > 0 ? course.modules[0].lid : null;

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            {/* Course Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 shadow-md">
                <div className="container mx-auto">
                    <h1 className="text-2xl md:text-3xl font-bold">{course.title}</h1>
                    <div className="flex flex-wrap items-center gap-4 mt-2">
                        <div className="flex items-center text-sm">
                            <User className="mr-2 h-4 w-4" />
                            <span>{course.instructor}</span>
                        </div>
                        <div className="flex items-center text-sm">
                            <BookOpen className="mr-2 h-4 w-4" />
                            <span>{course.modules?.length || 0} lessons</span>
                        </div>
                        <div className="flex items-center text-sm">
                            <Clock className="mr-2 h-4 w-4" />
                            <span>Self-paced</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto flex flex-col md:flex-row gap-6 p-6">
                {/* Lesson Navigation Sidebar */}
                <div className="w-full md:w-1/4">
                    <Card className="sticky top-6">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-lg">Course Content</CardTitle>
                            <CardDescription>
                                {course.modules?.length || 0} lessons
                            </CardDescription>
                        </CardHeader>
                        <Separator />
                        <CardContent className="p-0">
                            <ScrollArea className="h-[calc(100vh-20rem)]">
                                <div className="p-4">
                                    {course.modules?.map((module, index) => (
                                        <Link
                                            key={module.lid.toString()}
                                            href={`/course/${cid}?lid=${module.lid}`}
                                        >
                                            <div className={`flex items-center p-3 mb-2 rounded-md transition-colors ${module.lid.toString() === lid ?
                                                'bg-blue-100 text-blue-700 font-medium' :
                                                'hover:bg-gray-100'
                                                }`}>
                                                <div className="mr-3 flex-shrink-0 w-6 h-6 flex items-center justify-center bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                                                    {index + 1}
                                                </div>
                                                <div className="flex-grow">
                                                    <p className="text-sm font-medium">{module.title}</p>
                                                </div>
                                                <ChevronRight className="h-4 w-4 text-gray-400" />
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </ScrollArea>
                        </CardContent>
                    </Card>
                </div>

                {/* Lesson Content Area */}
                <div className="w-full md:w-3/4">
                    <Card className="h-full">
                        {lesson ? (
                            <>
                                <CardHeader>
                                    <CardTitle>{lesson.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="prose max-w-none">
                                        {lesson.content}
                                    </div>
                                </CardContent>
                            </>
                        ) : lid ? (
                            <div className="flex items-center justify-center h-[calc(100vh-20rem)]">
                                <div className="text-center">
                                    <h3 className="text-lg font-medium">Lesson not found</h3>
                                    <p className="text-gray-500 mt-2">The requested lesson could not be loaded.</p>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center h-[calc(100vh-20rem)]">
                                <div className="text-center p-8">
                                    <BookOpen className="mx-auto h-12 w-12 text-blue-600 mb-4" />
                                    <h3 className="text-xl font-medium">Ready to start learning?</h3>
                                    <p className="text-gray-500 mt-2 mb-6">Select a lesson from the sidebar to begin this course.</p>
                                    {firstLessonId && (
                                        <Button asChild>
                                            <Link href={`/course/${cid}?lid=${firstLessonId}`}>
                                                Start First Lesson
                                            </Link>
                                        </Button>
                                    )}
                                </div>
                            </div>
                        )}
                    </Card>
                </div>
            </div>
        </div>
    );
}