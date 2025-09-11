import React, { useState } from 'react'
import axios from "axios";

const AddCourseCard = ({ setNewCourse, newCourse }: { setNewCourse: (input: boolean) => void, newCourse: boolean }) => {
    const [courseName, setCourseName] = useState("");
    const [courseDuration, setCourseDuration] = useState("");

    const handleAddCourse = async () => {

        if (!courseName || !courseDuration) {
            alert("please provide feilds");
            return;
        }

        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/course`, {
            course_name: courseName,
            duration: courseDuration
        }).then(() => {
            console.log("course insetted succesfully ");
            setNewCourse(!newCourse);
            setCourseName("");
            setCourseDuration("");

        }).catch((e) => {
            console.log("something went wrong ", e)
        })


    }


    return (
        <div className="card p-4 rounded-md border border-[var(--border)] flex flex-col gap-4 w-full md:w-[60vw] lg:w-[70vw] ">
            <h1 className="text-lg md:text-xl font-medium">
                <span className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-plus h-5 w-5"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>
                    Add New Courses
                </span>
            </h1>

            <div className="flex flex-col md:flex-row gap-4 w-full">
                <div className="flex flex-col gap-2 w-full md:w-1/2">
                    <label htmlFor="name"><span className="flex gap-2 items-center text-sm md:text-base">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-book-open h-4 w-4"><path d="M12 7v14"></path><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"></path></svg>
                        Course Name
                    </span></label>
                    <input
                        type="text"
                        id="name"
                        value={courseName}
                        onChange={(e) => setCourseName(e.target.value)}
                        className="border border-[var(--border)] text-sm md:text-base p-2 md:p-3 rounded-md mt-2 
                                outline-none focus:border-[var(--border-strong)] w-full bg-transparent
                                transition-colors duration-200"
                        placeholder="Enter Course Name"
                    />
                </div>
                <div className="flex flex-col gap-2 w-full md:w-1/2">
                    <label htmlFor="duration"><span className="flex gap-2 items-center text-sm md:text-base">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-clock h-4 w-4"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                        Duration</span>
                    </label>
                    <input
                        type="text"
                        id="duration"
                        value={courseDuration}
                        onChange={(e) => setCourseDuration(e.target.value)}
                        className="border border-[var(--border)] text-sm md:text-base p-2 md:p-3 rounded-md mt-2 
                                outline-none focus:border-[var(--border-strong)] w-full bg-transparent"
                        placeholder="eg. 8 weeks , 3 months"
                    />
                </div>
            </div>

            <button
                onClick={handleAddCourse}
                className="bg-white text-black w-full md:w-[8rem] h-[2.4rem] md:h-[2.6rem] rounded-md 
                            font-medium cursor-pointer hover:shadow-lg text-sm md:text-base 
                            transition-all duration-200 hover:bg-gray-100"
            >Add Course</button>

        </div>
    )
}

export default AddCourseCard