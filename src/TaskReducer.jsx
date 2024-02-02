import { createSlice } from "@reduxjs/toolkit";
import { taskList as defaultTaskList } from "./Data";

// Function to initialize local storage with default data
const initializeLocalStorage = () => {
    const storedTasks = localStorage.getItem("tasks");
    if (!storedTasks) {
        localStorage.setItem("tasks", JSON.stringify(defaultTaskList));
    }
};

initializeLocalStorage(); // Call the initialization function

const taskSlice = createSlice({
    name: "tasks",
    initialState: { taskList: JSON.parse(localStorage.getItem("tasks")) || defaultTaskList },
    reducers: {
        addTask: (state, action) => {
            state.taskList.push(action.payload);
            localStorage.setItem("tasks", JSON.stringify(state.taskList));
        },
        updateTask: (state, action) => {
            const { id, title, description, dueDate, status } = action.payload;
            const updatingTask = state.taskList.find(task => task.id == id);

            if (updatingTask) {
                updatingTask.title = title;
                updatingTask.description = description;
                updatingTask.dueDate = dueDate;
                updatingTask.status = status;

                localStorage.setItem("tasks", JSON.stringify(state.taskList));
            }
        },
        deleteTask: (state, action) => {
            const { id } = action.payload;
            const updatedTaskList = state.taskList.filter(task => task.id !== id);
            state.taskList = updatedTaskList;
            localStorage.setItem("tasks", JSON.stringify(updatedTaskList));
        }
    }
});

export const { addTask, updateTask, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;
