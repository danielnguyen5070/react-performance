import { BoxContext } from "./UseBox";
import React, { useMemo, useState } from "react";

export function BoxContextProvider({ children }: { children: React.ReactNode; }) {
    const [text, setText] = useState("GrandchildBox Text");
    const [name, setName] = useState("Daniel");

    const value = useMemo(() => ({ text, name, setText, setName }), [text, name]);;
    return (
        <BoxContext.Provider value={value}>
            {children}
        </BoxContext.Provider>
    )
}