import React, { useState } from "react";

function GrandchildBox({ text }: { text: string }) {
    console.log("Render GrandchildBox");
    return <div className="bg-yellow-500 rounded mt-2 px-3 py-1 text-white">{text}</div>;
}

function ChildBox({ grandchild }: { grandchild: React.ReactNode }) {
    console.log("Render ChildBox");
    const [count, setCount] = useState(0);

    return <div className="bg-red-500 rounded mt-2 px-3 py-4 text-white">
        <p>ChildBox</p>
        <button
            className="mt-2 px-3 py-1 bg-blue-500 text-white rounded-lg"
            onClick={() => setCount(count + 1)}
        >
            Count is {count}
        </button>
        {grandchild}
    </div>;
}

export function Box3() {
    const [childText, setChildText] = useState("GrandchildBox Text");
    const [count, setCount] = useState(0);
    console.log("Render Box1");
    return (
        <div className="p-4 bg-green-500 rounded-xl shadow-sm">
            <div className="font-bold">Box 3 <span className="text-sm font-normal">{childText}</span></div>
            <button
                className="mt-2 px-3 py-1 bg-blue-500 text-white rounded-lg"
                onClick={() => setCount(count + 1)}
            >
                Count is {count}
            </button>
            <input
                className="mt-2 px-3 py-1 rounded-lg border"
                value={childText}
                onChange={(e) => setChildText(e.target.value)}
            />
            <ChildBox grandchild={<GrandchildBox text={childText} />} />
        </div>
    )
}