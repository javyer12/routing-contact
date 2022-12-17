module.exports = {
	globDirectory: 'dist/',
	globPatterns: [
		'**/*.{css,js,png,html,svg}'
	],
	swDest: 'dist/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};