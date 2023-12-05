function View(placeholder) {

	let functions = [];
	let colors = [];

	/**
	 * Отрисовать добавленные ранее графики
	 * @param w Объект, хранящий данные о размере и координатах "окна"
	 */
	this.draw = function (w) {
		$.plot(placeholder, functions, {
			'xaxis': {
				min: w.A,
				max: w.B
			},
			'yaxis': {
				min: w.C,
				max: w.D
			},
			'colors': colors
		});
	}

	/**
	 * Добавить график для последующего отображения
	 * @param args Массив из аргументов функции
	 * @param values Массив из значений функции
	 * @param label Подпись для легенды
	 * @param col Цвет графика
	 */
	this.addPlot = function (args, values, label, col) {
		let graph = [];
		if (args.length != values.length)
			return;

		for (let i = 0; i < values.length; i++) {
			graph.push([args[i], values[i]]);
		}

		functions.push({
			'label': label,
			'data': graph
		});

		colors.push(col);
	}

	/**
	 * Очистить список графиков на построение
	 */
	this.clear = function () {
		functions = [];
		colors = [];
	}
}