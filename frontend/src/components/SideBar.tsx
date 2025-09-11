import { useState } from "react";




const data = [
    {
        id: 1,
        name: "Students",
        svg: (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-users mr-3 h-4 w-4"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>)
    },
    {
        id: 2,
        name: "Courses",
        svg: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-book-open mr-3 h-4 w-4"><path d="M12 7v14"></path><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"></path></svg>
        )
    },
    {
        id: 3,
        name: "Enrollments",
        svg: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-user-plus mr-3 h-4 w-4"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><line x1="19" x2="19" y1="8" y2="14"></line><line x1="22" x2="16" y1="11" y2="11"></line></svg>
        )
    },
    {
        id: 4,
        name: "Enrolled Students",
        svg: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-graduation-cap mr-3 h-4 w-4"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"></path><path d="M22 10v6"></path><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"></path></svg>
        )
    },


]

const SideBar = ({ active, setActive }: { active: string, setActive: (name: string) => void }) => {

    return (
        <div className="border-r border-[var(--border)] w-[250px] h-screen bg-[var(--background)] p-4 text-white overflow-hidden">
            <h1 className=" text-xl font-bold  ">Admin Dashboard</h1>
            <div className=" border-b  absolute border-[var(--border)]  w-[250px] mt-4 left-0  ">
            </div>

            <div className=" mt-10  ">

                <ul className=" mt-10 flex flex-col gap-4 text-left text-sm  ">
                    {data.map((item) => (
                        <li className=" hover:bg-neutral-800 p-2 pl-4  rounded-md cursor-pointer " key={item.id} onClick={() => setActive(item.name)} style={
                            { backgroundColor: active === item.name ? 'white' : 'transparent', color: active === item.name ? 'black' : 'white' }
                        }>
                            <span className="flex items-center  ">
                                {item.svg}
                                {item.name}
                            </span></li>
                    ))}


                </ul>

            </div>
        </div >
    )
}

export default SideBar; 
