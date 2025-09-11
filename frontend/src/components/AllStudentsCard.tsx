"use client"

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useStudent } from "../hook/useStudents";

type Student = {
    name: string,
    email: string
}

const AllStudentsCard = ({ newStudent }: { newStudent: boolean }) => {
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getStudentData = async () => {
            try {
                setLoading(true);
                const data = await useStudent();
                setStudents(data);
                setError(null);
            } catch (err) {
                console.error('Error fetching students:', err);
                setError('Failed to load students');
            } finally {
                setLoading(false);
            }
        };

        getStudentData();
    }, [newStudent]);


    return (
        <div className=" card  p-4 overflow-y-scroll rounded-md border border-[var(--border)] min-h-[300px md:w-[60vw] lg:w-[70vw] " >
            <h1>All Students</h1>

            <div className='mt-6'>
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
                        ) : students.length === 0 ? (
                            <tr>
                                <td colSpan={2} className="py-4 text-center">No students found</td>
                            </tr>
                        ) : (
                            students.map((student, index) => (
                                <tr key={index} className="border-t border-[var(--border)] hover:bg-[var(--border)] hover:bg-opacity-10">
                                    <td className="py-3 px-4">{student.name}</td>
                                    <td className="py-3 px-4">{student.email}</td>
                                </tr>
                            ))
                        )}

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AllStudentsCard