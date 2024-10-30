import { useEffect, useMemo } from "react";
import * as Y from "yjs";
import { HocuspocusProvider } from "@hocuspocus/provider";

export const useYDoc = (roomId: string) => {
    const ydoc = useMemo(() => new Y.Doc(), []);

    useEffect(() => {
        const provider = new HocuspocusProvider({
            url: "ws://localhost:3001",
            name: roomId,
            document: ydoc,
            onStatus(event) {
                if (event.status === "connected") {
                    console.log(`Connected to room: ${roomId}`);
                }
            },
        });

        return () => {
            provider.disconnect();
        };
    }, [ydoc, roomId]);

    return {
        ydoc,
        getArray: (name: string) => ydoc.getArray(name),
        getMap: (name: string) => ydoc.getMap(name),
    };
};