import Link from "next/link";

export default function HomePage() {

    return (
        <div>
            <ul className="text-blue-600 underline">
                <li>
                    <Link href={'provider'}>WS connection test (using context provider)</Link>
                </li>
                <li>
                    <Link href={'rooms'}>Switch between rooms</Link>
                </li>
                <li>
                    <Link href={'editor'}>Tiptap Editor</Link>
                </li>
                <li>
                    <Link href={'cursors'}>Cursors</Link>
                </li>
                <li>
                    <Link href={'presence'}>Cursors Y-presence and Perfect Cursors</Link>
                </li>
                <li>
                    <Link href={'dnd'}>Drag and drop - Simple basket</Link>
                </li>
            </ul>
        </div>
    );
}