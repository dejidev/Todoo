import React from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { LuCalendarSearch } from "react-icons/lu";
import { BsSticky } from "react-icons/bs";
import { IoTodayOutline } from "react-icons/io5";
import { GoPackageDependents } from "react-icons/go";
import { Link } from 'react-router-dom';

const SidebarMobile = ({ show, toggleMobileSidebar, tasks, setFilteredTasks, setState }) => {

    const handleSearch = (e) => {
        // Search logic here
    };

    const handleFilterClick = (filter) => {
        setState(filter);

        // Filter tasks based on the selected filter
        const filteredTasks = tasks.filter((task) => {
            if (filter === 'completed') {
                return task.status === 'completed';
            } else if (filter === 'pending') {
                return task.status === 'pending';
            } else {
                return true; // Show all tasks
            }
        });

        // Update the filtered tasks state in the parent component
        setFilteredTasks(filteredTasks);

        // Close the mobile sidebar after clicking on a filter
        toggleMobileSidebar();
    };

    const navItems = [
        { icon: LuCalendarSearch, title: 'Upcoming' },
        { icon: BsSticky, title: 'Completed' },
        { icon: GoPackageDependents, title: 'Pending' },
        { icon: IoTodayOutline, title: 'Today' },
    ];

    const nav2Items = [
        { icon: LuCalendarSearch, title: 'Personal', color: '#3498db' },
        { icon: BsSticky, title: 'Work', color: '#e74c3c' },
        { icon: GoPackageDependents, title: 'List1', color: '#2ecc71' },
    ];

    return (
        <div>
            {/* Mobile Sidebar */}
            {
                show && <nav
                    className={`sm:hidden bg-gray-300 top-0 right-0 absolute h-screen w-1/2 z-40 ease-in-out duration-300 flex flex-col items-start justify-start
                ${show ? "translate-x-0 " : "translate-x-full"}`}
                >
                    {/* Sidebar Content */}
                    <div className="p-4">
                        <div className=" my-4 mr-4 text-xl flex items-center gap-9 justify-between">
                            <Link to="/"><p> Todoo </p></Link>
                            <FaTimes className="text-2xl font-thin" onClick={toggleMobileSidebar} />
                        </div>
                        <div className="relative my-3 w-full">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full pl-9 pr-4 py-2 border rounded-lg focus:outline-none focus:border-gray-300 placeholder:text-sm"
                                onChange={handleSearch}
                            />
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaSearch color="#555" size={14} className='font-thin' />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-start text-sm justify-start p-4">
                        <h2 className='font-bold'>Tasks</h2>
                        <div>
                            <ul className='w-full'>
                                {navItems.map((task, index) => (
                                    <li
                                        key={index}
                                        className={`flex items-center w-full gap-y-4 gap-4 my-2 hover:bg-gray-300 p-2 rounded-md cursor-pointer transition`}
                                        onClick={() => handleFilterClick(task.title.toLowerCase())}
                                    >
                                        {React.createElement(task.icon, { size: 20 })}
                                        <p className=''>{task.title}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="flex flex-col items-start text-sm justify-start p-4">
                        <h2 className='font-bold'>Lists</h2>
                        <div>
                            <ul className='w-full'>
                                {nav2Items.map((task, index) => (
                                    <li
                                        key={index}
                                        className={`flex items-center gap-y-4 gap-4 my-2 hover:bg-gray-300 p-2 rounded-md cursor-pointer transition`}
                                        onClick={() => handleFilterClick(task.title.toLowerCase())}
                                    >
                                        <div
                                            className="w-6 h-6 flex items-center justify-center rounded-full bg-white"
                                            style={{ backgroundColor: task.color }}
                                        >
                                            {React.createElement(task.icon, { size: 12, color: task.color })}
                                        </div>
                                        <p>{task.title}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </nav>
            }
        </div>
    )
}

export default SidebarMobile;
