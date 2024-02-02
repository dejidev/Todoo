import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateTask } from '../TaskReducer';

const Update = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const taskss = useSelector((state) => state.tasks);
    const tasks = taskss.taskList;

    const existingTask = tasks.find((task) => task.id == id);

    const { title, description, dueDate, status } = existingTask;

    const [utitle, setTitle] = useState(title);
    const [udescription, setDescription] = useState(description);
    const [udueDate, setDueDate] = useState(dueDate);
    const [ustatus, setStatus] = useState(status);
    const [error, setError] = useState(null);

    const handleUpdate = (e) => {
        e.preventDefault();

        if (!utitle || !udescription || !udueDate) {
            setError('All fields are required');
            setTimeout(() => {
                setError(null);
            }, 3000);
            return;
        }

        if (udescription.split(/\s+/).length > 40) {
            setError('Description should not exceed 40 words');
            setTimeout(() => {
                setError(null);
            }, 3000);
            return;
        }

        dispatch(
            updateTask({
                id: id,
                title: utitle,
                description: udescription,
                dueDate: udueDate,
                status: ustatus,
            })
        );
        navigate('/');
    };

    return (
        <div className="mx-5 my-10">
            <div className="max-w-md mx-auto mt-8 md:mt-12 p-6 rounded-md bg-gray-100 shadow-md shadow-gray-300 hover:shadow-lg transition">
                <h2 className="text-2xl font-bold mb-4">Update Task {id} 📑</h2>

                {error && (
                    <div className="text-red-100 text-sm bg-red-700 inline-flex px-3 py-2 mb-4">{error}</div>
                )}

                <form action="POST" onSubmit={handleUpdate}>
                    <div className="mb-4">
                        <label htmlFor="title">Title: </label>
                        <input
                            type="text"
                            name="title"
                            value={utitle}
                            placeholder="Enter title"
                            onChange={(e) => setTitle(e.target.value)}
                            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-gray-500 placeholder:text-sm"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="description">Description: </label>
                        <textarea
                            name="description"
                            value={udescription}
                            placeholder="Enter description (max 40 words)"
                            onChange={(e) => setDescription(e.target.value)}
                            maxLength="400"
                            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-gray-500 placeholder:text-sm"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="dueDate">Due Date: </label>
                        <input
                            type="date"
                            name="dueDate"
                            value={udueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-gray-500 placeholder:text-sm"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="status">Status: </label>
                        <select
                            name="status"
                            value={ustatus}
                            onChange={(e) => setStatus(e.target.value)}
                            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-gray-500 placeholder:text-sm"
                        >
                            <option value="pending">Pending</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>

                    <button type="submit" className="text-white bg-green-600 p-2">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Update;
