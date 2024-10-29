"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import * as Y from "yjs";
import { HocuspocusProvider } from "@hocuspocus/provider";

const ProviderContext = createContext<{ tasks: Y.Array<any> } | undefined>(undefined);

export const useProvider = () => {
    const context = useContext(ProviderContext);
    if (!context) throw new Error("useProvider must be used within a ProviderWrapper");
    return context;
};

export const ProviderWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const ydoc = useMemo(() => new Y.Doc(), []);

    const [tasks, setTasks] = useState<Y.Array<any>>(ydoc.getArray('tasks'));

    useEffect(() => {
        const provider = new HocuspocusProvider({
            url: "ws://localhost:3031",
            name: "example-document",
            document: ydoc,
            onStatus(event) {
                if (event.status === "connected") {
                    console.log("Connected to Hocuspocus server.");
                }
            },
            onSynced(isSynced) {
                if (isSynced) {
                    const tasksArray = ydoc.getArray("tasks");
                    setTasks(tasksArray);
                }
            },
        });

        const tasksArray = ydoc.getArray("tasks");
        setTasks(tasksArray);

        tasksArray.observe(() => {
            console.log("Tasks updated:", tasksArray.toArray());
        });

        return () => {
            provider.disconnect();
        };
    }, [ydoc]);

    if (!tasks) return null;

    return <ProviderContext.Provider value={{ tasks }}>{children}</ProviderContext.Provider>;
};
