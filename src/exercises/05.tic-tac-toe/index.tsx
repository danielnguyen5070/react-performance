import { useEffect, useState } from 'react'
import {
	calculateNextValue,
	calculateStatus,
	calculateWinner,
	isValidGameState,
	type GameState,
	type Squares,
} from '../../shared/tic-tac-toe-utils'

function Board({
	squares,
	onClick,
}: {
	squares: Squares
	onClick: (index: number) => void
}) {
	function renderSquare(i: number) {
		const value = squares[i]
		const label = value ? `square ${i}, ${value}` : `square ${i} empty`

		return (
			<button
				className="w-20 h-20 text-2xl font-bold border border-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
				onClick={() => onClick(i)}
				aria-label={label}
			>
				{value}
			</button>
		)
	}

	return (
		<div className="grid grid-cols-3 gap-1">
			{Array.from({ length: 9 }, (_, i) => renderSquare(i))}
		</div>
	)
}

const defaultState: GameState = {
	history: [Array(9).fill(null)],
	currentStep: 0,
}

const localStorageKey = 'tic-tac-toe'

export default function App() {
	const [state, setState] = useState<GameState>(() => {
		try {
			const stored = JSON.parse(
				window.localStorage.getItem(localStorageKey) ?? 'null',
			)
			return isValidGameState(stored) ? stored : defaultState
		} catch {
			return defaultState
		}
	})

	const currentSquares = state.history[state.currentStep]
	const winner = calculateWinner(currentSquares)
	const nextValue = calculateNextValue(currentSquares)
	const status = calculateStatus(winner, currentSquares, nextValue)

	useEffect(() => {
		window.localStorage.setItem(localStorageKey, JSON.stringify(state))
	}, [state])

	function selectSquare(index: number) {
		if (winner || currentSquares[index]) return

		setState(prev => {
			const newHistory = prev.history.slice(0, prev.currentStep + 1)
			const squares = [...prev.history[prev.currentStep]]
			squares[index] = nextValue

			return {
				history: [...newHistory, squares],
				currentStep: newHistory.length,
			}
		})
	}

	function restart() {
		setState(defaultState)
	}

	const moves = state.history.map((_stepSquares, step) => {
		const desc = step ? `Go to move #${step}` : 'Go to game start'
		const isCurrent = step === state.currentStep

		return (
			<li key={step}>
				<button
					className={`text-sm underline hover:text-indigo-600 disabled:opacity-50 disabled:no-underline`}
					onClick={() => setState(prev => ({ ...prev, currentStep: step }))}
					disabled={isCurrent}
				>
					{desc} {isCurrent && <span className="text-gray-500">(current)</span>}
				</button>
			</li>
		)
	})

	return (
		<div className="min-h-screen flex justify-center bg-gray-50 p-4">
			<div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 space-y-6">
				<h1 className="text-2xl font-semibold text-center text-indigo-600">
					Tic-Tac-Toe
				</h1>
				<div className="flex flex-col items-center gap-4">
					<Board squares={currentSquares} onClick={selectSquare} />
					<button
						className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
						onClick={restart}
					>
						Restart Game
					</button>
				</div>
				<div className="text-center mt-4" aria-live="polite">
					<p className="text-gray-700 font-medium">{status}</p>
				</div>
				<ol className="list-decimal list-inside space-y-1">{moves}</ol>
			</div>
		</div>
	)
}
