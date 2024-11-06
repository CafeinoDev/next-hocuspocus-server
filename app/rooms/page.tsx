"use client"

import { ConnectedUsers } from "@/components/ConnectedUsers";
import TasksRoom from "@/components/TaskRoom";
import { YDocProvider } from "@/context/DocProvider";
import { generateRandomName } from "@/lib/generateRandomName";
import { useState, useMemo } from "react";



export default function RoomsPage() {
    const name = useMemo(generateRandomName, []);
    const [room, setRoom] = useState<string>("room-1");

    return (
        <div className="flex gap-4 p-4">
            <div className="flex flex-col gap-4">
                <h1 className="text-lg">Selected room: <span className="font-bold text-red-500">{room}</span></h1>
                <div className="flex flex-col gap-1">
                    <button className="w-fit underline text-blue-400" onClick={() => setRoom("room-1")}>Room 1</button>
                    <button className="w-fit underline text-blue-400" onClick={() => setRoom("room-2")}>Room 2</button>
                    <button className="w-fit underline text-blue-400" onClick={() => setRoom("room-3")}>Room 3</button>
                </div>
            </div>
            <div className="flex gap-4">
                <YDocProvider roomId={room} name={name}>
                    <TasksRoom name={name} />
                    <ConnectedUsers />
                </YDocProvider>
            </div>
        </div>
    );
}
