/**
 * @constructor Создает объект Интерполятор, который будет производить все вычисления
 */

function Interpolator() {
	let nodesNum;
	let intervalA, intervalB;
	let delta,
		step,
		x0,
		func, poly;

	let points = [],	//	Массив точек, в которых будем считать значения функции, полинома и т.д.
		funcValues = [],
		polyValues = [],
		diffValues = [],
		funcDerivValues = [],
		polyDerivValues = [],
		maxDiff = {};

	this.start = function () {
		step = (intervalB - intervalA) / (nodesNum - 1);	//	Расстояние между узлами;
		x0 = intervalA;
		let finiteDifferences = countFiniteDiffs();
		let points = [];
		poly = new NewtonPoly(x0, step, finiteDifferences[0]);

		for (let i = 0; i < nodesNum; i++) {
			let x = intervalA + i * step;
			points.push(x);
		}

		console.log("POINT\t\t\t\tFUNCTION\t\t\t\tPOLY");
		for (let i = 0; i < nodesNum; i++) {
			console.log(points[i] + "\t" + func.getValue(points[i]) + "\t" + poly.getValue(points[i]) + "\n");
		}

		countValues();
	}

	/**
	 * Создать массив значений функции в узлах интерполяции для подсчета симметрических разностей
	 * @returns {Array} Искомый массив
	 */
	function initFiniteDiffs() {
		let res = [],
			n = nodesNum;

		for (let i = 0; i < n; i++) {
			let x = intervalA + i * step;
			res.push(func.getValue(x));
		}
		return res;
	}

	/**
	 * Найти конечные (симметрические) разности
	 * @returns {Array} Массив необходимых нам разностей (центральная линия в треугольнике)
	 */
	function countFiniteDiffs() {
		let values = [];
		let intermediateDiffs = initFiniteDiffs();
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

	this.setNodesNum = function (n) {
		nodesNum = n;
	};

	this.setObjFunction = function (f) {
		func = f;
	}

	this.setDelta = function (d) {
		delta = d;
	}

	this.setInterpolatorInterval = function (A, B) {
		intervalA = A;
		intervalB = B;
	}

	this.setPoints = function (p) {
		points = p;
	}

	function countValues() {
		countFuncValues();
		countPolyValues();
		countDiffValues();
		countFuncDerivative();
		countPolyDerivative();
	}

	function countFuncValues() {
		funcValues = [];
		for (let i = 0; i < points.length; i++) {
			let x = points[i];
			funcValues.push(func.getValue(x));
		}
	}

	this.getFuncValuesArray = function () {
		return funcValues;
	}

	function countPolyValues() {
		polyValues = [];
		for (let i = 0; i < points.length; i++) {
			let x = points[i];
			polyValues.push(poly.getValue(x));
		}
	}

	this.getPolyValuesArray = function () {
		return polyValues;
	}

	function countDiffValues() {
		diffValues = [];
		let max = -Infinity;
		for (let i = 0; i < points.length; i++) {
			let x = points[i];
			let diff = func.getValue(x) - poly.getValue(x);
			diffValues.push(diff);
			if (diff > max) {
				maxDiff = {
					'x': points[i],
					'val': diff
				};
				max = diff;
			}
		}
	}

	this.getDiffValuesArray = function () {
		return diffValues;
	}

	this.getMaxDiffValue = function () {
		return maxDiff;
	}

	function countFuncDerivative() {
		funcDerivValues = [];
		for (let i = 0; i < points.length; i++) {
			let x = points[i];
			funcDerivValues.push(func.getValueDeriv(x));
		}
	}

	this.getFuncDerivValuesArray = function () {
		return funcDerivValues;
	}

	function countPolyDerivative() {
		polyDerivValues = [];
		for (let i = 0; i < points.length; i++) {
			let x = points[i];
			polyDerivValues.push((1 / delta) * (poly.getValue(x + delta) - poly.getValue(x)));
		}
	}

	this.getPolyDerivValuesArray = function () {
		return polyDerivValues;
	}
}