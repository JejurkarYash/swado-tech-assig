import React, { useState } from 'react'
import axios from 'axios';

const AddStudentCard = ({ setNewStudent, newStudent }: { setNewStudent: (input: boolean) => void, newStudent: boolean }) => {
    const [studentName, setStudentName] = useState<string>("");
    const [studentEmail, setStudentEmail] = useState<string>("");



    // Adding students into db  
    const handleAddStudent = async () => {


        if (!studentName || !studentEmail) {
            alert("Please fill all the fields");
            return;
        }

        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/student`, {
            name: studentName,
            email: studentEmail
        })
            .then(response => {
                console.log("Student added successfully:", response.data);
                // Reset form fields
                setStudentName("");
                setStudentEmail("");
                setNewStudent(!newStudent);
            })
            .catch(error => {
                console.error("Error adding student:", error);
            });
    }

    return (
        <div className="card p-4 sm:p-6 rounded-md border border-[var(--border)] flex flex-col gap-4 sm:gap-6 w-full overflow-x-hidden  md:overflow-x-hidden md:w-[60vw] lg:w-[70vw] ">
            <h1 className="text-lg sm:text-xl font-medium">
                <span className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 sm:h-6 sm:w-6"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>
                    Add New Students
                </span>
            </h1>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full">
                <div className="flex flex-col gap-2 w-full sm:w-1/2">
                    <label htmlFor="name">
                        <span className="flex gap-2 items-center text-sm sm:text-base">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                            Student Name
                        </span>
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={studentName}
                        required
                        onChange={(e) => setStudentName(e.target.value)}
                        className="border border-[var(--border)] text-sm sm:text-base p-2 sm:p-3 rounded-md mt-2 
                                outline-none focus:border-[var(--border-strong)] w-full bg-transparent
                                transition-colors duration-200 "
                        placeholder="Enter Student Name"
                    />
                </div>
                <div className="flex flex-col gap-2 w-full sm:w-1/2">
                    <label htmlFor="email">
                        <span className="flex gap-2 items-center text-sm sm:text-base">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                            Email Address
                        </span>
                    </label>
                    <input
                        type="email"
                        id="email"
                        required
                        value={studentEmail}
                        onChange={(e) => setStudentEmail(e.target.value)}
                        className="border border-[var(--border)] text-sm sm:text-base p-2 sm:p-3 rounded-md mt-2 
                                outline-none focus:border-[var(--border-strong)] w-full bg-transparent
                                transition-colors duration-200"
                        placeholder="Enter Email Address"
                    />
                </div>
            </div>

            <button
                onClick={handleAddStudent}
                className="bg-white text-black px-6 py-2 rounded-md font-medium 
                        cursor-pointer hover:shadow-lg text-sm sm:text-base
                        transition-all duration-200 ease-in-out
                        hover:bg-gray-100 active:bg-gray-200 md:w-[150px]"
            >Add Student</button>

        </div>
    )
}

export default AddStudentCard