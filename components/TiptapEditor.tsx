"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from '@tiptap/extension-collaboration-cursor'
import { useYDoc } from "@/context/DocProvider";

interface Props {
    name: string;
}

export const TiptapEditor = ({ name }: Props) => {
    const { ydoc, provider } = useYDoc();

    const editor = useEditor({
        extensions: [
            StarterKit,
            Collaboration.configure({
                document: ydoc,
            }),
            CollaborationCursor.configure({
                provider
            }),
        ],
        immediatelyRender: false,
        content: "<p>Welcome to Tiptap</p>",
    });

    if (!editor) {
        return <div>Loading editor...</div>
    }

    return (
        <div className="flex flex-col gap-4">
            <h2>I&apos;m: <span>{name}</span></h2>
            <div className="p-2 bg-white text-black">
                <EditorContent editor={editor} className="border border-black rounded-sm p-1" />
            </div>
        </div>
    );
};
