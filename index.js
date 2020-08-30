const visit = require('unist-util-visit')
const unified = require('unified')
const parse = require('rehype-parse')
const toText = require('hast-util-to-text')
const { Molecule } = require('openchemlib')

const cacheMaxLength = 50
const cache = []

module.exports = rehypeSmiles

const assign = Object.assign

const parseHtml = unified().use(parse, {
	fragment: true,
	position: false,
})

const source = 'rehype-smiles'

function toSVG(smiles) {
	try {
		const cacheIndex = cache.findIndex(
			([cachedSmiles, cachedSVG]) => cachedSmiles === smiles
		)

		if (cacheIndex !== -1) {
			return cache[cacheIndex][1]
		}

		const mol = Molecule.fromSmiles(smiles)
		const rect = mol.getBounds()

		const modif = 40
		const width = rect.width * modif
		const height = rect.height * modif

		const svg = mol
			.toSVG(width, height, 'molecule', {
				autoCrop: true,
			})
			.replace(/\n/g, ' ')

		cache.push([smiles, svg])
		if (cache.length > cacheMaxLength) cache.splice(0, 1) //delete the oldest

		return svg
	} catch (error) {
		console.error(
			'error converting math :',
			JSON.stringify(value)
		)
		console.error(error)
		return value
	}
}

function rehypeSmiles(options) {
	const settings = options || {}
	const throwOnError = settings.throwOnError || false

	return transformChemical

	function transformChemical(tree, file) {
		visit(tree, 'element', onelement)

		function onelement(element) {
			const classes = element.properties.className || []
			const inline = classes.includes('chemical-inline')
			const displayMode = classes.includes(
				'chemical-display'
			)

			if (
				!inline &&
				!displayMode &&
				!classes.includes('chemical')
			) {
				return
			}

			const value = toText(element)

			/*
			console.log('`````````````````')
			console.log(JSON.stringify(value))
			console.log('>`````````````````')
			*/

			let result = toSVG(value)
			element.children = [parseHtml.parse(result)]
		}
	}
}
