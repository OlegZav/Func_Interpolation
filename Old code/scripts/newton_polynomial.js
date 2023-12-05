function NewtonPoly(_x0, _h, _differences) {
    let x0 = _x0,
        h = _h,
        differences = _differences;

    this.getValue = function (x) {
        let t = (x - x0) / h;
        let result,
            accumulator = t;

        result = differences[0];
        
        result += t * differences[1];

        for (let i = 2; i < differences.length; i++) {
            let ratio = getRatio(i, t);
            result += ratio * differences[i];
        }

        return result;

        function getRatio(i, t) {
            accumulator /= i;
            let diff = 1.0;
            for (let j = 1; j < i; j++) {
                diff *= (t - j);
            }
            let res = accumulator * diff;

            return res;
        }
    }
}