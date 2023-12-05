/**
 * Функции для интерполяции
 */

function ObjFunc(alpha, beta, gamma, delta) {
    this.alpha = alpha;
    this.beta = beta;
    this.gamma = gamma;
    this.delta = delta;

    this.getValue = function (x) {
        return (this.alpha) * Math.sin(Math.tan(this.beta * x)) + (this.gamma) * Math.cos(this.delta * x);
    }

    this.getValueDeriv = function (x) {
        return (this.alpha) * (this.beta) * (Math.tan(this.beta * x) * Math.tan(this.beta * x) + 1) *
            Math.cos(Math.tan(this.beta * x)) - (this.delta * this.gamma) * Math.sin(this.delta * x);
    }

    this.setGreekParams = function (p) {
        this.alpha = p.alpha;
        this.beta = p.beta;
        this.gamma = p.gamma;
        this.delta = p.delta;
    }
}