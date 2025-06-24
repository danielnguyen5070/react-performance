import React, { useState } from 'react'
import { getMatchingPosts } from '../../shared/blog-posts'

function getQueryParam(): string {
	console.log('getQueryParam')
	const params = new URLSearchParams(window.location.search)
	return params.get("query") || ''
}

function App() {
	const [query, setQuery] = useState(getQueryParam)
	const words = query.split(' ')
	const isCheckDog = words.includes('dog')
	const isCheckCat = words.includes('cat')
	const isCheckCaterpillar = words.includes('caterpillar')

	function handleCheck(tag: string, checked: boolean) {
		const currentTags = query.split(' ').filter(Boolean)
		if (checked) {
			if (!currentTags.includes(tag)) {
				currentTags.push(tag)
			}
		} else {
			const index = currentTags.indexOf(tag)
			if (index > -1) {
				currentTags.splice(index, 1)
			}
		}
		setQuery(currentTags.join(' '))
	}
	return (
		<div>
			<form>
				<div className="mb-4">
					<label className="block text-gray-700 mb-2" htmlFor="search">
						Search:
					</label>
					<input
						type="text"
						id="search"
						className="w-full p-2 border rounded"
						placeholder="Search posts..."
						value={query}
						onChange={(e) => setQuery(e.target.value)}
					/>
				</div>
				<div className="mb-4">
					<div className="flex space-x-4">
						<label>
							<input type="checkbox" value="cat" className='mr-1'
								onChange={(e) => handleCheck("cat", e.target.checked)}
								checked={isCheckCat} />
							Cat
						</label>
						<label>
							<input type="checkbox" value="dog" className='mr-1'
								onChange={(e) => handleCheck("dog", e.target.checked)}
								checked={isCheckDog} />
							Dog
						</label>
						<label>
							<input type="checkbox" value="caterpillar" className='mr-1'
								onChange={(e) => handleCheck("caterpillar", e.target.checked)}
								checked={isCheckCaterpillar} />
							Caterpillar
						</label>
					</div>
				</div>
				<button
					type="submit"
					className="bg-blue-500 text-white px-4 py-2 rounded mb-8"
				>
					Search
				</button>
			</form>
			<MatchingPosts query={query} />
		</div>
	)
}

function MatchingPosts({ query }: { query: string }) {
	const posts = getMatchingPosts(query)
	return (
		<div className="space-y-4">
			{posts.map(post => (
				<div
					key={post.id}
					className="p-4 rounded-lg"
					style={{ backgroundColor: post.color }}
				>
					<h2 className="text-xl font-bold">{post.title}</h2>
					<p className="text-gray-700">{post.description}</p>
					<div className="mt-2">
						{post.tags.map(tag => (
							<span
								key={tag}
								className="inline-block bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-sm mr-2"
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