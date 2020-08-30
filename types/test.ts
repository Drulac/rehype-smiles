import unified from 'unified'
import smiles from 'rehype-smiles'

// $ExpectType Processor<Settings>
unified().use(smiles)
// $ExpectType Processor<Settings>
unified().use(smiles, {output: 'html'})
// $ExpectError
unified().use(smiles, {invalidProp: true})
