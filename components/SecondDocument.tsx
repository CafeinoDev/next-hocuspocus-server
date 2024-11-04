import { useYDoc } from "@/context/DocProvider";
import { useEffect, useState } from "react";
import * as Y from "yjs";

interface Props {
    name: string;
}

interface TaskProps {
    task: string;
    owner: string;
}

export const SecondDocument = ({ name }: Props) => {
    const { getArray } = useYDoc();
    const tasks = getArray("tasks2") as Y.Array<Y.Map<any>>;

    const [taskList, setTaskList] = useState<TaskProps[]>(() => tasks.toArray().map((taskMap) => taskMap.toJSON() as TaskProps));
    const [newTask, setNewTask] = useState("");

    const addTask = () => {
        if (!newTask) return;

        const taskMap = new Y.Map();
        taskMap.set("task", newTask);
        taskMap.set("owner", name);

        tasks.push([taskMap]);
        setNewTask("");
    };

    const removeTask = (index: number) => {
        tasks.delete(index);
    };

    useEffect(() => {
        const updateTaskList = () => setTaskList(tasks.toArray().map((taskMap) => taskMap.toJSON() as TaskProps));
        tasks.observe(updateTaskList);

        return () => tasks.unobserve(updateTaskList);
    }, [tasks]);

    return (
        <div className="space-y-4">
            <form onSubmit={(e) => { e.preventDefault(); addTask(); }} className="space-x-2 flex">
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
                    {taskList.length ? (
                        taskList.map((task, index) => (
                            <li className="flex gap-2 items-center" key={index}>
                                <span><strong>{task.owner}:</strong> {task.task}</span>
                                <span className="rounded-full aspect-square cursor-pointer" onClick={() => removeTask(index)}>❌</span>
                            </li>
                        ))
                    ) : (
                        <p>You don&apos;t have any tasks yet!</p>
                    )}
                </ul>
            </div>
        </div>
    );
}
