import React, { useState } from "react";

function GrandchildBox({ name }: { name: string }) {
    const text = useTextChild();
    console.log("Render GrandchildBox");
    return (
        <>
            <div className="bg-yellow-500 rounded mt-2 px-3 py-1 text-white">{text}</div>
            <div className="bg-purple-500 rounded mt-2 px-3 py-1 text-white">Name: {name}</div>
        </>
    )
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

export function Box5() {
    const [text, setText] = useState("GrandchildBox Text");
    const [count, setCount] = useState(0);
    const [name, setName] = useState("Daniel");
    console.log("Render Box1");
    const grandchildBoxElement = <GrandchildBox name={name} />;

    return (
        <TextChildContext value={text}>
            <div className="p-4 bg-green-500 rounded-xl shadow-sm">
                <div className="font-bold">Box 4 <span className="text-sm font-normal">{text}</span></div>
                <button
                    className="mt-2 px-3 py-1 bg-blue-500 text-white rounded-lg"
                    onClick={() => setCount(count + 1)}
                >
                    Count is {count}
                </button>
                <input
                    className="mt-2 px-3 py-1 rounded-lg border"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <input
                    className="mt-2 px-3 py-1 rounded-lg border"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <ChildBox grandchild={grandchildBoxElement} />
            </div>
        </TextChildContext>
    )
}

const TextChildContext = React.createContext<string | null>(null);

function useTextChild() {
    const context = React.useContext(TextChildContext);
    if (!context) {
        throw new Error("useTextChild must be used within a TextChildProvider");
    }
    return context;
}
