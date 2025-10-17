import React, { useState, memo } from "react";
import { BoxContextProvider } from "./BoxProvider";
import { useBoxContext } from "./UseBox";

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

    return (
        <BoxContextProvider>
            <div className="p-4 bg-green-500 rounded-xl shadow-sm">
                <div className="font-bold">Box</div>
                <button
                    className="mt-2 px-3 py-1 bg-blue-500 text-white rounded-lg"
                    onClick={() => setCount(count + 1)}
                >
                    Count is {count}
                </button>
                <BoxSetting />
                <ChildBox grandchild={grandchildBoxElement} />
            </div>
        </BoxContextProvider>
    )
}

const BoxSetting = memo(function () {
    const { text, name, setText, setName } = useBoxContext();
    console.log("Render BoxSetting");
    return (
        <>
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
        </>
    )
})
