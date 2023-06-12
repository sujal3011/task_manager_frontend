import React, { useState } from 'react'
import taskContext from './taskContext'

const TaskState = (props) => {
    const host = process.env.REACT_APP_SERVER_DOMAIN;
    const [tasks, setTasks] = useState([]);

    //Fetching all tasks

    const getTasks = async (list_id,status="all") => {
        const response = await fetch(`${host}/tasks/${list_id}/gettasks?status=${status}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem("token")
            },
        });
        const json = await response.json();
        // console.log(json);
        setTasks(json);

    }

    // Adding a new task

    const addTask = async (listId, description, dueDate) => {
        const response = await fetch(`${host}/tasks/${listId}/addtask`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem("token")
            },
            body: JSON.stringify({ description, dueDate }),

        });
        const task = await response.json();
        // console.log(task);
        setTasks(tasks.concat(task));

    }
    // Editing the status of the task

    const editTaskStatus = async (taskId) => {
        try {
            const response = await fetch(`${host}/tasks/updatetaskstatus/${taskId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": localStorage.getItem("token")
                },
                body: JSON.stringify({ isCompleted: true }),

            });
            const json = await response.json();


            //Applying the changes in the frontend

            const newTasks = JSON.parse(JSON.stringify(tasks));
            for (let i = 0; i < newTasks.length; i++) {
                let ele = newTasks[i];
                if (ele._id === taskId) {
                    newTasks[i].isCompleted = true;
                    break;
                }
            }
            setTasks(newTasks);

        } catch (error) {
            console.log(error);
        }
    }

    //Editing the task

    const editTask = async (task_id ,description,dueDate) => {
        try {
            const response = await fetch(`${host}/tasks/updatetask/${task_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": localStorage.getItem("token")
                },
                body: JSON.stringify({ description,dueDate }),

            });
            const json = await response.json();
            console.log(json);

            let newTasks = JSON.parse(JSON.stringify(tasks))
            for (let i = 0; i < newTasks.length; i++) {
                const ele = newTasks[i];
                if (ele._id === task_id) {  
                    newTasks[i].description = description;
                    newTasks[i].dueDate = dueDate;
                    break;
                }

            }
            setTasks(newTasks);
        } catch (error) {
            console.log(error);
        }

    }

    //Deleting a task

    const deleteTask = async (taskId) => {
        try {
            const response = await fetch(`${host}/tasks/deletetask/${taskId}`, {
                method: 'DELETE',

                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": localStorage.getItem("token")
                },
            });
            const json = await response.json();

             //Applying the changes in the frontend

            const newTasks = tasks.filter((task) => { return task._id !== taskId })  // using filter() function of javascript
            setTasks(newTasks);

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <taskContext.Provider value={{ tasks, getTasks, addTask, editTaskStatus, deleteTask,editTask }}>
            {props.children}
        </taskContext.Provider>
    )
}

export default TaskState