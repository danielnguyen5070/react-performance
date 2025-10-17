import React, { useState, memo } from "react";

function GrandchildBox() {
    const { text, name } = useBoxContext();
    console.log("Render GrandchildBox");
    return (
        <>
            <div className="bg-yellow-500 rounded mt-2 px-3 py-1 text-white">{text}</div>
            <div className="bg-purple-500 rounded mt-2 px-3 py-1 text-white">Name: {name}</div>
        </>
    )
}
const grandchildBoxElement = <GrandchildBox />;

const ChildBox = memo(function ({ grandchild }: { grandchild: React.ReactNode }) {
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
})

export function Box() {
    console.log("Render Box1");
    const [count, setCount] = useState(0);

    const [text, setText] = useState("GrandchildBox Text");
    const [name, setName] = useState("Daniel");

    const value = { text, name };

    return (
        <BoxContext value={value}>
            <div className="p-4 bg-green-500 rounded-xl shadow-sm">
                <div className="font-bold">Box 5 <span className="text-sm font-normal">{text}</span></div>
                <button
                    className="mt-2 px-3 py-1 bg-blue-500 text-white rounded-lg"
                    onClick={() => setCount(count + 1)}
                >
                    Count is {count}
                </button>
                <input
                    className="mt-2 px-3 py-1 rounded-lg border w-full"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <input
                    className="mt-2 px-3 py-1 rounded-lg border w-full"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <ChildBox grandchild={grandchildBoxElement} />
            </div>
        </BoxContext>
    )
}

type BoxContextType = {
    text: string;
    name: string;
}
const BoxContext = React.createContext<BoxContextType | null>(null);

function useBoxContext() {
    const context = React.useContext(BoxContext);
    if (!context) {
        throw new Error("useBox must be used within a BoxProvider");
    }
    return context;
}
