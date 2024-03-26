import React, { useState } from 'react';

function TaskManager() {
    // State variable to store tasks
    const [tasks, setTasks] = useState([]);

    // Function to handle form submission and add task
    const addTask = (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        // Get form input values
        const taskTitle = event.target.elements.taskTitle.value;
        const taskDescription = event.target.elements.taskDescription.value;
        const taskDeadline = event.target.elements.taskDeadline.value;
        const taskPriority = event.target.elements.taskPriority.value;

        // Create new task object
        const newTask = {
            id: tasks.length + 1, // Assign a unique id
            title: taskTitle,
            description: taskDescription,
            deadline: taskDeadline,
            priority: taskPriority,
            status: 'to be completed' // Default status
        };

        // Apply deadline styling
        applyDeadlineStyling();

        // Update tasks array with new task
        setTasks(prevTasks => [...prevTasks, newTask]);

        // Clear form inputs
        event.target.reset();
    }

    // Function to toggle task status between 'to be completed', 'in progress', and 'completed'
    const toggleTaskStatus = (taskId) => {
        setTasks(prevTasks => prevTasks.map(task => {
            if (task.id === taskId) {
                if (task.status === 'to be completed') {
                    return { ...task, status: 'in progress' };
                } else if (task.status === 'in progress') {
                    return { ...task, status: 'completed' };
                } else {
                    return { ...task, status: 'in progress' }; // Toggle back to 'in progress'
                }
            }
            return task;
        }));

        // Apply deadline styling after toggling task status
        applyDeadlineStyling();
    }

    // Function to display tasks in the task list
    const displayTasks = () => {
        return tasks.map(task => {
            // Calculate remaining days to the deadline
            const today = new Date();
            const deadlineDate = new Date(task.deadline);
            const timeDifference = deadlineDate.getTime() - today.getTime();
            const remainingDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

            // Determine if the task is due within a week
            const isDueSoon = remainingDays <= 7;

            // Determine the class to apply based on priority
            let priorityClass;
            switch (task.priority) {
                case 'high':
                    priorityClass = 'high';
                    break;
                case 'medium':
                    priorityClass = 'medium';
                    break;
                case 'low':
                    priorityClass = 'low';
                    break;
                default:
                    priorityClass = '';
            }

            // Determine the class to apply based on deadline
            const deadlineClass = isDueSoon ? 'deadline' : '';

            // Determine the class to apply based on task status
            const statusClass = task.status === 'completed' ? 'completed' : '';

            // Return the task element with appropriate classes
            return (
                <div key={task.id} className={`task ${priorityClass} ${statusClass}`} onClick={() => toggleTaskStatus(task.id)}>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    <p className={deadlineClass}>Deadline: {task.deadline}</p>
                    <p>Priority: {task.priority}</p>
                    <p>Status: {task.status}</p>
                </div>
            );
        });
    }

    return (
        <div>
            <header>
                <h1>Task Manager Pro</h1>
            </header>
            <main>
                <div className="task-form">
                    <form onSubmit={addTask}>
                        <input type="text" placeholder="Task Title" name="taskTitle" required />
                        <textarea placeholder="Task Description" name="taskDescription" required></textarea>
                        <input type="date" name="taskDeadline" required />
                        <select name="taskPriority" required>
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>
                        <button type="submit">Add Task</button>
                    </form>
                </div>
                <div className="task-list">
                    {/* Display tasks */}
                    {displayTasks()}
                </div>
            </main>
            <footer>
                <p>&copy; 2024 Task Manager Pro</p>
            </footer>
        </div>
    );
}

export default TaskManager;