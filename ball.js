var Ball = function (svg, x, y, radius, xBound, yBound) {
	this.svg = svg;
	this.xBound = xBound;
	this.yBound = yBound;

	this.x = x;
	this.y = y;
	this.radius = radius;
	this.outline = "black";
	this.outlineWidth = "3";
	this.color = "red";
	this.xDir = 0;
	this.yDir = 1;
	this.circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
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
	if (this.x <= this.radius || this.x >= this.xBound - this.radius) {
		this.xDir *= -1;
	}

	if (this.y <= this.radius || this.y >= this.yBound - this.radius) {
		this.yDir *= -1;
	}

	this.x += this.xDir;
	this.y += this.yDir;

	this.circle.setAttribute("cx", this.x.toString());
	this.circle.setAttribute("cy", this.y.toString());
};


module.exports = Ball;