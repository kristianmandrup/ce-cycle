# Cycle.js with Custom Elements v1 experiments

**WIP** Experimental!

Demonstrating use of **Custom Elements v1** with [Cycle.js](https://cycle.js.org/) app using [virtual-dom](https://github.com/Matt-Esch/virtual-dom)

Project was generated using [cyc](https://github.com/edge/cyc)

TODO: Please upgrade to [snabbdom](https://github.com/snabbdom/snabbdom)

## Original Hello World project

This project is based on [Custom Elements v1](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Custom_Elements) - "Hello World" demo as described in [Custom Elements v1 vs JS frameworks](https://ferdychristant.com/custom-elements-v1-vs-js-frameworks-e086638cd1a9#.csh0br49h) blog post by [Ferdy Christant](https://ferdychristant.com).

Updated github repo for original blog post code can be found [here](https://github.com/kristianmandrup/ce-hw)

## Key observations

Please run the code in Chrome Canary (Chrome 59 or above) for native Custom Elements v1 support.

If native support is not detected, a polyfill will be loaded to fill in the gaps (see `/public/polyfill` folder)

This demo demonstrates two different models:

Browser built in ES6 in `public/ce.js` and using Babel transpilation with the Cycle.js code, using the following Babel configuration using [babel-plugin-transform-custom-element-classes](https://www.npmjs.com/package/babel-plugin-transform-custom-element-classes)

```json
{
	"presets": ["stage-0", "es2015"],
	"plugins": [
		"transform-custom-element-classes",
		"transform-es2015-classes"
	]
}
```

Make sure to add the babel plugins to your devDependencies:

`npm i -D babel-plugin-transform-custom-element-classes`
`npm i -D babel-plugin-transform-es2015-classes`

```
"devDependencies": {
    "babel-plugin-transform-custom-element-classes": "^0.1.0",
    "babel-plugin-transform-es2015-classes": "^6.23.0",
    ...
}
```

## Issues

Currently having an [issue](https://github.com/github/babel-plugin-transform-custom-element-classes/issues/5) getting the Babel transform to work properly!

## License

MIT Kristian Mandrup