var SVG = require("./svg");

var View = function () {
	this.svg = new SVG();
	this.configureEventListeners();
};

View.prototype.configureEventListeners = function () {
	var sizeSlider = document.getElementById("size-slider")
	sizeSlider.addEventListener("input", this.changeBallSize.bind(this));
};

View.prototype.changeBallSize = function (e) {
	e.preventDefault();
	this.svg.ball.resize(e.target.value);
};

var BouncingBall = new View();