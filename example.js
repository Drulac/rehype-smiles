const fs = require('fs')
const unified = require('unified')
const markdown = require('remark-parse')
const remarkSmiles = require('remark-smiles')
const remark2rehype = require('remark-rehype')
const rehypeSmiles = require('rehype-smiles')
const stringify = require('rehype-stringify')

unified()
	.use(markdown)
	.use(remarkSmiles)
	.use(remark2rehype)
	.use(rehypeSmiles)
	.use(stringify)
	.process(
		fs.readFileSync('./example.md', 'utf-8').toString(),
		function (err, file) {
			if (err) throw err
			console.log(String(file))
		}
	)
