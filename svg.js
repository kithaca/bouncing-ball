var Ball = require("./ball");

var SVG = function () {
	this.svg = document.getElementById("svg");
	this.sizeSlider = document.getElementById("size-slider");
	this.velSlider = document.getElementById("velocity-slider");
	this.plusButton = document.getElementById("plus");
	this.minusButton = document.getElementById("minus");

	this.ballColors = ["red", "deeppink", "forestgreen", "mediumvioletred", "slateblue",
											"darkorange", "gold", "black", "sienna", "mediumseagreen"];
	this.setDimensions();
	this.configureEventListeners();
	this.balls = [];
	this.addBall();
	this.start();
};

SVG.prototype.configureEventListeners = function () {
	window.addEventListener("resize", this.onResize.bind(this));

	this.sizeSlider.addEventListener("input", this.changeBallSize.bind(this));
	this.velSlider.addEventListener("input", this.changeVelocity.bind(this));

	this.plusButton.addEventListener("click", this.addBall.bind(this));
	this.minusButton.addEventListener("click", this.removeBall.bind(this));
};

SVG.prototype.addBall = function () {
	// debugger;
	var ballRadius = this.sizeSlider.value;
	var ballVelocity = this.velSlider.value;
	var ballColor = this.ballColors[Math.floor(Math.random() * this.ballColors.length)]
	var newBall = new Ball(this.svg, this.width/2, ballRadius, this.width, this.height, ballColor, ballVelocity);
	this.balls.push(newBall);
};

SVG.prototype.removeBall = function () {
	if (this.balls.length > 0) {
		var lastBall = this.balls.pop();
		this.svg.removeChild(lastBall.circle);
	}
};

SVG.prototype.setDimensions = function () {
	this.width = window.innerWidth * 0.95;
	this.height = 0.95 *
		(window.innerHeight - document.getElementById("header").offsetHeight
											  - document.getElementById("sliders").offsetHeight - 70);
	this.svg.setAttribute("width", this.width);
	this.svg.setAttribute("height", this.height);
};

SVG.prototype.onResize = function (e) {
	e.preventDefault();
	this.setDimensions();
	var that = this;
	this.balls.forEach(function (ball) {
		ball.resetBounds(that.width, that.height);
	});
};

SVG.prototype.changeVelocity = function (e) {
	e.preventDefault();
	this.balls.forEach(function (ball) {
		ball.setVel(e.target.value);
	});
};

SVG.prototype.changeBallSize = function (e) {
	e.preventDefault();
	this.balls.forEach(function (ball) {
		ball.setSize(e.target.value);
	});
};

SVG.prototype.start = function () {
	this.lastTime = 0;
	requestAnimationFrame(this.animate.bind(this));
};

SVG.prototype.animate = function (timestamp) {
	var delta = timestamp - this.lastTime;
	this.balls.forEach(function (ball) {
		if (ball.moving) {
			ball.move();
		}
	});
	requestAnimationFrame(this.animate.bind(this));
};

module.exports = SVG;



