/* global CLIENT */
import {
	run
} from '@cycle/run';
import {
	makeDOMDriver,
	makeHTMLDriver
} from '@cycle/dom';
import {
	rerunner,
	restartable
} from 'cycle-restart';

let main = require('./main').default;

// import 'document-register-element'
// import 'document-register-element/build/document-register-element'

//const installCE = require('document-register-element');

// by default, the second argument is 'auto'
// but it could be also 'force'
// which ignores feature detection and force
// the polyfill version of CustomElements
// installCE(global, 'force');
//installCE(global, 'auto');

// document.registerElement(
// 	'my-input', {
// 		prototype: Object.create(
// 			HTMLElement.prototype, {
// 				createdCallback: {
// 					value: function () {
// 						// here the input
// 						this.el = this.appendChild(
// 							document.createElement('input')
// 						);
// 					}
// 				}
// 			}
// 		)
// 	}
// );

// var mi = document.createElement('my-input');

// import {
// 	MyElem
// } from './other-elem'

// import './my-elem'

export default () =>
run(main, {
	DOM: makeHTMLDriver()
});

if (CLIENT) {
	let drivers = {
		DOM: restartable(makeDOMDriver('#root'), {
			pauseSinksWhileReplaying: false
		})
	};

	let rerun = rerunner(run);
	rerun(main, drivers);

	if (module.hot) {
		require('webpack-hot-middleware/client');
		module.hot.accept(() => {
			main = require('./main').default;
			rerun(main, drivers);
		});
	}
}