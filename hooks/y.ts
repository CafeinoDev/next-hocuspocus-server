import * as Y from "yjs";
import { HocuspocusProvider } from "@hocuspocus/provider";

const roomId = "awareness-1";

export const ydoc = new Y.Doc();

export const provider = new HocuspocusProvider({
    url: "ws://localhost:3001",
    name: roomId,
    document: ydoc,
    onStatus(event) {
        if (event.status === "connected") {
            console.log(`Connected to room: ${roomId}`);
        }
    },
});

export const awareness = provider.awareness;