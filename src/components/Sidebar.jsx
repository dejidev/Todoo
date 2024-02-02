import React, { useState } from 'react';
import { FaBars, FaSearch } from 'react-icons/fa';
import { LuCalendarSearch } from "react-icons/lu";
import { BsSticky } from "react-icons/bs";
import { IoTodayOutline } from "react-icons/io5";
import { GoPackageDependents } from "react-icons/go";
import { Link } from 'react-router-dom';

const Sidebar = ({ tasks, setFilteredTasks, setState }) => {
    const [activeFilter, setActiveFilter] = useState('all');

    const handleSearch = (e) => {
        // Search logic here
    };

    const handleFilterClick = (filter) => {
        setActiveFilter(filter);

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
    };

    const renderNavItems = (navItems) => (
        <div className="flex flex-col items-start text-sm justify-start p-4">
            <h2 className='font-bold'>Tasks</h2>
            <div>
                <ul className='w-full'>
                    {navItems.map((task, index) => (
                        <li
                            key={index}
                            className={`flex items-center w-full gap-y-4 gap-4 my-2 hover:bg-gray-300 p-2 rounded-md cursor-pointer transition ${activeFilter === task.title.toLowerCase() ? 'bg-gray-300' : ''}`}
                            onClick={() => handleFilterClick(task.title.toLowerCase())}
                        >
                            {React.createElement(task.icon, { size: 20 })}
                            <p className=''>{task.title}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );

    return (
        <div className='w-0 sm:w-52  md:w-64 sm:block h-screen border shadow-gray-600 shadow-md '>
            {/* Desktop Sidebar */}
            <div className={`bg-gray-100 px-4 text-gray-900  `}>
                {/* Sidebar Content */}
                <div className="p-4 m-0 ">
                    <div className="text-xl flex items-center gap-9 justify-between">
                        <Link to="/"> <p> Todoo </p> </Link>
                        <FaBars />
                    </div>
                    <div className="relative my-3 opacity-0 sm:opacity-100 ">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full pl-9 pr-4 py-2 border rounded-lg focus:outline-none focus:border-gray-300 placeholder:text-sm"
                            onChange={handleSearch}
                        />
                        <div className="absolute  inset-y-0 left-0 pl-3 opacity-0 sm:opacity-100 flex items-center pointer-events-none">
                            <FaSearch color="#555" size={14} className='font-thin' />
                        </div>
                    </div>
                </div>

                {renderNavItems([
                    { icon: LuCalendarSearch, title: 'Upcoming' },
                    { icon: BsSticky, title: 'Completed' },
                    { icon: GoPackageDependents, title: 'Pending' },
                    { icon: IoTodayOutline, title: 'Today' },
                ])}

                {renderNavItems([
                    { icon: LuCalendarSearch, title: 'Personal', color: '#3498db' },
                    { icon: BsSticky, title: 'Work', color: '#e74c3c' },
                    { icon: GoPackageDependents, title: 'List1', color: '#2ecc71' },
                ])}
            </div>
        </div>
    );
};

export default Sidebar;
