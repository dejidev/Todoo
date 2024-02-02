import { Link } from 'react-router-dom';
import { IoTodayOutline } from "react-icons/io5";
import { MdAdd } from "react-icons/md";
import { FaBars, FaTimes } from 'react-icons/fa';
import All from './components/All';
import Complete from './components/Complete';
import Pending from './components/Pending';

const Home = ({ show, state, toggleMobileSidebar }) => {


    return (
        <main className='flex'>
            <div className='relative p-8 w-full'>
                <h1 className='text-xl sm:text-3xl font-semibold mb-6'> Simple TODO List 🎉</h1>

                <div className='flex items-center gap-2 font-bold text-lg'>
                    <h2>Today 🔥</h2>
                    <IoTodayOutline />
                </div>

                <button className="sm:hidden absolute top-8 right-8 text-2xl">
                    {show ? <FaTimes onClick={toggleMobileSidebar} /> : <FaBars onClick={toggleMobileSidebar} />}
                </button>

                <Link to="/create">
                    <div className=' inline-flex flex-wrap items-center gap-2 bg-blue-100 py-2 px-4 shadow-sm mt-2'>
                        <MdAdd />
                        Add Task
                    </div>
                </Link>

                {/* All Tasks */}

                {/* Conditional rendering based on the state */}
                {state === 'completed' && <Complete />}
                {state === 'pending' && <Pending />}
                {state !== 'completed' && state !== 'pending' && <All/>}
            </div>
        </main>
    );
};

export default Home;
