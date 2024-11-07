"use client";

import { useEffect, useState } from "react";
import { useYDoc } from "@/context/DocProvider";

export const Cursors = () => {
    const { awareness } = useYDoc();
    const [cursors, setCursors] = useState<Record<string, { x: number; y: number; color: string; name: string }>>({});

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            awareness?.setLocalStateField("cursor", {
                x: event.clientX,
                y: event.clientY,
            });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [awareness]);

    useEffect(() => {
        const handleAwarenessChange = () => {
            const updatedCursors: Record<string, { x: number; y: number; color: string; name: string }> = {};
            awareness?.getStates().forEach((state, clientId) => {
                if (state.user && state.cursor) {
                    updatedCursors[clientId] = {
                        x: state.cursor.x,
                        y: state.cursor.y,
                        color: state.user.color,
                        name: state.user.name,
                    };
                }
            });
            setCursors(updatedCursors);
        };

        awareness?.on("change", handleAwarenessChange);
        return () => awareness?.off("change", handleAwarenessChange);
    }, [awareness]);

    return (
        <div className="relative">
            {Object.entries(cursors).map(([clientId, { x, y, color, name }]) => (
                <Cursor key={clientId} x={x} y={y} color={color} name={name} />
            ))}
        </div>
    );
};

interface CursorProps {
    x: number;
    y: number;
    color: string;
    name: string;
}

const Cursor: React.FC<CursorProps> = ({ x, y, color, name }) => (
    <div className="cursor-container" style={{ left: `${x}px`, top: `${y}px` }}>
        <div className="cursor" style={{ backgroundColor: color }} />
        <span className="cursor-name" style={{ color }}>{name}</span>
    </div>
);
