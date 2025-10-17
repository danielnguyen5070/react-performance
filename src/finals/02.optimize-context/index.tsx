import { Box } from "./Box";

function App() {
	return (
		<div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
			<div className="w-full max-w-xl bg-white p-6 rounded-2xl shadow-lg space-y-6">
				<Box />
			</div>
		</div>
	);
}

export default App;
