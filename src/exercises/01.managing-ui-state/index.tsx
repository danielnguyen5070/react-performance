import { useState } from 'react'
import { getMatchingPosts } from '../../shared/blog-posts'

// write an App component (add tailwind styles)
// - This component renders a form with a search input and checkboxes for filtering blog posts.
// - It displays matching posts based on the search query and selected tags.
// - Button submits the form and updates the displayed posts.
function App() {
	const params = new URLSearchParams(window.location.search)
	console.log('params', params.get('query'))
	const initialQuery = params.get('query') ?? ''
	const [query, setQuery] = useState(initialQuery)

	const words = query.split(' ').map(w => w.trim())
	const isCheckedDog = words.includes('dog')
	const isCheckedCat = words.includes('cat')
	const isCheckedCaterpillar = words.includes('caterpillar')
	function handleCheckboxChange(
		tag: string,
		isChecked: boolean
	) {
		const words = query.split(' ').map(w => w.trim())
		const newWords = isChecked
			? [...words, tag]
			: words.filter(w => w !== tag)
		setQuery(newWords.filter(Boolean).join(' ').trim())
	}

	return (
		<div className="min-h-screen p-6 bg-gray-100">
			<div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 space-y-6">
				<form
					onSubmit={e => {
						e.preventDefault()
						// handle form submission logic here
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
							type="text"
							id="searchInput"
							name="query"
							className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="Type to search..."
							value={query}
							onChange={e => setQuery(e.currentTarget.value)}
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Tags:
						</label>
						<div className="flex flex-wrap gap-2">
							<div className="flex items-center">
								<input
									type="checkbox"
									id="dog"
									name="dog"
									className="mr-2"
									checked={isCheckedDog}
									onClick={(e) => handleCheckboxChange('dog', e.currentTarget.checked)}
								/>
								<label htmlFor="dog">Dog</label>
							</div>
							<div className="flex items-center">
								<input
									type="checkbox"
									id="cat"
									name="cat"
									className="mr-2"
									checked={isCheckedCat}
									onClick={(e) => handleCheckboxChange('cat', e.currentTarget.checked)}
								/>
								<label htmlFor="cat">Cat</label>
							</div>
							<div className="flex items-center">
								<input
									type="checkbox"
									id="caterpillar"
									name="caterpillar"
									className="mr-2"
									checked={isCheckedCaterpillar}
									onClick={(e) => handleCheckboxChange('caterpillar', e.currentTarget.checked)}
								/>
								<label htmlFor="caterpillar">Caterpillar</label>								
							</div>
						</div>
					</div>
					<button
						type="submit"
						className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
					>
						Search
					</button>
				</form>
				<MatchingPosts query={query} />
			</div>
		</div>
	)
}

// create a component MatchingPosts to display matching posts (add some tailwind styles)
// - auto genereate a panel using background color from the post
// - it accept a query prop
// - it use the getMatchingPosts function to get the matching posts
// - it have a list of tags to display
function MatchingPosts({ query }: { query: string }) {
	const matchingPosts = getMatchingPosts(query)

	return (
		<div className="space-y-4">
			{matchingPosts.map(post => (
				<div
					key={post.id}
					className={`p-4 rounded-lg shadow-md ${post.background} text-white`}
				>
					<h3 className="text-lg font-semibold">{post.title}</h3>
					<p className="mt-2">{post.description}</p>
					<div className="mt-2 flex flex-wrap gap-2">
						{post.tags.map(tag => (
							<span
								key={tag}
								className="bg-white text-blue-600 px-2 py-1 rounded-full text-xs"
							>
								{tag}
							</span>
						))}
					</div>
				</div>
			))}
			{matchingPosts.length === 0 && (
				<p className="text-gray-500">No matching posts found.</p>
			)}
		</div>
	)
}

export default App