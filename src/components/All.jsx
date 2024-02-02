import { useSelector, useDispatch, } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteTask } from '../TaskReducer';

const All = ( ) => {
    const tasks = useSelector((state) => state.tasks.taskList); 

    const dispatch = useDispatch();

    const handleDelete = (id) => {
        dispatch(deleteTask({ id }));
    }

    return (
        <div>
            <h1 className='pt-4 text-xl font-semibold '>
                All Tasks            </h1>
            {/* All Tasks */}
            <div className="flex-grow p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-auto">
                    {tasks.map((task) => (
                        <div key={task.id} className={`bg-gray-100 p-4 rounded-md shadow-md shadow-gray-300 hover:shadow-lg transition ${task.status === 'completed' ? 'bg-green-100' : 'bg-red-100'}`}>
                            <p className="font-bold mb-2">{task.title}</p>
                            <p className="text-sm mb-2">{task.description}</p>
                            <p className="text-xs mb-2">Due Date: {task.dueDate}</p>
                            <p className={`text-xs ${task.status === 'completed' ? 'text-green-700' : 'text-red-700'}`}>
                                Status: {task.status}
                            </p>
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
    );
}

export default All;



