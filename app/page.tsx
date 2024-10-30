"use client"

import { useYDoc } from "@/hooks/useYDoc";
import { useState, useEffect } from "react";
import * as Y from "yjs"

const TaskComponent = () => {
    const { getArray } = useYDoc("tasks-room");
    const tasks = getArray("tasks") as Y.Array<string>;

    const [taskList, setTaskList] = useState(tasks.toArray());
    const [newTask, setNewTask] = useState("");

    const addTask = () => {
        if (newTask) tasks.push([newTask]);
        setNewTask("");
    };

    useEffect(() => {
        const updateTaskList = () => setTaskList(tasks.toArray());
        tasks.observe(updateTaskList);

        return () => tasks.unobserve(updateTaskList);
    }, [tasks]);

    return (
        <div>
            <h2>Task example page</h2>
            <ul>
                {taskList.map((task, index) => (
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
