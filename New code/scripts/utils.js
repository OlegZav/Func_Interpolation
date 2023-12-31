const zip = (a, b) => a.map((k, i) => [k, b[i]]);

const funcBuilder = (alpha, beta, gamma, delta) => (x) =>
	alpha * Math.sin(Math.tan(beta * x)) + gamma * Math.cos(delta * x);

const funcDerivBuilder = (alpha, beta, gamma, delta) => (x) =>
	alpha * beta * (Math.tan(beta * x) * Math.tan(beta * x) + 1) * 
	Math.cos(Math.tan(beta * x)) - (delta * gamma) * Math.sin(delta * x)

const polyDerivativeBuilder = (delta, poly) => (x) => 
	(1 / delta) * (poly(x + delta) - poly(x))

const newtonPolyBuilder = (x0, h, differences) => (x) => {
	const t = (x - x0) / h;
	let result = differences[0];
	let accumulator = t;

	result += t * differences[1];

	for (let i = 2; i < getLength(differences); i++) {
		let {ratio, newAccum} = getNewtonRatio(i, accumulator, t);
		result += ratio * differences[i];
		accumulator = newAccum;
	}

	return result;
}

function getNewtonRatio(i, accumulator, t) {
	let indexesRatio = range(1, i);

	let newAccum = accumulator/i;

	let diff = reduce(indexesRatio, 1.0, function (total, value) {
		return total * (t - value);
	});

	let ratio = newAccum * diff;

	return {
		ratio,
		newAccum
	}
}

function getElement(id) {
	return document.getElementById(id);
}

function forEach(array, f) {
	for (let i = 0; i < getLength(array); i++) {
		let item = array[i];
		f(item);
	}
}

function reduce(array, init, f) {
	let accum = init;
	forEach(array, function (element) {
		accum = f(accum, element);
	});
	return accum;
}

function range(start, end) {
	let result = [];
	for (let i = start; i < end; i++)
		result.push(i);
	return result;
}

function addValue(array, value) {
	var copy = array.slice();
	copy.push(value);
	return copy;
}

function getLength(array) {
	return array.length;
}