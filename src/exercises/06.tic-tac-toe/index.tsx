import React, { use, useEffect, useState } from 'react'

const defaultState = Array(9).fill(null)

function Board() {
	const [squares, setSquares] = useState<Squares>(() => {
		const storedSquares = localStorage.getItem('squares')
		try {
			return storedSquares ? JSON.parse(storedSquares) : defaultState
		} catch {
			return defaultState
		}
	})
	const status = calculateStatus(squares)
	const nextValue = calculateNextValue(squares)

	useEffect(() => {
		localStorage.setItem('squares', JSON.stringify(squares))
	}, [squares])

	function handleClick(i: number) {
		if (squares[i] || calculateWinner(squares)) return
		const newSquares = squares.slice()
		newSquares[i] = nextValue
		setSquares(newSquares)
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

	function restartGame() {
		setSquares(defaultState)
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
				onClick={restartGame}
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

type Player = 'X' | 'O'
type Squares = Array<Player | null>

function calculateNextValue(squares: Squares): Player {
	const xCount = squares.filter(square => square === 'X').length
	const oCount = squares.filter(square => square === 'O').length
	return xCount === oCount ? 'X' : 'O'
}

function calculateWinner(squares: Squares): Player | null {
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

function calculateStatus(squares: Squares): string {
	const winner = calculateWinner(squares)
	if (winner) {
		return `Winner: ${winner}`
	} else if (squares.every(square => square !== null)) {
		return 'Draw'
	} else {
		return `Next player: ${calculateNextValue(squares)}`
	}
}

export default App
