import {
	Observable as $
} from 'xstream';

import {
	div,
	br,
	label,
	input
} from '@cycle/dom';

import {
	Input
} from './helpers';

export default ({
	DOM
}) => {
	let height = DOM.select('#Height')
	let weight = DOM.select('#Weight')

	console.log(height, weight)

	let height$ = Input(height)
		.startWith('177'),
		weight$ = Input(weight)
		.startWith('62');

	let bmi$ = $.combineLatest(
		height$, weight$,
		(h, w) => (w / (h / 100) ** 2).toFixed(1)
	);

	return {
		DOM: $.combineLatest(height$, weight$, bmi$, (h, w, bmi) =>
			div('.p2.measure', [
				label({
					htmlFor: 'Height'
				}, 'Height: '),
				input('#Height', {
					value: h
				}),
				br(),
				label({
					htmlFor: 'Weight'
				}, 'Weight: '),
				input('#Weight', {
					value: w
				}),
				br(),
				'BMI: ' + bmi
			])
		)
	};
}