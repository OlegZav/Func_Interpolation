function Controller() {

	let view = new View(getElement('plot'));
	let interpolator = new Interpolator();
	let interpolatorWindow = {};
	let points = [];

	this.start = function () {
		interpolatorWindow = {
			'A': +getElement('windowA_input').value,
			'B': +getElement('windowB_input').value,
			'C': +getElement('windowC_input').value,
			'D': +getElement('windowD_input').value
		};

		let func = new ObjFunc(
			+getElement('alpha_input').value,
			+getElement('beta_input').value,
			+getElement('gamma_input').value,
			+getElement('delta_input').value
		);

		interpolator.setObjFunction(func);
		interpolator.setNodesNum((getElement('n_input').value));
		interpolator.setInterpolatorInterval(interpolatorWindow.A, interpolatorWindow.B);
		interpolator.setDelta(+getElement('delta_deriv_input').value);
		points = createPointsArray();
		interpolator.setPoints(points);

		interpolator.start();

		this.drawAccordingToChoices();

		showMaxDifference();
	}

	function createPointsArray() {
		let windowA = +getElement('windowA_input').value,
			windowB = +getElement('windowB_input').value;
		let step = (windowB - windowA) / $('#plot').width();
		let result = [];
		for (let i = windowA; i < windowB; i += step)
			result.push(i);
		result.push(windowB); //иначе правая граница может быть не учтена из-за погрешностей

		return result;
	}

	this.drawAccordingToChoices = function () {
		view.clear();
		if (getElement('draw_f').checked)
			view.addPlot(points, interpolator.getFuncValuesArray(), 'f(x)', '#00f');
		if (getElement('draw_p').checked)
			view.addPlot(points, interpolator.getPolyValuesArray(), 'P(x)', '#ffff00');
		if (getElement('draw_r').checked)
			view.addPlot(points, interpolator.getDiffValuesArray(), 'r(x)', '#f00');
		if (getElement('draw_fd').checked)
			view.addPlot(points, interpolator.getFuncDerivValuesArray(), '∂f(x)', '#008000');
		if (getElement('draw_pd').checked)
			view.addPlot(points, interpolator.getPolyDerivValuesArray(), '∂P(x)', '#000');

		view.draw(interpolatorWindow);
	}

	function showMaxDifference() {
		let max = interpolator.getMaxDiffValue();

		getElement('max_rx').innerHTML = max.val;
		getElement('max_rx_x').innerHTML = max.x;
	}
}