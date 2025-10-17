import { useColor } from "./colorContext";

function Header({ name }: { name: string }) {
    const { color } = useColor();
    return (
        <header
            className="text-2xl font-semibold text-center py-4"
            style={{ color }}
        >
            I am the ({color}) header, {name || "Unnamed"}
        </header>
    );
}

export default Header