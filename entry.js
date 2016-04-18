var Ball = require("./ball")

var SVG = function () {
	this.svg = document.getElementById("svg");
	this.width = window.innerWidth;
	this.height = window.innerHeight;

	this.setDimensions(this.width, this.height);
	window.addEventListener("resize", this.onResize.bind(this));

	this.ball = this.addBall();
	this.start();
};

SVG.prototype.addBall = function () {
	var ballRadius = this.width * 0.05;
	return new Ball(this.svg, this.width/2, ballRadius+10, ballRadius, this.width*0.9, this.height*0.9);
};

SVG.prototype.setDimensions = function (width, height) {
	svg.setAttribute("width", width * 0.9);
	svg.setAttribute("height", height * 0.9);
};

SVG.prototype.onResize = function (e) {
	e.preventDefault();
	this.width = window.innerWidth;
	this.height = window.innerHeight;
	this.setDimensions(this.width, this.height);
	this.ball.resetBounds(this.width*0.9, this.height*0.9);
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

var bouncingBall = new SVG();



