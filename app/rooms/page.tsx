"use client"

import TasksRoom from "@/components/TaskRoom";
import { YDocProvider } from "@/context/DocProvider";
import { useState, useRef } from "react";

const generateRandomName = () => {
    const adjectives = [
        "Calm", "Curious", "Daring", "Elegant", "Fierce", "Gentle",
        "Happy", "Jolly", "Kind", "Lovely", "Magical", "Noble",
        "Peaceful", "Quirky", "Radiant", "Serene", "Tender", "Vibrant",
        "Wise", "Zesty"
    ];

    const nouns = [
        "Apple", "Bear", "Cat", "Dog", "Eagle", "Fox",
        "Giraffe", "Hawk", "Iguana", "Jaguar", "Koala", "Lion",
        "Monkey", "Nightingale", "Owl", "Panda", "Quail", "Raven",
        "Snake", "Tiger", "Unicorn", "Vulture", "Whale", "Yak",
        "Zebra"
    ];

    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];

    return `${randomAdjective} ${randomNoun}`;
};

export default function RoomsPage() {
    const nameRef = useRef(generateRandomName());
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
            <div>
                <YDocProvider roomId={room}>
                    <TasksRoom name={nameRef.current} />
                </YDocProvider>
            </div>
        </div>
    );
}
