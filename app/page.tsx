"use client";

import { useState, useEffect } from "react";
import { useProvider } from "./provider";

const TaskComponent = () => {
    const { tasks } = useProvider();
    const [taskList, setTaskList] = useState(tasks.toArray());
    const [newTask, setNewTask] = useState("");

    const addTask = () => {
        if (!newTask) return;

        tasks.insert(tasks.length, [newTask]);
        setNewTask("");
    };

    useEffect(() => {
        const handleTasksUpdate = () => {
            setTaskList(tasks.toArray());
        };

        tasks.observe(handleTasksUpdate);

        return () => {
            tasks.unobserve(handleTasksUpdate);
        };
    }, [tasks]);


    return (
        <div>
            <h2>Task example page</h2>
            <ul>
                {taskList.map((task: string, index: number) => (
                    <li key={index}>{task}</li>
                ))}
            </ul>
            <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Add a new task"
            />
            <button onClick={addTask}>Add Task</button>
        </div>
    );
};

export default TaskComponent;
