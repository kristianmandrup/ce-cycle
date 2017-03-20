import {
	Observable as $
} from 'xstream';

import {
	div,
	br,
	i,
	button,
	h2,
	h4,
	h
} from '@cycle/dom';

import {
	Button
} from './helpers';

export default ({
	DOM
}) => {
	Button(DOM.select('.Home')).forEach(() => {
		window.location.href = '/';
	});
	Button(DOM.select('.Github')).forEach(() => {
		window.location.href = 'https://github.com/edge/cyc';
	});
	return {
		DOM: $.just(
			div('.p2.measure', [
				h2('About'),
				h('my-elem', {
					attrs: {
						name: 'attrs: my sweetie'
					},
					props: {
						name: 'props: my sweetie'
					}
				}),
				h('hello-world', {
					attrs: {
						name: 'yo kiddo'
					}
				}),
				h4([
					i('cyc'), ' is a Cycle.js boilerplate built with convenience and speed in mind.'
				]),
				br(),
				button('.btn.Home', 'Home'), ' ',
				button('.btn.Github', 'Github'),
			])
		)
	};
}