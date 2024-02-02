import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteTask } from '../TaskReducer';


const Pending = () => {

    const tasks = useSelector((state) => state.tasks.taskList);  // Assuming 'taskList' is the array in your state
    const dispatch = useDispatch();

    const handleDelete = (id) => {
        dispatch(deleteTask({ id }));
    }


    const pendingTasks = tasks.filter((task) => task.status === 'pending');

    return (
        <div>
            <h1 className='pt-4  text-xl font-semibold '>Pending Tasks</h1>

            {/* Pending Task */}
            <div className="flex-grow p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-auto">
                    {pendingTasks.map((task) => (
                        <div key={task.id} className="bg-red-100 p-4 rounded-md shadow-md shadow-gray-300 hover:shadow-lg transition">
                            <p className="font-bold mb-2">{task.title}</p>
                            <p className="text-sm mb-2">{task.description}</p>
                            <p className="text-xs mb-2">Due Date: {task.dueDate}</p>
                            <p className="text-xs text-red-700">Status: Pending</p>
                            <div className="flex gap-2 mt-2">
                                <Link to={`/edit/${task.id}`} className="text-blue-50 bg-blue-700 text-xs px-2 py-1 rounded-md">
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(task.id)}
                                    className="text-red-50 bg-red-700 text-xs px-2 py-1 rounded-md"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Pending;
