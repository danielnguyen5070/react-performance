import React from "react";

type BoxContextType = {
    text: string;
    name: string;
    setText: (text: string) => void;
    setName: (name: string) => void;
}
export const BoxContext = React.createContext<BoxContextType | null>(null);

export function useBoxContext() {
    const context = React.useContext(BoxContext);
    if (!context) {
        throw new Error("useBox must be used within a BoxProvider");
    }
    return context;
}
