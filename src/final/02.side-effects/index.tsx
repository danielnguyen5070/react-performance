import { useEffect, useState } from 'react'
import { generateGradient, getMatchingPosts } from '../../shared/blog-posts'
import { setGlobalSearchParams } from '../../shared/utils'

function getQueryParam() {
	const params = new URLSearchParams(window.location.search)
	return params.get('query') ?? ''
}

function App() {
	const [query, setQuery] = useState(getQueryParam)
	const words = query.split(' ')
	const dogChecked = words.includes('dog')
	const catChecked = words.includes('cat')
	const caterpillarChecked = words.includes('caterpillar')

	useEffect(() => {
		const hugeData = new Array(1_000_000).fill(
			new Array(1_000_000).fill('🐶🐱🐛'),
		)
		function updateQuery() {
			console.log(hugeData)
			console.log('popstate event listener called')
			setQuery(getQueryParam())
		}
		window.addEventListener('popstate', updateQuery)
		return () => {
			window.removeEventListener('popstate', updateQuery)
		}
	}, [])

	function handleCheck(tag: string, checked: boolean) {
		const newWords = checked ? [...words, tag] : words.filter(w => w !== tag)
		setQuery(newWords.filter(Boolean).join(' ').trim())
	}

	return (
		<div className="max-w-3xl mx-auto p-6 space-y-6 bg-white shadow-md rounded-lg">
			<form
				className="space-y-4"
				onSubmit={e => {
					e.preventDefault();
					setGlobalSearchParams({ query });
				}}
			>
				<div className="flex flex-col">
					<label htmlFor="searchInput" className="text-sm font-semibold mb-1">
						Search:
					</label>
					<input
						id="searchInput"
						name="query"
						type="search"
						className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
						value={query}
						onChange={e => setQuery(e.currentTarget.value)}
					/>
				</div>

				<div className="flex flex-wrap gap-4">
					<label className="flex items-center gap-2">
						<input
							type="checkbox"
							className="accent-blue-500"
							checked={dogChecked}
							onChange={e => handleCheck('dog', e.currentTarget.checked)}
						/>
						<span>🐶 Dog</span>
					</label>
					<label className="flex items-center gap-2">
						<input
							type="checkbox"
							className="accent-blue-500"
							checked={catChecked}
							onChange={e => handleCheck('cat', e.currentTarget.checked)}
						/>
						<span>🐱 Cat</span>
					</label>
					<label className="flex items-center gap-2">
						<input
							type="checkbox"
							className="accent-blue-500"
							checked={caterpillarChecked}
							onChange={e => handleCheck('caterpillar', e.currentTarget.checked)}
						/>
						<span>🐛 Caterpillar</span>
					</label>
				</div>

				<button
					type="submit"
					className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
				>
					Submit
				</button>
			</form>

			<MatchingPosts query={query} />
		</div>
	)
}

function MatchingPosts({ query }: { query: string }) {
	const matchingPosts = getMatchingPosts(query)

	return (
		<ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
			{matchingPosts.map(post => (
				<li
					key={post.id}
					className="border rounded-lg shadow hover:shadow-lg transition"
				>
					<div
						className="h-32 rounded-t-lg"
						style={{ background: generateGradient(post.id) }}
					/>
					<a
						href={post.id}
						className="block p-4"
						onClick={event => {
							event.preventDefault()
							alert(`Great! Let's go to ${post.id}!`)
						}}
					>
						<h2 className="text-lg font-semibold mb-1">{post.title}</h2>
						<p className="text-sm text-gray-600">{post.description}</p>
					</a>
				</li>
			))}
		</ul>
	)
}

export default function DemoApp() {
	const [showForm, setShowForm] = useState(true)

	return (
		<div className="min-h-screen">
			<label className="flex items-center gap-2 mb-4">
				<input
					type="checkbox"
					className="accent-blue-500"
					checked={showForm}
					onChange={e => setShowForm(e.currentTarget.checked)}
				/>
				<span className="text-sm">Show form</span>
			</label>
			{showForm && <App />}
		</div>
	)
}
