"use client"

import { DragAndDrop } from "@/components/dnd/DragAndDrop";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function DndPage() {
    return (
        <DndProvider backend={HTML5Backend}>
            <DragAndDrop />
        </DndProvider>
    );
}