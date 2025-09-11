import React, { useState } from 'react'
import AddStudentCard from './AddStudentCard'
import AllStudentsCard from './AllStudentsCard'
import AddCourseCard from './AddCourseCard';
import AllCourseCard from './AllCourseCard';
import EnrollementCard from './EnrollementCard';
import AllEnrollmentsCard from './AllEnrollmentsCard';

interface DashboardProps {
    activeTab: 'students' | 'courses' | 'enrollments' | 'enrolled';
}

const Dashboard: React.FC<DashboardProps> = ({ activeTab }) => {
    const [newStudent, setNewStudent] = useState(false);
    const [newCourse, setNewCourse] = useState(false);

    const getPageTitle = () => {
        switch (activeTab) {
            case 'students':
                return 'Student Management';
            case 'courses':
                return 'Course Management';
            case 'enrollments':
                return 'Course Enrollment';
            case 'enrolled':
                return 'Enrolled Students';
            default:
                return 'Dashboard';
        }
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'students':
                return (
                    <div className="w-full space-y-6 lg:max-w-full">
                        <AddStudentCard setNewStudent={setNewStudent} newStudent={newStudent} />
                        <AllStudentsCard newStudent={newStudent} />
                    </div>
                );
            case 'courses':
                return (
                    <div className="w-full space-y-6 lg:max-w-full">
                        <AddCourseCard setNewCourse={setNewCourse} newCourse={newCourse} />
                        <AllCourseCard newCourse={newCourse} />
                    </div>
                );
            case 'enrollments':
                return ( 
                    <div className="w-full space-y-6 lg:max-w-full">
                        <EnrollementCard newStudent={newStudent} newCourse={newCourse}/>
                        <AllEnrollmentsCard />
                    </div>
                );
            case 'enrolled':
                return (
                    <div className="w-full card p-4 rounded-md border border-[var(--border)] lg:max-w-full">
                        <h2>Enrolled Students List Coming Soon</h2>
                    </div>
                );
        }
    };

    return (
        <div className="lg:flex-1 w-screen flex-col flex h-screen md:oveflow-x-hidden ">
            <div className="sticky top-0 left-20  bg-[var(--background)] z-10 p-4">
                <h1 className="text-center   text-lg capitalize lg:text-left ">{getPageTitle()}</h1>
                <div className="w-full border-b border-[var(--border)] mt-4"></div>
            </div>
            <div className="flex-1 overflow-y-auto pt-4 px-4 pb-4">
                <div className="flex flex-col items-start w-full gap-4">
                    {renderContent()}
                </div>
            </div>
        </div>
    )
}

export default Dashboard