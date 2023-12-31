class View {
	constructor(placeholder) {

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
		};

		/**
		 * Добавить график для последующего отображения
		 * @param args Массив из аргументов функции
		 * @param values Массив из значений функции
		 * @param label Подпись для легенды
		 * @param col Цвет графика
		 */
		this.addPlot = function (args, values, label, col) {
			let graph = [];

			if (getLength(args) != getLength(values))
				return;

			for (const pair of zip(args, values)) {
				graph = addValue(graph, pair);
			}

			functions = addValue(functions, {
				'label': label,
				'data': graph
			});

			colors = addValue(colors, col);

		};

		/**
		 * Очистить список графиков на построение
		 */
		this.clear = function () {
			functions = [];
			colors = [];
		};
	}
}