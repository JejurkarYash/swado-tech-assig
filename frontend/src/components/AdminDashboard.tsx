import { useState } from 'react';
import Dashboard from './Dashboard'
import SideBar from './SideBar'

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState("Students");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const renderContent = () => {
        switch (activeTab) {
            case "Students":
                return <Dashboard activeTab="students" />;
            case "Courses":
                return <Dashboard activeTab="courses" />;
            case "Enrollments":
                return <Dashboard activeTab="enrollments" />;
            case "Enrolled Students":
                return <Dashboard activeTab="enrolled" />;
            default:
                return <Dashboard activeTab="students" />;
        }
    };

    return (
        <div className="min-h-screen overflow-y-scroll overflow-x-hidden   w-full flex flex-col md:flex-row text-[var(--foreground)]">
            {/* Hamburger Menu for Mobile */}
            <button
                className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md hover:bg-[var(--border)]"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    {!isMobileMenuOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    ) : ""}
                </svg>
            </button>

            {/* Mobile Sidebar Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={() => setIsMobileMenuOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <div className={`
                fixed md:relative top-0 left-0 h-full z-40
                transform transition-transform duration-300 ease-in-out
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
                md:translate-x-0
            `}>
                <SideBar active={activeTab} setActive={(tab) => {
                    setActiveTab(tab);
                    setIsMobileMenuOpen(false);
                }} />
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-scroll   md:oveflow-hidden lg:overflow-hidden     min-h-screen md:ml-0">
                <div className=" w-full h-full p-4 md:p-0">
                    {renderContent()}
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard