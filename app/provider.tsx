"use client";

import { createContext, useContext, useEffect, useMemo } from "react";
import * as Y from "yjs";
import { HocuspocusProvider } from "@hocuspocus/provider";

const ProviderContext = createContext<{ ydoc: Y.Doc } | undefined>(undefined);

export const useProvider = () => {
    const context = useContext(ProviderContext);
    if (!context) throw new Error("useProvider must be used within a ProviderWrapper");
    return context;
};

export const ProviderWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const ydoc = useMemo(() => new Y.Doc(), []);

    useEffect(() => {
        const provider = new HocuspocusProvider({
            url: "ws://localhost:3031",
            name: `hocuspocus-next-document`,
            document: ydoc,
            onStatus(event) {
                if (event.status === "connected") {
                    console.log("Connected to Hocuspocus server.");
                }
            }
        });

        return () => {
            provider.disconnect();
        };
    }, [ydoc]);


    return <ProviderContext.Provider value={{ ydoc }}>{children}</ProviderContext.Provider>;
};
