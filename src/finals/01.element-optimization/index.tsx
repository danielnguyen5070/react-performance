import { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { ColorProvider } from "./colorProvider";
import { Box1 } from "./Box1";
import { Box2 } from "./Box2";
import { Box3 } from "./Box3";
import { Box4 } from "./Box4";
function Main({
	box1,
	box2,
	box3,
	box4,
}: {
	box1: React.ReactNode;
	box2: React.ReactNode;
	box3: React.ReactNode;
	box4: React.ReactNode;
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
			<div className="grid grid-cols-2 gap-4">{[box1, box2, box3, box4]}</div>
		</main>
	);
}

function App() {
	const [appCount, setAppCount] = useState(0);
	const [name, setName] = useState("Kody");

	return (
		<div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
			<div className="w-full max-w-xl bg-white p-6 rounded-2xl shadow-lg space-y-6">
				{/* Name Input */}
				<div>
					<p className="font-semibold mb-2">Set the footer name:</p>
					<label className="flex flex-col gap-2">
						<span className="text-sm text-gray-600">Name:</span>
						<input
							className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
							value={name}
							onChange={(e) => setName(e.currentTarget.value)}
						/>
					</label>
				</div>

				{/* App Count */}
				<button
					onClick={() => setAppCount((c) => c + 1)}
					className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
				>
					The app count is {appCount}
				</button>

				{/* Content */}
				<ColorProvider>
					<Header name={name} />
					<Main
						box1={<Box1 />}
						box2={<Box2 />}
						box3={<Box3 />}
						box4={<Box4 />}
					/>
					<Footer theme={name} />
				</ColorProvider>
			</div>
		</div>
	);
}

export default App;
