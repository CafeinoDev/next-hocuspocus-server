"use client"

import { Name } from "@/components/Name";
import { SecondDocument } from "@/components/SecondDocument";
import Tasks from "@/components/Tasks";
import { YDocProvider } from "@/context/DocProvider";
import { useState } from "react";

export default function ProviderPage() {
    const [name, setName] = useState<string>('');

    return (
        <div className="p-3 space-y-2">
            <h1 className="text-2xl font-bold">Next HocusPocus Server</h1>
            {
                name
                    ? <YDocProvider roomId="task">
                        <Tasks name={name} />
                        <SecondDocument name={name} />
                    </YDocProvider>
                    : <Name setName={setName} />
            }
        </div>
    );
}