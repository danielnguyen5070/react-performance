import { generateGradient, getMatchingPosts } from '../../../shared/blog-posts'

function App() {
	// 🐨 call useState here and initialize the query with an empty string

	return (
		<div className="app">
			<form>
				<div>
					<label htmlFor="searchInput">Search:</label>
					<input
						id="searchInput"
						name="query"
						type="search"
					// 🐨 add an onChange handler here that calls setQuery with the event.currentTarget.value
					/>
				</div>
				<div>
					<label>
						<input type="checkbox" /> 🐶 dog
					</label>
					<label>
						<input type="checkbox" /> 🐱 cat
					</label>
					<label>
						<input type="checkbox" /> 🐛 caterpillar
					</label>
				</div>
				<button type="submit">Submit</button>
			</form>
			{/* 🐨 pass the query state as a prop */}
			<MatchingPosts query="" />
		</div>
	)
}

function MatchingPosts({ query }: { query: string }) {
	const matchingPosts = getMatchingPosts(query)

	return (
		<ul className="post-list mt-6 space-y-4 max-w-md mx-auto">
			{matchingPosts.map((post: any) => (
				<li
					key={post.id}
					className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4"
				>
					<div
						className="post-image w-16 h-16 rounded-lg"
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
						<h2 className="text-lg font-bold text-gray-800">
							{post.title}
						</h2>
						<p className="text-gray-600">{post.description}</p>
					</a>
				</li>
			))}
		</ul>
	)
}
export default App
