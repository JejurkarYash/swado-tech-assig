import React, { useEffect, useState } from 'react'
import { useStudent } from '../hook/useStudents'
import { useCourses } from '../hook/useCourses'
import axios from 'axios'



// const students = [
//     {
//         id: 1,
//         student: "Yash Jejurkar"
//     },
//     {
//         id: 2,
//         student: "Suraj Sangle"
//     },
//     {
//         id: 3,
//         student: "Runesh Kakad"
//     }
// ]
// const courses = [
//     {
//         id: 1,
//         course: "Learn Reactjs"
//     },
//     {
//         id: 2,
//         course: "Master Nextjs"
//     },
//     {
//         id: 3,
//         course: "Learn Ruby on Rails"
//     }
// ]

type Student = {
    name: string,
    email: string,
    id: number
}

type Course = {
    course_name: string,
    duration: string,
    id: number
}


const EnrollementCard = ({ newCourse, newStudent }: { newCourse: boolean, newStudent: boolean }) => {
    const [students, setStudents] = useState<Student[] | []>([]);
    const [courses, setCourses] = useState<Course[] | []>([])
    const [studentId, setStudentId] = useState<number>();
    const [courseId, setCourseId] = useState<number>();

    useEffect(() => {

        const getData = async () => {
            const stud = await useStudent();
            setStudents(stud);
            const cour = await useCourses();
            setCourses(cour);

            console.log(students)
            console.log(courses);

        }
        getData();
    }, [newStudent, newCourse])


    const handleAddEnrollment = async () => {

        if (!courseId || !studentId) {
            alert("please select a value");
            return;
        }

        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/enroll-students`, {
            course_id: courseId,
            student_id: studentId
        }).then(() => {
            console.log("student enroll sucessfully");
            setCourseId(0);
            setStudentId(0);

        }).catch((e) => {
            console.log("error in enrolling student");

        })


    }


    return (
        <div className="card p-4 rounded-md border border-[var(--border)] flex flex-col gap-4 w-full md:w-[60vw] lg:w-[70vw] ">
            <h1 className="text-lg md:text-xl font-medium">
                <span className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-user-plus h-5 w-5"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><line x1="19" x2="19" y1="8" y2="14"></line><line x1="22" x2="16" y1="11" y2="11"></line></svg>
                    Enroll Students in Course
                </span>
            </h1>

            <div className="flex flex-col md:flex-row gap-6 w-full">
                <div className="flex flex-col gap-2 w-full md:w-1/2">
                    <label htmlFor="student"><span className="flex gap-2 items-center text-sm md:text-base">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-users h-4 w-4"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                        Select Student
                    </span></label>
                    <select
                        value={studentId}
                        onChange={(e) => setStudentId(Number(e.target.value))}
                        id="student"
                        className="w-full h-11 px-3 border border-[var(--border)] bg-black text-neutral-400 
                                rounded-md transition-colors duration-200 hover:border-[var(--border-strong)]
                                focus:outline-none focus:border-[var(--border-strong)]">
                        <option value="" disabled className=''>Select Student</option>

                        {students.map((student) => (
                            <option key={student.id} value={student.id} className="py-2">{student.name}</option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col gap-2 w-full md:w-1/2">
                    <label htmlFor="course"><span className="flex gap-2 items-center text-sm md:text-base">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-book-open h-4 w-4"><path d="M12 7v14"></path><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"></path></svg>
                        Select Course
                    </span></label>
                    <select
                        value={courseId}
                        onChange={(e) => setCourseId(Number(e.target.value))}
                        id="course"
                        className="w-full h-11 px-3 border border-[var(--border)] bg-black text-neutral-400 
                                rounded-md transition-colors duration-200 hover:border-[var(--border-strong)]
                                focus:outline-none focus:border-[var(--border-strong)]">
                        <option value="" disabled>Select Course</option>
                        {courses.map((item) => (
                            <option key={item.id} value={item.id} className="py-2">{item.course_name}</option>
                        ))}
                    </select>
                </div>
            </div>

            <button
                onClick={handleAddEnrollment}
                className="bg-white text-black w-full md:w-[8rem] h-[2.6rem] rounded-md 
                            font-medium cursor-pointer hover:shadow-lg text-sm md:text-base 
                            transition-all duration-200 hover:bg-gray-100"
            >Enroll Student</button>

        </div>
    )
}

export default EnrollementCard