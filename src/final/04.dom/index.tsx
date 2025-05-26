import { useEffect, useRef, useState, useId } from 'react'
import VanillaTilt from 'vanilla-tilt'
import './index.css'

interface HTMLVanillaTiltElement extends HTMLDivElement {
	vanillaTilt?: VanillaTilt
}

function Tilt({
	children,
	max = 25,
	speed = 400,
	glare = true,
	maxGlare = 0.5,
}: {
	children: React.ReactNode
	max?: number
	speed?: number
	glare?: boolean
	maxGlare?: number
}) {
	const tiltRef = useRef<HTMLVanillaTiltElement>(null)

	useEffect(() => {
		const { current: tiltNode } = tiltRef
		if (!tiltNode) return
		const vanillaTiltOptions = {
			max,
			speed,
			glare,
			'max-glare': maxGlare,
		}
		VanillaTilt.init(tiltNode, vanillaTiltOptions)
		return () => tiltNode.vanillaTilt?.destroy()
	}, [glare, max, maxGlare, speed])

	return (
		<div ref={tiltRef} className="tilt-root">
			<div className="tilt-child">{children}</div>
		</div>
	)
}

export default function App() {
	const [showTilt, setShowTilt] = useState(true)
	const [count, setCount] = useState(0)
	const [options, setOptions] = useState({
		max: 25,
		speed: 400,
		glare: true,
		maxGlare: 0.5,
	})
	return (
		<div className="min-h-screen p-4">
			<div className="text-center mb-6">
				<button
					onClick={() => setShowTilt(s => !s)}
					className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
				>
					Toggle Visibility
				</button>
			</div>

			{showTilt ? (
				<div className="space-y-6 max-w-lg mx-auto">
					<form
						onSubmit={e => e.preventDefault()}
						onChange={event => {
							const formData = new FormData(event.currentTarget)
							setOptions({
								max: Number(formData.get('max')),
								speed: Number(formData.get('speed')),
								glare: formData.get('glare') === 'on',
								maxGlare: Number(formData.get('maxGlare')),
							})
						}}
						className="bg-white p-6 rounded-lg shadow-md grid gap-4"
					>
						<Field label="Max" name="max" type="number" defaultValue={25} />
						<Field label="Speed" name="speed" type="number" defaultValue={400} />
						<div className="flex items-center space-x-2">
							<input
								id="glare"
								name="glare"
								type="checkbox"
								defaultChecked
								className="accent-indigo-600"
							/>
							<label htmlFor="glare" className="font-medium">
								Glare
							</label>
						</div>
						<Field
							label="Max Glare"
							name="maxGlare"
							type="number"
							defaultValue={0.5}
						/>
					</form>

					<Tilt {...options}>
						<div className="totally-centered">
							<button
								onClick={() => setCount(c => c + 1)}
								className="count-button"
							>
								{count}
							</button>
						</div>
					</Tilt>
				</div>
			) : null}
		</div>
	)
}

function Field({
	label,
	...inputProps
}: {
	label: string
} & React.ComponentProps<'input'>) {
	const generatedId = useId()
	const id = inputProps.id ?? generatedId
	return (
		<div className="flex flex-col">
			<label htmlFor={id} className='mb-1 font-medium'>{label}</label>
			<input {...inputProps} id={id} className="border rounded px-3 py-2" />
		</div>
	)
}
