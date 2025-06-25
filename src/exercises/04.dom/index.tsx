import { useEffect, useState, useRef } from 'react'
import VanillaTilt from 'vanilla-tilt'
import './index.css'

interface HTMLVanillaTiltElement extends HTMLDivElement {
	vanillaTilt?: VanillaTilt
}

const vanillaTiltOptions = {
	max: 25,
	speed: 400,
}

function Tilt({ max, speed, children }: { max: number; speed: number; children: React.ReactNode }) {
	const tiltNode = useRef<HTMLVanillaTiltElement>(null)

	useEffect(() => {
		const newOptions = {
			max,
			speed,
		}
		const tiltNodeCurrent = tiltNode.current
		if (!tiltNodeCurrent) return
		VanillaTilt.init(tiltNodeCurrent, newOptions)
		return () => {
			tiltNodeCurrent.vanillaTilt?.destroy()
		}
	}, [max, speed])

	return (
		<div
			className="tilt-root"
			ref={tiltNode}
		>
			<div className="tilt-child">{children}</div>
		</div>
	)
}

function App() {
	const [showTilt, setShowTilt] = useState(true)
	const [count, setCount] = useState(0)
	const [options, setOptions] = useState(vanillaTiltOptions)
	const { max, speed } = options
	return (
		<div>
			<form className="mb-4">
				<label className="block mb-2">
					Max Angle:
					<input
						className="ml-2 border border-gray-300 rounded p-1"
						type="number"
						value={max}
						onChange={(e) => setOptions(o => ({ ...o, max: Number(e.target.value) }))}
					/>
				</label>
				<label className="block mb-2">
					Speed:
					<input
						className="ml-2 border border-gray-300 rounded p-1"
						type="number"
						value={speed}
						onChange={(e) => setOptions(o => ({ ...o, speed: Number(e.target.value) }))}
					/>
				</label>
			</form>
			<label className="block mb-2">
				<input className='mr-1' type='checkbox' onChange={() => setShowTilt(s => !s)}></input>
				Toggle Visibility
			</label>

			{showTilt ? (
				<Tilt max={max} speed={speed}>
					<div className="totally-centered">
						<button
							className="count-button"
							onClick={() => setCount(c => c + 1)}
						>
							{count}
						</button>
					</div>
				</Tilt>
			) : null}
		</div>
	)
}

export default App;