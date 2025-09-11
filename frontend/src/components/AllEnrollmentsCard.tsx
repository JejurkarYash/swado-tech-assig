import axios from "axios";
import { useEffect, useState } from "react"

type Course = {
    course_name: string,
    duration: string,
}

type Enrollments = {
    name: string,
    email: string,
    id: number,
    courses: Course[]

}

const AllEnrollmentsCard = () => {
    const [enrollStudents, setEnrollStudents] = useState<Enrollments[]>([]);
    const [Loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>("");

    useEffect(() => {
        const getData = async () => {

            try {

                setLoading(true);
                const result = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/enrollments`);
                console.log(result.data);
                setEnrollStudents(result.data);
                setError(null);
            } catch (e) {
                setError("Failed to fetch enrollments");
            } finally {
                setLoading(false);
            }

        }
        getData();

    }, [])


    return (

        <div className="card p-4 rounded-md border border-[var(--border)] w-full min-h-[300px] md:w-[60vw] lg:w-[70vw]">
            <h1 className="text-lg md:text-xl font-medium">All Enrolled Students</h1>

            <div className="mt-6 overflow-x-auto">

                <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden">
                        <table className="min-w-full divide-y divide-[var(--border)]">
                            <thead>
                                <tr className="bg-[var(--border)] bg-opacity-20">
                                    <th scope="col" className="px-4 py-3 text-left text-sm md:text-base font-medium whitespace-nowrap">
                                        Student Name
                                    </th>
                                    <th scope="col" className="px-4 py-3 text-left text-sm md:text-base font-medium whitespace-nowrap">
                                        Course Name
                                    </th>
                                    <th scope="col" className="px-4 py-3 text-left text-sm md:text-base font-medium whitespace-nowrap">
                                        Duration
                                    </th>
                                </tr>
                            </thead>
                            {Loading ? (
                                <thead>
                                    <tr className="text-center items-center ">
                                        <td>Loading...</td>
                                    </tr>
                                </thead>
                            )
                                :
                                <tbody className="divide-y divide-[var(--border)]">
                                    {
                                        enrollStudents.map((enroll) => (
                                            <tr className="hover:bg-[var(--border)] hover:bg-opacity-10 transition-colors duration-200">
                                                <td className="px-4 py-3 text-sm md:text-base whitespace-nowrap">{enroll.name}</td>
                                                <td className="px-4 py-3 text-sm md:text-base whitespace-nowrap">
                                                    {
                                                        enroll.courses.map((course) => (
                                                            <span>{course.course_name} , </span>
                                                        ))
                                                    }
                                                </td>
                                                <td className="px-4 py-3 text-sm md:text-base whitespace-nowrap">{

                                                    enroll.courses.map((course) => (
                                                        <span>{course.duration},</span>
                                                    ))
                                                }</td>
                                            </tr>
                                        ))
                                    }

                                </tbody>
                            }

                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllEnrollmentsCard