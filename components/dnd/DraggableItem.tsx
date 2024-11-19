import React, { useEffect } from "react";
import { useDrag } from "react-dnd";
import { awareness } from "@/hooks/y";

interface Props {
    id: number;
    text: string;
    isBeingDragged?: boolean;
}

export const DraggableItem = ({ id, text, isBeingDragged }: Props) => {
    const [{ isDragging }, drag] = useDrag({
        type: "item",
        item: { id, text },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        })
    });

    useEffect(() => {
        if (isDragging) {
            awareness?.setLocalStateField("draggedItem", { id, text });
        } else {
            awareness?.setLocalStateField("draggedItem", null);
        }
    }, [isDragging]);

    return drag(
        <div
            className={`w-52 aspect-square bg-blue-300 ${isBeingDragged ? "ring-4 ring-yellow-500" : ""
                }`}
        >
            {text}
            {isDragging && <div className="bg-red-200">Dragging 👆🏻</div>}
            {isBeingDragged && !isDragging && <div className="bg-green-600">Being dragged by another user</div>}
        </div>
    );
};
