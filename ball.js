var Ball = function (svg, x, y, radius, xBound, yBound) {
	this.svg = svg;
	this.xBound = xBound;
	this.yBound = yBound;
	this.clicked = false;

	this.x = x;
	this.y = y;
	this.radius = radius;
	this.outline = "black";
	this.outlineWidth = "3";
	this.color = "red";
	this.xDir = 0;
	this.yDir = 0;
	this.velocity = 3;
	this.circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
	this.configureEventListeners();
	this.draw();
};

Ball.prototype.draw = function () {
	this.circle.setAttribute("cx", this.x);
	this.circle.setAttribute("cy", this.y);
	this.circle.setAttribute("r", this.radius);
	this.circle.setAttribute("stroke", this.outline);
	this.circle.setAttribute("stroke-width", this.outlineWidth);
	this.circle.setAttribute("fill", this.color);

	this.svg.appendChild(this.circle);
};

Ball.prototype.move = function () {
	if (this.x - this.radius <= 0 || this.x + this.radius >= this.xBound) {
		this.xDir *= -1;
	}
	if (this.y - this.radius <= 0 || this.y + this.radius >= this.yBound) {
		this.yDir *= -1;
	}

	this.x += this.xDir * this.velocity;
	this.y += this.yDir * this.velocity;

	this.circle.setAttribute("cx", this.x.toString());
	this.circle.setAttribute("cy", this.y.toString());
};

Ball.prototype.resetBounds = function (xBound, yBound) {
	this.xBound = xBound;
	this.yBound = yBound;
}

Ball.prototype.configureEventListeners = function () {
	this.circle.addEventListener("mousedown", this.mouseDown.bind(this));
	this.svg.addEventListener("mouseup", this.mouseUp.bind(this));
};

Ball.prototype.mouseDown = function (e) {
	e.preventDefault();
	this.clicked = true;
};

Ball.prototype.mouseUp = function (e) {
	e.preventDefault();

	// use basic geometry to define new direction of ball movement
	if (this.clicked) {
		var xDiff = e.screenX - this.x;
		var yDiff = e.screenY - this.y;

		var hyp = Math.sqrt((xDiff * xDiff) + (yDiff * yDiff));
		this.xDir = xDiff / hyp;
		this.yDir = yDiff / hyp;
		this.clicked = false;
	}
};


module.exports = Ball;