/**
 * @constructor Создает объект Интерполятор, который будет производить все вычисления
 */

class Interpolator {
	constructor() {
		let nodesNum;
		let intervalA, intervalB;
		let delta, step, x0, func, poly, deriv;

		let points = []; //	Массив точек, в которых будем считать значения функции, полинома и т.д.

		this.start = function () {
			step = (intervalB - intervalA) / (nodesNum - 1); //	Расстояние между узлами;
			x0 = intervalA;

			let finiteDifferences = countFiniteDiffs();
			let pointsPoly = [];

			poly = newtonPolyBuilder(x0, step, finiteDifferences[0]);

			for (let i = 0; i < nodesNum; i++) {
				let x = intervalA + i * step;
				pointsPoly.push(x);
			}
			
			debugInfo(pointsPoly);
		};

		this.getPoly = function () {
			return poly;
		};

		this.setNodesNum = function (n) {
			nodesNum = n;
		};

		this.setObjFunction = function (f) {
			func = f;
		};

		this.setDerivFunction = function (df) {
			deriv = df;
		}

		this.setDelta = function (d) {
			delta = d;
		};

		this.setInterpolatorInterval = function (A, B) {
			intervalA = A;
			intervalB = B;
		};

		this.setPoints = function (p) {
			points = p;
		};

		function debugInfo(points) {
			console.log("POINT\tFUNCTION\tPOLY");
			
			points.forEach(point => {
				console.log(point + "\t" +
					func(point) + "\t" +
					poly(point) + "\n");
			});
		}

		/**
		 * Найти конечные (симметрические) разности
		 * @returns {Array} Массив необходимых нам разностей (центральная линия в треугольнике)
		 */
		function countFiniteDiffs() {
			const intermediateDiffs = initFiniteDiffs();
			
			let values = []; 

			for (let i = 0; i < nodesNum; i++) {
				values[i] = [];
				
				for (let j = 0; j < nodesNum - i; j++) {
					if (i < 1) {
						values[i][j] = intermediateDiffs[j];
					} else {
						values[i][j] = (values[i - 1][j + 1] - values[i - 1][j]);
					}
				}
			}
			return values;
		};

		/**
		 * Создать массив значений функции в узлах интерполяции для подсчета симметрических разностей
		 * @returns {Array} Искомый массив
		 */
		function initFiniteDiffs() {
			const indexes = range(0, nodesNum);
		
			let res = []; 	

			indexes.map(function (index) {
				return res.push(func(intervalA + index * step));
			});

			return res;
		};
	}
}
