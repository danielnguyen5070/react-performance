import { useState } from 'react'
import './index.css'
// 💰 you'll need this stuff:
// import VanillaTilt from 'vanilla-tilt'

// interface HTMLVanillaTiltElement extends HTMLDivElement {
// 	vanillaTilt?: VanillaTilt
// }

// const vanillaTiltOptions = {
// 	max: 25,
// 	speed: 400,
// 	glare: true,
// 	'max-glare': 0.5,
// }

function Tilt({ children }: { children: React.ReactNode }) {
	return (
		<div className="tilt-root" >
			<div className="tilt-child">{children}</div>
		</div >
	)
}

function App() {
	const [showTilt, setShowTilt] = useState(true)
	const [count, setCount] = useState(0)
	return (
		<div className='mt-12 mx-auto max-w-4xl p-6'>
			<label>
				<input
					type='checkbox'
					className='mr-1'
					onChange={() => setShowTilt(s => !s)}></input>
				Toggle Visibility
			</label>

			{showTilt ? (
				<Tilt>
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