import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './Home';
import Create from './components/Create';
import Update from './components/Update';
import SidebarMobile from './components/SidebarMobile';
import { useState } from 'react';
import { useSelector } from 'react-redux';


function App() {
  const [show, setShow] = useState(false);
  const [state, setState] = useState("All")
  const tasks = useSelector((state) => state.tasks.taskList);

  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const toggleMobileSidebar = () => {
    setShow((prevShow) => !prevShow);
  };


  return (
    <BrowserRouter>
      <div className="flex ">
        {/* Sidebar is a shared layout */}
        <Sidebar className=" hidden sm:block" tasks={tasks} setFilteredTasks={setFilteredTasks} setState={setState} />
        <SidebarMobile className=" sm:hidden " show={show} toggleMobileSidebar={toggleMobileSidebar} tasks={tasks} setFilteredTasks={setFilteredTasks} setState={setState} />
        <div className="flex-grow overflow-y-auto bg-gray-50">
          {/* Routes inside the main content area */}
          <Routes>
            <Route path="/" element={<Home show={show} toggleMobileSidebar={toggleMobileSidebar} state={state} />} />
            <Route path="/create" element={<Create />} />
            <Route path="/edit/:id" element={<Update />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
