# rehype-smiles

[**rehype**][rehype] plugin to transform `<span class=chemical-inline>` and
`<div class=chemical-display>` with [openchemlib](https://github.com/cheminfo/openchemlib-js).

## Install

[npm][]:

```sh
npm install rehype-smiles
```

## Use

Say we have the following file, `example.html`:


```markdown
Ethanol (€CCO€)

€€C1CCCC1C€€
```

And our script, `example.js`, looks as follows:

```js
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
```

Now, running `node example` yields:

```html
<p>Ethanol (<span class="chemical chemical-inline"><svg id="molecule" xmlns="http://www.w3.org/2000/svg" version="1.1" width="63px" height="30px" viewBox="3 -5 63 30">   <style> #molecule { pointer-events:none; } #molecule .event  { pointer-events:all; } line { stroke-linecap:round; } polygon { stroke-linejoin:round; } </style>   <text x="19.46" y="16.1" font-family=" Helvetica" font-size="12" fill="rgb(255,13,13)">O</text>   <text x="10.8" y="16.1" font-family=" Helvetica" font-size="12" fill="rgb(255,13,13)">H</text>   <line x1="59.06" y1="12.1" x2="41.6" y2="2.02" stroke="rgb(0,0,0)" stroke-width="1.21"></line>   <line x1="41.6" y1="2.02" x2="29.8" y2="8.83" stroke="rgb(0,0,0)" stroke-width="1.21"></line>   <line id="molecule:Bond:0" class="event" x1="59.06" y1="12.1" x2="41.6" y2="2.02" stroke-width="8" opacity="0"></line>   <line id="molecule:Bond:1" class="event" x1="41.6" y1="2.02" x2="24.13" y2="12.1" stroke-width="8" opacity="0"></line>   <circle id="molecule:Atom:0" class="event" cx="59.06" cy="12.1" r="8" opacity="0"></circle>   <circle id="molecule:Atom:1" class="event" cx="41.6" cy="2.02" r="8" opacity="0"></circle>   <circle id="molecule:Atom:2" class="event" cx="24.13" cy="12.1" r="8" opacity="0"></circle> </svg></span>)</p>
<p><span class="chemical chemical-inline"><svg id="molecule" xmlns="http://www.w3.org/2000/svg" version="1.1" width="74px" height="56px" viewBox="12 6 74 56">   <style> #molecule { pointer-events:none; } #molecule .event  { pointer-events:all; } line { stroke-linecap:round; } polygon { stroke-linejoin:round; } </style>   <line x1="62.3" y1="52.24" x2="78.36" y2="34.4" stroke="rgb(0,0,0)" stroke-width="1.44"></line>   <line x1="78.36" y1="34.4" x2="66.36" y2="13.62" stroke="rgb(0,0,0)" stroke-width="1.44"></line>   <line x1="66.36" y1="13.62" x2="42.88" y2="18.61" stroke="rgb(0,0,0)" stroke-width="1.44"></line>   <line x1="42.88" y1="18.61" x2="40.37" y2="42.48" stroke="rgb(0,0,0)" stroke-width="1.44"></line>   <line x1="62.3" y1="52.24" x2="40.37" y2="42.48" stroke="rgb(0,0,0)" stroke-width="1.44"></line>   <line x1="40.37" y1="42.48" x2="19.59" y2="54.48" stroke="rgb(0,0,0)" stroke-width="1.44"></line>   <line id="molecule:Bond:0" class="event" x1="62.3" y1="52.24" x2="78.36" y2="34.4" stroke-width="8" opacity="0"></line>   <line id="molecule:Bond:1" class="event" x1="78.36" y1="34.4" x2="66.36" y2="13.62" stroke-width="8" opacity="0"></line>   <line id="molecule:Bond:2" class="event" x1="66.36" y1="13.62" x2="42.88" y2="18.61" stroke-width="8" opacity="0"></line>   <line id="molecule:Bond:3" class="event" x1="42.88" y1="18.61" x2="40.37" y2="42.48" stroke-width="8" opacity="0"></line>   <line id="molecule:Bond:4" class="event" x1="62.3" y1="52.24" x2="40.37" y2="42.48" stroke-width="8" opacity="0"></line>   <line id="molecule:Bond:5" class="event" x1="40.37" y1="42.48" x2="19.59" y2="54.48" stroke-width="8" opacity="0"></line>   <circle id="molecule:Atom:0" class="event" cx="62.3" cy="52.24" r="8" opacity="0"></circle>   <circle id="molecule:Atom:1" class="event" cx="78.36" cy="34.4" r="8" opacity="0"></circle>   <circle id="molecule:Atom:2" class="event" cx="66.36" cy="13.62" r="8" opacity="0"></circle>   <circle id="molecule:Atom:3" class="event" cx="42.88" cy="18.61" r="8" opacity="0"></circle>   <circle id="molecule:Atom:4" class="event" cx="40.37" cy="42.48" r="8" opacity="0"></circle>   <circle id="molecule:Atom:5" class="event" cx="19.59" cy="54.48" r="8" opacity="0"></circle> </svg></span></p>
```


## API

### `rehype().use(smiles[, options])`

Transform `<span class="chemical-inline">` and `<div class="chemical-display">` with [openchemlib](https://github.com/cheminfo/openchemlib-js).

## Security

Use of `rehype-smiles` renders user content with [openchemlib](https://github.com/cheminfo/openchemlib-js), so any vulnerability
in [openchemlib](https://github.com/cheminfo/openchemlib-js) can open you to a [cross-site scripting (XSS)][xss] attack.

Always be wary of user input and use [`rehype-sanitize`][rehype-sanitize].

<!-- Definitions -->

[npm]: https://docs.npmjs.com/cli/install

[rehype]: https://github.com/rehypejs/rehype

[xss]: https://en.wikipedia.org/wiki/Cross-site_scripting
