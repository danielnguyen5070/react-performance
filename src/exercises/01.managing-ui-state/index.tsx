import { useState } from 'react'
import { generateGradient, getMatchingPosts } from '../../shared/blog-posts'

function getQueryParam() {
	const params = new URLSearchParams(window.location.search)
	return params.get('query') ?? ''
}

export default function App() {
	const [query, setQuery] = useState(getQueryParam)
	const words = query.split(' ')

	const dogChecked = words.includes('dog')
	const catChecked = words.includes('cat')
	const caterpillarChecked = words.includes('caterpillar')

	function handleCheck(tag: string, checked: boolean) {
		const newWords = checked ? [...words, tag] : words.filter(w => w !== tag)
		setQuery(newWords.filter(Boolean).join(' ').trim())
	}

	return (
		<div className="min-h-screen py-8 px-4">
			<div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6 space-y-6">
				<form className="space-y-4">
					<div className="flex flex-col space-y-1">
						<label htmlFor="searchInput" className="text-gray-700 font-semibold">
							Search:
						</label>
						<input
							id="searchInput"
							name="query"
							type="search"
							value={query}
							onChange={e => setQuery(e.currentTarget.value)}
							className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="Type to search..."
						/>
					</div>

					<div className="flex flex-wrap gap-4">
						<label className="flex items-center gap-2 text-gray-600">
							<input
								type="checkbox"
								checked={dogChecked}
								onChange={e => handleCheck('dog', e.currentTarget.checked)}
								className="accent-blue-500"
							/>
							<span>🐶 dog</span>
						</label>
						<label className="flex items-center gap-2 text-gray-600">
							<input
								type="checkbox"
								checked={catChecked}
								onChange={e => handleCheck('cat', e.currentTarget.checked)}
								className="accent-blue-500"
							/>
							<span>🐱 cat</span>
						</label>
						<label className="flex items-center gap-2 text-gray-600">
							<input
								type="checkbox"
								checked={caterpillarChecked}
								onChange={e => handleCheck('caterpillar', e.currentTarget.checked)}
								className="accent-blue-500"
							/>
							<span>🐛 caterpillar</span>
						</label>
					</div>

					<button
						type="submit"
						className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
					>
						Submit
					</button>
				</form>

				<MatchingPosts query={query} />
			</div>
		</div>
	)
}

function MatchingPosts({ query }: { query: string }) {
	const matchingPosts = getMatchingPosts(query)

	return (
		<ul className="space-y-4">
			{matchingPosts.map(post => (
				<li
					key={post.id}
					className="flex items-center gap-4 bg-gray-100 p-4 rounded-md shadow-sm"
				>
					<div
						className="w-16 h-16 rounded-full flex-shrink-0"
						style={{ background: generateGradient(post.id) }}
					/>
					<a
						href={post.id}
						onClick={event => {
							event.preventDefault()
							alert(`Great! Let's go to ${post.id}!`)
						}}
						className="flex-1"
					>
						<h2 className="text-lg font-bold text-gray-800">{post.title}</h2>
						<p className="text-sm text-gray-600">{post.description}</p>
					</a>
				</li>
			))}
		</ul>
	)
}

