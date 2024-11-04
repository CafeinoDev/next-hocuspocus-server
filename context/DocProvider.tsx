import { createContext, useContext, useEffect, useMemo } from "react";
import * as Y from "yjs";
import { HocuspocusProvider, HocuspocusProviderWebsocket } from "@hocuspocus/provider";

// Define the context type
interface YDocContextType {
    ydoc: Y.Doc;
    getArray: (name: string) => Y.Array<any>;
    getMap: (name: string) => Y.Map<any>;
}

// Create context for YDoc
const YDocContext = createContext<YDocContextType | undefined>(undefined);

// Define props for YDocProvider
interface YDocProviderProps {
    roomId: string;
    children: React.ReactNode;
}

// Singleton WebSocket instance to enable multiplexing
const websocketConnection = new HocuspocusProviderWebsocket({
    url: "ws://localhost:3001",
});

// Main YDocProvider component
export const YDocProvider: React.FC<YDocProviderProps> = ({ roomId, children }) => {
    // Create a Y.Doc instance, re-initialized with roomId changes
    const ydoc = useMemo(() => new Y.Doc(), [roomId]);

    // Track the previous provider and disconnect it when `roomId` changes
    useEffect(() => {
        // Initialize a new HocuspocusProvider for the current roomId
        const provider = new HocuspocusProvider({
            websocketProvider: websocketConnection, // Reuse the WebSocket connection
            name: roomId, // Specify document/room name
            document: ydoc,
            onStatus(event) {
                if (event.status === "connected") {
                    console.log(`Connected to room: ${roomId}`);
                }
            },
        });

        // Cleanup previous provider on roomId change or component unmount
        return () => {
            provider.disconnect();
            console.log(`Disconnected from room: ${roomId}`);
        };
    }, [roomId, ydoc]);

    // Memoize the context value
    const contextValue = useMemo(() => ({
        ydoc,
        getArray: (name: string) => ydoc.getArray(name),
        getMap: (name: string) => ydoc.getMap(name),
    }), [ydoc]);

    return (
        <YDocContext.Provider value={contextValue}>
            {children}
        </YDocContext.Provider>
    );
};

// Hook for accessing YDoc context
export const useYDoc = () => {
    const context = useContext(YDocContext);
    if (!context) {
        throw new Error("useYDoc must be used within a YDocProvider");
    }
    return context;
};
