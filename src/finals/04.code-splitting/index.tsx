import { useState, lazy, Suspense, useTransition } from 'react'
import './index.css'
import { useSpinDelay } from 'spin-delay'
const loadGlobe = () => import('./globe')
const Globe = lazy(loadGlobe)

function App() {
	const [showGlobe, setShowGlobe] = useState(false)
	const [startTransition, setStartTransition] = useTransition()
	const isPending = useSpinDelay(startTransition)
	
	return (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				flexDirection: 'column',
				justifyContent: 'center',
				height: '100%',
				padding: '2rem',
				opacity: isPending ? 0.5 : 1,
			}}
		>
			<label style={{ marginBottom: '1rem' }}
				onFocus={loadGlobe}
				onMouseEnter={loadGlobe}>
				<input
					type="checkbox"
					checked={showGlobe}
					onChange={(e) => setStartTransition(() => setShowGlobe(e.currentTarget.checked))}
				/>
				{' show globe'}
			</label>
			<div style={{ width: 400, height: 400 }}>
				<Suspense fallback={<div>Loading globe...</div>}>
					{showGlobe ? <Globe /> : null}
				</Suspense>
			</div>
		</div>
	)
}

export default App