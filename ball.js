var Ball = function (svg, x, y, radius) {
	this.svg = svg;
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
	this.circle.setAttribute("cx", this.x.toString());
	this.circle.setAttribute("cy", this.y.toString());
	this.circle.setAttribute("r", this.radius.toString());
	this.circle.setAttribute("stroke", this.outline);
	this.circle.setAttribute("stroke-width", this.outlineWidth);
	this.circle.setAttribute("fill", this.color);

	this.svg.appendChild(this.circle);
};

Ball.prototype.inBounds = function () {

};

Ball.prototype.move = function () {
	this.y += 1;
	this.circle.setAttribute("cy", this.y.toString());
};


module.exports = Ball;