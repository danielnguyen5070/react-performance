import { useState } from "react";
import { ColorContext } from "./colorContext";

export function ColorProvider({ children }: { children: React.ReactNode }) {
    const [color, setColor] = useState("black");

    function setColorWrapper(newColor: string) {
        setColor(newColor);
    }
    const state = { color, setColor: setColorWrapper };
    return (
        <ColorContext.Provider value={state}>
            {children}
        </ColorContext.Provider>
    );
}