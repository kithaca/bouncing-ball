var Ball = require("./ball");

var SVG = function () {
	this.svg = document.getElementById("svg");
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

	var sizeSlider = document.getElementById("size-slider");
	sizeSlider.addEventListener("input", this.changeBallSize.bind(this));

	var velSlider = document.getElementById("velocity-slider");
	velSlider.addEventListener("input", this.changeVelocity.bind(this));
};

SVG.prototype.addBall = function () {
	var ballRadius = 60;
	var ballColor = this.ballColors[Math.floor(Math.random() * this.ballColors.length)]
	this.balls.push(new Ball(this.svg, this.width/2, ballRadius, this.width, this.height, ballColor));
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
		ball.changeVel(e.target.value);
	});
};

SVG.prototype.changeBallSize = function (e) {
	e.preventDefault();
	this.balls.forEach(function (ball) {
		ball.resize(e.target.value);
	});
};

SVG.prototype.start = function () {
	this.lastTime = 0;
	requestAnimationFrame(this.animate.bind(this));
};

SVG.prototype.animate = function (timestamp) {
	var delta = timestamp - this.lastTime;
	this.balls.forEach(function (ball) {
		ball.move();
	});
	requestAnimationFrame(this.animate.bind(this));
};

module.exports = SVG;



