import { useEffect, useState } from "react";
import { useYDoc } from "@/context/DocProvider";

export const useConnectedUsers = (userName?: string) => {
    const { provider } = useYDoc();
    const [userList, setUserList] = useState<string[]>([]);

    useEffect(() => {
        if (!provider) return;

        console.log('entra:', userName)

        const awareness = provider.awareness;

        const updateUserList = () => {
            const users: string[] = [];
            awareness?.getStates().forEach((state) => {
                if (state.user && state.user.name) users.push(state.user.name);
            });
            setUserList(users);
        };

        if (userName) {
            awareness?.setLocalStateField("user", { name: userName });
        }

        awareness?.on("change", updateUserList);
        updateUserList();

        return () => {
            if (userName) {
                awareness?.setLocalState(null);
            }
            awareness?.off("change", updateUserList);
        };
    }, [provider, userName]);

    return userList;
};
