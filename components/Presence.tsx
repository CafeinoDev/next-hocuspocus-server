"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useUsers } from "y-presence";
import throttle from "lodash.throttle";
import { awareness } from "@/hooks/y";
import { usePerfectCursor } from "@/hooks/usePerfectCursor";

export const Presence = () => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const users = useUsers(awareness!, (state) => state);

    const handlePointMove = useCallback(
        throttle((e: React.PointerEvent) => {
            awareness?.setLocalStateField("point", [e.clientX, e.clientY]);
        }, 200),
        [awareness]
    );

    if (!isClient || !awareness) {
        return <div>Loading...</div>;
    }

    return (
        <div onPointerMove={handlePointMove} className="min-h-screen">
            <pre>{JSON.stringify(Array.from(users.entries()), null, 2)}</pre>
            {Array.from(users.entries()).map(([key, value]) => {
                if (key === awareness?.clientID) return null;
                return <Cursor key={key} color="#00CFBF" point={value.point} name="test" />;
            })}
        </div>
    );
};

interface CursorProps {
    name: string;
    color: string;
    point: number[];
}

const Cursor: React.FC<CursorProps> = ({ color, name, point }) => {

    const rCursor = useRef<HTMLDivElement>(null);

    const animateCursor = useCallback((point: number[]) => {
        const elm = rCursor.current;
        if (!elm) return;
        elm.style.setProperty(
            "left",
            `${point[0]}px`
        );
        elm.style.setProperty(
            "top",
            `${point[1]}px`
        );
    }, []);

    const onPointMove = usePerfectCursor(animateCursor);

    if (point) {
        onPointMove(point);
    }

    if (!point || !color) return null;

    return (
        <div
            ref={rCursor}
            className="cursor-container"
            style={{ left: `${point[0]}px`, top: `${point[1]}px` }}
        >
            <div className="cursor" style={{ backgroundColor: color }} />
            <span className="cursor-name" style={{ color }}>
                {name}
            </span>
        </div>
    );
};
