import { useState, useEffect } from "react";
import { useDrop } from "react-dnd";
import { DraggableItem } from "./DraggableItem";
import { ydoc, provider, awareness } from "@/hooks/y";

interface DraggableItem {
    id: number;
    text: string;
}

export const DragAndDrop = () => {
    const [basket, setBasket] = useState<DraggableItem[]>([]);
    const [items, setItems] = useState<DraggableItem[]>([]);
    const [draggedItem, setDraggedItem] = useState<DraggableItem | null>(null);

    const yBasket = ydoc.getArray<DraggableItem>("basket");
    const yItems = ydoc.getArray<DraggableItem>("items");

    useEffect(() => {
        const updateBasket = () => setBasket([...yBasket.toArray()]);
        yBasket.observe(updateBasket);

        const updateItems = () => setItems([...yItems.toArray()]);
        yItems.observe(updateItems);

        provider.on("synced", () => {
            if (yItems.length === 0) {
                yItems.push([
                    { id: 1, text: "dog" },
                    { id: 2, text: "cat" },
                    { id: 3, text: "fish" },
                    { id: 4, text: "hamster" },
                ]);
            }

            updateBasket();
            updateItems();
        });

        const handleAwarenessChange = () => {
            const states = Array.from(awareness!.getStates().values());
            const draggingState = states.find((state) => state.draggedItem);
            setDraggedItem(draggingState?.draggedItem || null);
        };

        awareness?.on("change", handleAwarenessChange);

        return () => {
            yBasket.unobserve(updateBasket);
            yItems.unobserve(updateItems);
            awareness?.off("change", handleAwarenessChange);
        };
    }, []);

    const [{ isOver }, drop] = useDrop<DraggableItem, void, { isOver: boolean }>({
        accept: "item",
        drop: (item) => {
            if (!yBasket.toArray().find((i: DraggableItem) => i.id === item.id)) {
                yBasket.push([item]);
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    });

    return (
        <div className="space-y-5">
            <div className="flex gap-4 max-w-screen-2 flex-wrap">
                {items.map((item) => (
                    <DraggableItem
                        key={item.id}
                        {...item}
                        isBeingDragged={draggedItem?.id === item.id}
                    />
                ))}
            </div>

            {drop(
                <div className="bg-sky-600 h-44">
                    <div className="flex gap-5">
                        {basket.map((item) => (
                            <DraggableItem
                                key={item.id}
                                {...item}
                                isBeingDragged={draggedItem?.id === item.id}
                            />
                        ))}
                    </div>
                    {isOver && <div>Drop Here!</div>}
                </div>
            )}
        </div>
    );
};
