import React, { useState } from 'react'
import { useEffect } from 'react';
import { useCourses } from '../hook/useCourses';


type Course = {
    course_name: string,
    duration: string
}

const AllCourseCard = ({ newCourse }: { newCourse: boolean }) => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>("");


    useEffect(() => {
        const getCourses = async () => {
            try {
                setLoading(true);
                const data = await useCourses();
                setCourses(data);
                setError(null);

            } catch (e) {
                console.log("error fetching courses :  ", e);
                setError("Failed to load courses");

            }
            finally {
                setLoading(false);

            }

        }
        getCourses();


    }, [newCourse])




    return (
        <div className="card p-4 rounded-md border border-[var(--border)] w-full min-h-[300px] md:w-[60vw] lg:w-[70vw]" >
            <h1 className="text-lg md:text-xl font-medium">All Courses</h1>

            <div className="mt-6 overflow-x-auto">
                <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden">
                        <table className='w-full text-sm border-collapse border border-[var(--border)]'>
                            <thead className="bg-[var(--border)] bg-opacity-20">
                                <tr>
                                    <th className="text-left py-3 px-4 font-medium">Name</th>
                                    <th className="text-left py-3 px-4 font-medium">Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan={2} className="py-4 text-center">Loading...</td>
                                    </tr>
                                ) : error ? (
                                    <tr>
                                        <td colSpan={2} className="py-4 text-center text-red-500">{error}</td>
                                    </tr>
                                ) : courses.length === 0 ? (
                                    <tr>
                                        <td colSpan={2} className="py-4 text-center">No students found</td>
                                    </tr>
                                ) : (
                                    courses.map((course, index) => (
                                        <tr key={index} className="border-t border-[var(--border)] hover:bg-[var(--border)] hover:bg-opacity-10">
                                            <td className="py-3 px-4">{course.course_name}</td>
                                            <td className="py-3 px-4">{course.duration}</td>
                                        </tr>
                                    ))
                                )}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllCourseCard