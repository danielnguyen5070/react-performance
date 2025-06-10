const blogPosts = [
	{
		id: 'cc96d5325894a',
		title: 'The Joy of Owning a Dog',
		background: 'bg-blue-500',
		description:
			'Discover the happiness and companionship that comes with owning a dog.',
		tags: ['dog', 'happiness'],
	},
	{
		id: 'b912d5c6674bb',
		title: 'Caring for Your Feline Friend',
		background: 'bg-green-500',
		description:
			'Learn how to provide the best care for your beloved cat (not caterpillar).',
		tags: ['cat', 'care', 'caterpillar'],
	},
	{
		id: 'ed9189302b665',
		title: 'The Fascinating World of Caterpillars',
		background: 'bg-yellow-500',
		description:
			'Explore the incredible transformation of caterpillars into beautiful butterflies.',
		tags: ['caterpillar', 'butterfly'],
	},
	{
		id: '6903727b0009e',
		title: 'Training Your Dog: Tips and Tricks',
		background: 'bg-purple-500',
		description:
			'Discover effective techniques to train your dog and build a strong bond.',
		tags: ['dog', 'training'],
	},
	{
		id: 'c631e68546bf3',
		title: 'Cat Breeds: Choosing the Perfect Companion',
		background: 'bg-pink-500',
		description:
			'Find the ideal cat breed that matches your lifestyle and personality.',
		tags: ['cat', 'breeds'],
	},
	{
		id: '0c2ef14638642',
		title: 'The Life Cycle of a Butterfly',
		background: 'bg-orange-500',
		description:
			"Learn about the stages of a butterfly's life and its importance in nature.",
		tags: ['caterpillar', 'butterfly'],
	},
	{
		id: 'd75f1c4c29da1',
		title: 'Dog Health: Common Issues and Prevention',
		background: 'bg-red-500',
		description:
			'Discover how to keep your dog healthy and prevent common health problems.',
		tags: ['dog', 'health'],
	},
	{
		id: '537c25b372465',
		title: 'Cat Behavior: Understanding Your Feline Friend',
		background: 'bg-teal-500',
		description:
			'Gain insights into the behavior of cats, why some hate dogs, and how to strengthen your bond with them.',
		tags: ['cat', 'behavior', 'dog'],
	},
	{
		id: '12556f3115f1',
		title: 'Gardening for Caterpillars: Creating a Butterfly Haven',
		background: 'bg-gray-500',
		description:
			'Learn how to create a garden that attracts caterpillars and supports butterfly populations.',
		tags: ['caterpillar', 'gardening'],
	},
	{
		id: '405654d99d80d',
		title: 'Dog-Friendly Activities: Fun Adventures for You and Your Pup',
		background: 'bg-indigo-500',
		description:
			'Discover exciting activities to enjoy with your dog and create lasting memories.',
		tags: ['dog', 'activities'],
	},
] as const

export type BlogPost = (typeof blogPosts)[number]

export function getMatchingPosts(query: string) {
	const words = query.split(' ').map(w => w.trim())
	return blogPosts.filter(post => {
		if (!query) return true
		return (
			words.every(word => post.tags.some(tag => tag === word)) ||
			post.title.toLowerCase().includes(query.toLowerCase()) ||
			post.description.toLowerCase().includes(query.toLowerCase())
		)
	})
}
