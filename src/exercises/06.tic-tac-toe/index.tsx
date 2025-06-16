import React, { useState } from 'react'

const defaultState = Array(9).fill(null)

function Board() {
	const [squares, setSquares] = useState<Array<string | null>>(defaultState)

	const status = calculateStatus(squares)
	const nextValue = calculateNextValue(squares)
	function handleClick(i: number) {
		if (squares[i] || calculateWinner(squares)) {
			return
		}
		const newSquares = squares.slice()
		newSquares[i] = nextValue
		setSquares(newSquares)
	}

	function handleRestart() {
		setSquares(defaultState)
	}

	function renderSquare(i: number) {
		return (
			<button
				onClick={() => handleClick(i)}
				className="w-20 h-20 text-2xl font-semibold border border-gray-300 hover:bg-gray-100 flex items-center justify-center transition-all duration-150"
			>
				{squares[i]}
			</button>
		)
	}

	return (
		<div className="flex flex-col items-center gap-4">
			<div className="text-xl font-bold text-gray-700">{status}</div>

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
			onClick={handleRestart}
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

// - nextValue ('X' or 'O')
function calculateNextValue(squares: (string | null)[]) {
	return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
}
// - winner ('X', 'O', or null)
function calculateWinner(squares: (string | null)[]) {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	]
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i]
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares[a]
		}	
	}
	return null
}
// - status (`Winner: ${winner}`, `Scratch: Cat's game`, or `Next player: ${nextValue}`)
function calculateStatus(squares: (string | null)[]) {
	const winner = calculateWinner(squares)
	const nextValue = calculateNextValue(squares)
	if (winner) {
		return `Winner: ${winner}`
	}
	if (squares.filter(Boolean).length === 9) {
		return `Scratch: Cat's game`
	}
	return `Next player: ${nextValue}`	
}

export default App
