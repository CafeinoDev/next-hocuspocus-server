"use client"

import { TiptapEditor } from "@/components/TiptapEditor";
import { YDocProvider } from "@/context/DocProvider";
import { generateRandomName } from "@/lib/generateRandomName";
import { useMemo } from "react";

export default function TipTapPage() {
    const name = useMemo(generateRandomName, []);

    return (
        <div>
            <h1 className="text-lg">Tiptap Editor</h1>
            <YDocProvider name={name} roomId="tiptap-editor">
                <TiptapEditor name={name} />
            </YDocProvider>
        </div>
    );
}