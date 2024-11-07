"use client"

import { useMemo } from "react";
import { Cursors } from "@/components/Cursors";
import { generateRandomName } from "@/lib/generateRandomName";
import { YDocProvider } from "@/context/DocProvider";

export default function CursorsPage() {
    const name = useMemo(generateRandomName, []);

    return (
        <YDocProvider name={name} roomId="cursors">
            <Cursors />
        </YDocProvider>
    );
}