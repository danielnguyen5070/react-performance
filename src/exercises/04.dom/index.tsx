import { useState, useRef, useEffect } from 'react'
import './index.css'
// 💰 you'll need this stuff:
import VanillaTilt from 'vanilla-tilt'

interface HTMLVanillaTiltElement extends HTMLDivElement {
	vanillaTilt?: VanillaTilt
}

const vanillaTiltOptions = {
	max: 25,
	speed: 400,
	glare: true,
	'max-glare': 0.5,
}

function Tilt({ max, speed, glare, maxGlare, children }: {
	max?: number
	speed?: number
	glare?: boolean
	maxGlare?: number
	children: React.ReactNode
}) {

	const tiltRef = useRef<HTMLVanillaTiltElement>(null)
	useEffect(() => {
		const current = tiltRef.current
		if (!current) return
		const newOptions = {
			max: max ?? vanillaTiltOptions.max,
			speed: speed ?? vanillaTiltOptions.speed,
			glare: glare ?? vanillaTiltOptions.glare,
			'max-glare': maxGlare ?? vanillaTiltOptions['max-glare'],
		}
		VanillaTilt.init(current, newOptions)
		return () => {
			current.vanillaTilt?.destroy()
		}
	}, [max, speed, glare, maxGlare])

	return (
		<div ref={tiltRef}
			className="tilt-root" >
			<div className="tilt-child">{children}</div>
		</div >
	)
}

function App() {
	const [showTilt, setShowTilt] = useState(true)
	const [count, setCount] = useState(0)
	const [options, setOptions] = useState(vanillaTiltOptions)
	const { max, speed, glare, 'max-glare': maxGlare } = options
	return (
		<div className='mt-12 mx-auto max-w-4xl p-6'>
			<form className='mb-4'>
				<div>
					<label className='block mb-2'>
						Max Tilt:
					</label>
					<input
						type='number'
						value={max}
						onChange={e => setOptions(o => ({ ...o, max: +e.target.value }))}
						className='ml-2 p-1 border rounded'
					/>
				</div>
				<div>
					<label className='block mb-2'>
						Tilt Speed:
					</label>
					<input
						type='number'
						value={speed}
						onChange={e => setOptions(o => ({ ...o, speed: +e.target.value }))}
						className='ml-2 p-1 border rounded'
					/>
				</div>
				<div>
					<label className='block mb-2'>
						Glare:
					</label>
					<input
						type='checkbox'
						checked={glare}
						onChange={e => setOptions(o => ({ ...o, glare: e.target.checked }))}
						className='ml-2'
					/>
				</div>
				<div>
					<label className='block mb-2'>
						Max Glare:
					</label>
					<input
						type='number'
						value={maxGlare}
						onChange={e => setOptions(o => ({ ...o, 'max-glare': +e.target.value }))}
						className='ml-2 p-1 border rounded'
					/>
				</div>
			</form>
			<label>
				<input
					type='checkbox'
					className='mr-1'
					onChange={() => setShowTilt(s => !s)}></input>
				Toggle Visibility
			</label>

			{showTilt ? (
				<Tilt max={max} speed={speed} glare={glare} maxGlare={maxGlare}>
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