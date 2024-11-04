import Link from "next/link";

export default function HomePage() {

    return (
        <div>
            <ul className="text-blue-600 underline">
                <li>
                    <Link href={'provider'}>One ws connection test (using context provider)</Link>
                </li>
                <li>
                    <Link href={'rooms'}>Selecting room</Link>
                </li>
            </ul>
        </div>
    );
}