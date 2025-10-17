import { useState } from "react";
import { Box1 } from "./Box1";
import { Box2 } from "./Box2";
import { Box3 } from "./Box3";
import { Box4 } from "./Box4";
import { Box5 } from "./Box5";

function Main({
	box1,
	box2,
	box3,
	box4,
	box5,
}: {
	box1: React.ReactNode;
	box2: React.ReactNode;
	box3: React.ReactNode;
	box4: React.ReactNode;
	box5: React.ReactNode;
}) {
	const [count, setCount] = useState(0);
	const increment = () => setCount((c) => c + 1);
	return (
		<main className="space-y-6 mt-6">
			<button
				onClick={increment}
				className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
			>
				The count is {count}
			</button>
			<div className="grid grid-cols-2 gap-4">{[box1, box2, box3, box4, box5]}</div>
		</main>
	);
}

function App() {
	return (
		<div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
			<div className="w-full max-w-xl bg-white p-6 rounded-2xl shadow-lg space-y-6">
				<Main
					box1={<Box1 />}
					box2={<Box2 />}
					box3={<Box3 />}
					box4={<Box4 />}
					box5={<Box5 />}
				/>
			</div>
		</div>
	);
}

export default App;
