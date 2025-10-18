import { useState } from 'react'
import './index.css'
import Globe from './globe.tsx'

function App() {
	const [showGlobe, setShowGlobe] = useState(false)

	return (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				flexDirection: 'column',
				justifyContent: 'center',
				height: '100%',
				padding: '2rem',
			}}
		>
			<label style={{ marginBottom: '1rem' }}>
				<input
					type="checkbox"
					checked={showGlobe}
					onChange={(e) => setShowGlobe(e.currentTarget.checked)}
				/>
				{' show globe'}
			</label>
			<div style={{ width: 400, height: 400 }}>
				{showGlobe ? <Globe /> : null}
			</div>
		</div>
	)
}

export default App