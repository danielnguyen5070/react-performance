import { createContext, use } from "react";

type ColorContextType = { color: string, setColor: (newColor: string) => void };
export const ColorContext = createContext<ColorContextType | null>(null);

export function useColor() {
    const color = use(ColorContext);
    if (!color) throw new Error("ColorContext not found");
    return color;
}
