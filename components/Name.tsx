"use client"

import { Dispatch, SetStateAction, useState } from "react";

interface Props {
    setName: Dispatch<SetStateAction<string>>;
}

export const Name = ({
    setName
}: Props) => {
    const [nickname, setNickname] = useState<string>("")

    const handleName = () => {
        setName(nickname);
    }

    return (
        <div>
            <h2 className="text-lg font-bold">Select your nickname</h2>
            <form action={handleName} className="space-x-2 flex">
                <input
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value.replace(' ', ''))}
                    placeholder="Name"
                    className="p-2 rounded text-black"
                    max={20}
                />
                <button type="submit" className="rounded px-3 py-2 text-sm bg-green-500 text-white font-bold">Save name</button>
            </form>
        </div>
    )
}
