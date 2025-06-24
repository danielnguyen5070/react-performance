import { useState } from 'react'
// import VanillaTilt from 'vanilla-tilt'
//
// interface HTMLVanillaTiltElement extends HTMLDivElement {
// 	vanillaTilt?: VanillaTilt
// }
//
// const vanillaTiltOptions = {
// 	max: 25,
// 	speed: 400,
// }

function Tilt({ children }: { children: React.ReactNode }) {
	return (
		<div
			className="tilt-root"
			// add a ref callback here
			// the callback should accept a tiltNode parameter 
			// - if tiltNode is null, return
			// - call VanillaTilt.init(tiltNode, vanillaTiltOptions)
			// - return a cleanup function that will be called when element is removed
			//   - call tiltNode.vanillaTilt?.destroy()
		>
			<div className="tilt-child">{children}</div>
		</div>
	)
}

function App() {
	const [showTilt, setShowTilt] = useState(true)
	const [count, setCount] = useState(0)
	return (
		<div>
			<label className="block mb-2">
				<input className='mr-1' type='checkbox' onChange={() => setShowTilt(s => !s)}></input>
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