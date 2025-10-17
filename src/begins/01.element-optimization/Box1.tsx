import { useState } from "react";

function ChildBox() {
    console.log("Render ChildBox");
    return <div className="bg-red-500 rounded mt-2 px-3 py-1 text-white">ChildBox</div>;
}

export function Box1() {
    const [count, setCount] = useState(0);
    console.log("Render Box1");
    return (
        <div className="h-40 p-4 bg-green-500 rounded-xl shadow-sm">
            <div className="font-bold">Box 1</div>
            <button
                className="mt-2 px-3 py-1 bg-blue-500 text-white rounded-lg"
                onClick={() => setCount(count + 1)}
            >
                Count is {count}
            </button>
            <ChildBox />
        </div>
    )
}