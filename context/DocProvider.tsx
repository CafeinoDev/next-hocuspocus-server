import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import * as Y from "yjs";
import { HocuspocusProvider, HocuspocusProviderWebsocket } from "@hocuspocus/provider";
import { generateRandomHexColor } from "@/lib/generateRandomHexColor";

interface YDocContextType {
    ydoc: Y.Doc;
    provider: HocuspocusProvider;
    awareness: HocuspocusProvider['awareness'];
    getArray: (name: string) => Y.Array<any>;
    getMap: (name: string) => Y.Map<any>;
    userList: string[];
}

const YDocContext = createContext<YDocContextType | undefined>(undefined);

interface YDocProviderProps {
    roomId: string;
    name?: string;
    children: React.ReactNode;
}

const websocketConnection = new HocuspocusProviderWebsocket({
    url: "ws://localhost:3001",
    minDelay: 0,
    delay: 0,
    maxDelay: 1000,
    jitter: true,
});

export const YDocProvider: React.FC<YDocProviderProps> = ({ roomId, children, name }) => {
    const [userList, setUserList] = useState<string[]>([]);
    const providerRef = useRef<HocuspocusProvider>();
    const ydoc = useMemo(() => new Y.Doc(), []);

    // Initialize the provider once and persist it
    if (!providerRef.current) {
        providerRef.current = new HocuspocusProvider({
            websocketProvider: websocketConnection,
            name: roomId,
            document: ydoc,
            onStatus(event) {
                if (event.status === "connected") {
                    console.log(`Connected to room: ${roomId}`);
                }
            },
        });
    }

    const provider = providerRef.current;
    const awareness = provider.awareness;

    useEffect(() => {
        const updateUserList = () => {
            const users: string[] = [];
            awareness?.getStates().forEach((state: any) => {
                if (state.user && state.user.name) users.push(state.user.name);
            });
            setUserList(users);
        };

        awareness?.setLocalStateField("user", { name, color: generateRandomHexColor() });
        awareness?.on("change", updateUserList);

        // Initialize user list on mount
        updateUserList();

        return () => {
            awareness?.setLocalState(null);
            awareness?.off("change", updateUserList);
        };
    }, [name, awareness]);

    const contextValue = useMemo(() => ({
        ydoc,
        provider,
        awareness,
        getArray: (name: string) => ydoc.getArray(name),
        getMap: (name: string) => ydoc.getMap(name),
    }), [ydoc]);

    return (
        <YDocContext.Provider value={{ ...contextValue, userList }}>
            {children}
        </YDocContext.Provider>
    );
};

export const useYDoc = () => {
    const context = useContext(YDocContext);
    if (!context) {
        throw new Error("useYDoc must be used within a YDocProvider");
    }
    return context;
};
