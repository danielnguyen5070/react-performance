import { useEffect, useState } from 'react'
import {
	type BlogPost,
	getMatchingPosts,
} from '../../shared/blog-posts'
import { setGlobalSearchParams } from '../../shared/utils'

function getQueryParam() {
	const params = new URLSearchParams(window.location.search)
	return params.get('query') ?? ''
}

export default function App() {
	const [query, setQuery] = useState(getQueryParam)

	useEffect(() => {
		const updateQuery = () => setQuery(getQueryParam())
		window.addEventListener('popstate', updateQuery)
		return () => {
			window.removeEventListener('popstate', updateQuery)
		}
	}, [])

	return (
		<div className="min-h-screen p-6">
			<div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 space-y-6">
				<Form query={query} setQuery={setQuery} />
				<MatchingPosts query={query} />
			</div>
		</div>
	)
}

function Form({
	query,
	setQuery,
}: {
	query: string
	setQuery: (query: string) => void
}) {
	const words = query.split(' ').map(w => w.trim())

	const dogChecked = words.includes('dog')
	const catChecked = words.includes('cat')
	const caterpillarChecked = words.includes('caterpillar')

	function handleCheck(tag: string, checked: boolean) {
		const newWords = checked ? [...words, tag] : words.filter(w => w !== tag)
		setQuery(newWords.filter(Boolean).join(' ').trim())
	}

	return (
		<form
			onSubmit={e => {
				e.preventDefault()
				setGlobalSearchParams({ query })
			}}
			className="space-y-4"
		>
			<div>
				<label
					htmlFor="searchInput"
					className="block text-sm font-medium text-gray-700 mb-1"
				>
					Search:
				</label>
				<input
					id="searchInput"
					name="query"
					type="search"
					value={query}
					onChange={e => setQuery(e.currentTarget.value)}
					className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
			</div>

			<div className="flex flex-wrap gap-4">
				<label className="flex items-center gap-2 text-sm">
					<input
						type="checkbox"
						className="accent-blue-500"
						checked={dogChecked}
						onChange={e => handleCheck('dog', e.currentTarget.checked)}
					/>
					<span>🐶 Dog</span>
				</label>
				<label className="flex items-center gap-2 text-sm">
					<input
						type="checkbox"
						className="accent-blue-500"
						checked={catChecked}
						onChange={e => handleCheck('cat', e.currentTarget.checked)}
					/>
					<span>🐱 Cat</span>
				</label>
				<label className="flex items-center gap-2 text-sm">
					<input
						type="checkbox"
						className="accent-blue-500"
						checked={caterpillarChecked}
						onChange={e =>
							handleCheck('caterpillar', e.currentTarget.checked)
						}
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
	)
}

function MatchingPosts({ query }: { query: string }) {
	const matchingPosts = getMatchingPosts(query)

	return (
		<ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
			{matchingPosts.map(post => (
				<Card key={post.id} post={post} />
			))}
		</ul>
	)
}

function Card({ post }: { post: BlogPost }) {
	const [isFavorited, setIsFavorited] = useState(false)

	return (
		<li className="relative bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden">
			<div
				className="h-32"
			/>
			<div className="absolute top-2 right-2">
				<button
					aria-label={isFavorited ? "Remove favorite" : "Add favorite"}
					onClick={() => setIsFavorited(!isFavorited)}
					className="text-2xl"
				>
					{isFavorited ? '❤️' : '🤍'}
				</button>
			</div>
			<a
				href={post.id}
				onClick={event => {
					event.preventDefault()
					alert(`Great! Let's go to ${post.id}!`)
				}}
				className="block p-4"
			>
				<h2 className="text-lg font-semibold text-gray-800 mb-1">
					{post.title}
				</h2>
				<p className="text-sm text-gray-600">{post.description}</p>
			</a>
		</li>
	)
}
