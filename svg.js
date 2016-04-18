var Ball = require("./ball");

var SVG = function () {
	this.svg = document.getElementById("svg");
	this.setDimensions();
	this.configureEventListeners();
	this.ball = this.addBall();
	this.start();
};

SVG.prototype.configureEventListeners = function () {
	window.addEventListener("resize", this.onResize.bind(this));
};

SVG.prototype.addBall = function () {
	var ballRadius = 20;
	return new Ball(this.svg, this.width/2, ballRadius, this.width, this.height);
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
	this.ball.resetBounds(this.width, this.height);
};

SVG.prototype.start = function () {
	this.lastTime = 0;
	requestAnimationFrame(this.animate.bind(this));
};

SVG.prototype.animate = function (timestamp) {
	var delta = timestamp - this.lastTime;
	this.ball.move();
	requestAnimationFrame(this.animate.bind(this));
};


module.exports = SVG;



