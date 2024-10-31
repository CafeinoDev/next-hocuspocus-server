"use client"

import { useYDoc } from "@/hooks/useYDoc";
import { useState, useEffect } from "react";
import * as Y from "yjs"

const Tasks = () => {
    const { getArray } = useYDoc("tasks-room");
    const tasks = getArray("tasks") as Y.Array<string>;

    const [taskList, setTaskList] = useState(tasks.toArray());
    const [newTask, setNewTask] = useState("");

    const addTask = () => {
        if (!newTask) return;

        tasks.push([newTask]);
        setNewTask("");
    };

    const removeTask = (index: number) => {
        tasks.delete(index);
    }

    useEffect(() => {
        const updateTaskList = () => setTaskList(tasks.toArray());
        tasks.observe(updateTaskList);

        return () => tasks.unobserve(updateTaskList);
    }, [tasks]);

    return (
        <div className="space-y-4">
            <form action={addTask} className="space-x-2 flex">
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Add a new task"
                    className="p-2 rounded text-black"
                />
                <button type="submit" className="rounded px-3 py-2 text-sm bg-green-500 text-white font-bold">Add Task</button>
            </form>
            <div>
                <h2 className="text-lg font-bold">Tasks:</h2>
                <ul>
                    {
                        !!taskList.length
                            ? taskList.map((task, index) => (
                                <li className="flex gap-1 items-center" key={index}>
                                    {task}
                                    <span className="rounded-full aspect-square cursor-pointer" onClick={() => removeTask(index)}>❌</span>
                                </li>
                            ))
                            : <p>You don&apos;t have any task yet!</p>
                    }
                </ul>
            </div>
        </div>
    );
};

export default Tasks;