import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';

function App() {
	const [theme, setTheme] = useState('light');
	const [appCounter, setAppCounter] = useState(0);
	return (
		<div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-black dark:text-white transition-all">
			<Header theme={theme} setTheme={setTheme} />
			<div className="flex-1 p-4 justify-center items-center flex flex-col">
				<button
					onClick={() => setAppCounter(appCounter + 1)}
					className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
				>
					Increment App Counter: {appCounter}
				</button>
			</div>
			<Footer theme={theme} />
		</div>
	);
}

export default App;
