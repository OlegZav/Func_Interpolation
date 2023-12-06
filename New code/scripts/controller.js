class Controller {
	constructor() {

		let view = new View(getElement('plot'));
		let interpolator = new Interpolator();
		let interpolatorWindow = {};
		let points = [];

		this.start = function () {
			const alpha = +getElement('alpha_input').value;
			const beta = +getElement('beta_input').value;
			const gamma = +getElement('gamma_input').value;
			const delta = +getElement('delta_input').value;

			const func = funcBuilder(alpha, beta, gamma, delta);
			const funcDeriv = funcDerivBuilder(alpha, beta, gamma, delta);

			const windowA = +getElement('windowA_input').value;
			const windowB = +getElement('windowB_input').value;
			const windowC = +getElement('windowC_input').value;
			const windowD = +getElement('windowD_input').value;

			interpolatorWindow = {
				'A': windowA,
				'B': windowB,
				'C': windowC,
				'D': windowD
			};

			interpolator.setObjFunction(func);
			interpolator.setDerivFunction(funcDeriv)
			interpolator.setNodesNum(+getElement('n_input').value);
			interpolator.setInterpolatorInterval(interpolatorWindow.A, interpolatorWindow.B);
			interpolator.setDelta(+getElement('delta_deriv_input').value);

			points = createPointsArray(windowA, windowB);
			interpolator.setPoints(points);

			interpolator.start();

			const poly = interpolator.getPoly();
			const polyDeriv = polyDerivativeBuilder(+getElement('delta_deriv_input').value, poly)

			this.drawAccordingToChoices(func, poly, funcDeriv, polyDeriv);

		};

		function createPointsArray(windowA, windowB) {
			let step = (windowB - windowA) / $('#plot').width();
			let result = [];

			for (let i = windowA; i < windowB; i += step)
				result = addValue(result, i);

			result = addValue(result, windowB); //иначе правая граница может быть не учтена из-за погрешностей
			
			return result;
		}

		this.drawAccordingToChoices = function (func, poly, deriv, polyDeriv) {
			view.clear();

			if (getElement('draw_f').checked)
				view.addPlot(points, points.map(func), 'f(x)', '#00f');

			if (getElement('draw_p').checked)
				view.addPlot(points, points.map(poly), 'P(x)', '#ffff00');

			if (getElement('draw_r').checked) {
				const diffsArray = countDiffValues(points, func, poly);
				view.addPlot(points, diffsArray.diffValues, 'r(x)', '#f00');
				showMaxDifference(diffsArray.maxDiff);
			}

			if (getElement('draw_fd').checked)
				view.addPlot(points, points.map(deriv), '∂f(x)', '#008000');

			if (getElement('draw_pd').checked)
				view.addPlot(points, points.map(polyDeriv), '∂P(x)', '#000');

			view.draw(interpolatorWindow);
		};

		function showMaxDifference(max) {
			getElement('max_rx').innerHTML = max.val;
			getElement('max_rx_x').innerHTML = max.x;
		}
	}
}

function countDiffValues(points, func, poly) {
	let max = -Infinity;
	let diffValues = [];
	let maxDiff = {
		'x': 0,
		'val': 0
	};
	points.forEach(point => {
		let x = point;
		let diff = func(x) - poly(x);
		
		diffValues = addValue(diffValues, diff);
		
		if (diff > max) {
			maxDiff = {
				'x': point,
				'val': diff
			};
			max = diff;
		}
	});

	return {
		diffValues,
		maxDiff
	};
}