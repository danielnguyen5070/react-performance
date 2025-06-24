import React from 'react'

const defaultState = Array(9).fill(null)

function Board() {
	const squares = defaultState
	function renderSquare(i: number) {
		return (
			<button
				className="w-20 h-20 text-2xl font-semibold border border-gray-300 hover:bg-gray-100 flex items-center justify-center transition-all duration-150"
			>
				{squares[i]}
			</button>
		)
	}

	return (
		<div className="flex flex-col items-center gap-4">
			<div className="text-xl font-bold text-gray-700">STATUS</div>

			<div className="grid grid-cols-3 gap-2">
				{renderSquare(0)}
				{renderSquare(1)}
				{renderSquare(2)}
				{renderSquare(3)}
				{renderSquare(4)}
				{renderSquare(5)}
				{renderSquare(6)}
				{renderSquare(7)}
				{renderSquare(8)}
			</div>

			<button
				className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
			>
				Restart
			</button>
		</div>
	)
}

function App() {
	return (
		<div className="min-h-screen flex items-start justify-center bg-gray-50">
			<div className="p-6 bg-white rounded-lg shadow-md">
				<Board />
			</div>
		</div>
	)
}

// create a type for the squares state
// create a function to calculate:
// 	calculateNextValue
// 	calculateStatus
// 	calculateWinner

export default App
