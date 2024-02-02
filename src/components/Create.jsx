import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../TaskReducer';

const Create = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [status, setStatus] = useState('pending');
    const [error, setError] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const taskss = useSelector((state) => state.tasks);
    const tasks = taskss.taskList;

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title || !description || !dueDate) {
            setError('All fields are required');
            setTimeout(() => {
                setError(null);
            }, 3000);
            return;
        }

        if (description.split(/\s+/).length > 40) {
            setError('Description should not exceed 40 words');
            setTimeout(() => {
                setError(null);
            }, 3000);
            return;
        }

        const newId = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;

        const newTask = {
            id: newId,
            title: title,
            description: description,
            dueDate: dueDate,
            status: status,
        };

        dispatch(addTask(newTask));
        navigate('/');
    };

    return (
        <div className="max-w-md mx-auto mt-8 md:mt-12 p-6 rounded-md bg-gray-100 shadow-md shadow-gray-300 hover:shadow-lg transition">
            <h1 className="text-2xl font-bold mb-4">Create a New Task 📰</h1>

            {error && <div className="text-red-100 text-sm bg-red-700 inline-flex px-3 py-2 mb-4">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-600">
                        Title:
                    </label>
                    <input
                        type="text"
                        name="title"
                        placeholder="Enter title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-gray-500 placeholder:text-sm"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-600">
                        Description:
                    </label>
                    <textarea
                        name="description"
                        placeholder="Enter description (max 40 words)"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        maxLength="400"
                        className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-gray-500 placeholder:text-sm"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="dueDate" className="block text-sm font-medium text-gray-600">
                        Due Date:
                    </label>
                    <input
                        type="date"
                        name="dueDate"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-gray-500 placeholder:text-sm"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="status" className="block text-sm font-medium text-gray-600">
                        Status:
                    </label>
                    <select
                        name="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-gray-500 placeholder:text-sm"
                    >
                        <option value="pending">Pending</option>
                        {/* <option value="completed">Completed</option> */}
                    </select>
                </div>

                <button type="submit" className="bg-green-800 text-green-50 p-2 rounded-md text-sm">
                    Submit
                </button>
            </form>

            <div className="mt-4">
                <Link to="/" className="text-blue-700 text-sm">
                    Go back to Home
                </Link>
            </div>
        </div>
    );
};

export default Create;
