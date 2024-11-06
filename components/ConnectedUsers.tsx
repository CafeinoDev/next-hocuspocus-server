import { useYDoc } from "@/context/DocProvider";

export const ConnectedUsers = () => {
    const { userList } = useYDoc();

    return (
        <div>
            <h2 className="text-lg font-bold">Connected users:</h2>
            <ul>
                {userList.length > 0 ? (
                    userList.map((user, index) => (
                        <li key={index}>{user}</li>
                    ))
                ) : (
                    <p>No users connected</p>
                )}
            </ul>
        </div>
    );
};
