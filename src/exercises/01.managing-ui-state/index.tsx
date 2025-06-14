import { useState } from 'react'
import { getMatchingPosts } from '../../shared/blog-posts'

function getQueryParam() {
	console.log('getQueryParam called')
	const param = new URLSearchParams(window.location.search)
	return param.get('query') || ''
}

function App() {
	const [query, setQuery] = useState(getQueryParam)

	const isDogChecked = query.includes('dog')
	const isCatChecked = query.includes('cat')
	const isCaterpillarChecked = query.includes('caterpillar')

	// simple function to handle checkbox change with props: {tag: string, checked: boolean}
	function handleCheckboxChange({ tag, checked }: { tag: string; checked: boolean }) {
		const words = query.split(' ').map(w => w.trim())
		const newQuery = checked
			? [...words, tag]
			: words.filter(word => word !== tag)
		setQuery(newQuery.join(' '))
	}
	return (
		<>
			<div className="max-w-4xl mx-auto p-6">
				<h1 className="text-2xl font-bold mb-4">Blog Post Search</h1>
				<form className="mb-6">
					<div className="mb-4">
						<label
							htmlFor="search"
							className="block text-sm font-medium text-gray-700"
						>
							Search Posts
						</label>
						<input
							type="text"
							id="search"
							className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
							placeholder="Enter keywords..."
							value={query}
							onChange={e => setQuery(e.target.value)}
						/>
					</div>
					<div className="mb-4">
						<div className="mt-2 space-x-4">
							<label className="inline-flex items-center">
								<input
									type="checkbox"
									className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
									checked={isCatChecked}
									onChange={e =>
										handleCheckboxChange({
											tag: 'cat',
											checked: e.target.checked,
										})
									}
								/>
								<span className="ml-2">Cat</span>
							</label>
							<label className="inline-flex items-center">
								<input
									type="checkbox"
									className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
									checked={isDogChecked}
									onChange={e =>
										handleCheckboxChange({
											tag: 'dog',
											checked: e.target.checked,
										})
									}
								/>
								<span className="ml-2">Dog</span>
							</label>
							<label className="inline-flex items-center">
								<input
									type="checkbox"
									className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
									checked={isCaterpillarChecked}
									onChange={e =>
										handleCheckboxChange({
											tag: 'caterpillar',
											checked: e.target.checked,
										})
									}
								/>
								<span className="ml-2">Caterpillar</span>
							</label>
						</div>
					</div>
					<button
						type="submit"
						className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-300"
					>
						Search
					</button>
				</form>
				<MatchingPosts query={query} />
			</div>
		</>
	)
}

// create a component MatchingPosts to display matching posts (add some tailwind styles)
// - auto genereate a panel using background color from the post
// - it accept a query prop
// - it use the getMatchingPosts function to get the matching posts
// - it have a list of tags to display
function MatchingPosts({ query }: { query: string }) {
	const posts = getMatchingPosts(query)
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
			{posts.map(post => (
				<div
					key={post.id}
					className={`p-4 rounded-lg shadow-md ${post.background}`}
				>
					<h2 className="text-xl font-bold">{post.title}</h2>
					<p className="mt-2">{post.description}</p>
					<div className="mt-4">
						{post.tags.map(tag => (
							<span
								key={tag}
								className="inline-block bg-gray-200 text-gray-800 text-sm px-2 py-1 rounded-full mr-2"
							>
								{tag}
							</span>
						))}
					</div>
				</div>
			))}
		</div>
	)
}
export default App