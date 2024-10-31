import Tasks from "@/components/Tasks";

export default function HomePage() {
    return (
        <div className="p-3 space-y-2">
            <h1 className="text-2xl">Next HocusPocus Server</h1>
            <Tasks />
        </div>
    );
}