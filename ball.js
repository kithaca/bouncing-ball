var Ball = function (svg, x, radius, xBound, yBound, color, velocity) {
	this.svg = svg;
	this.circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");

	this.xBound = xBound;
	this.yBound = yBound;
	this.clicked = false;
	this.moving = false;
	this.x = x;
	this.setSize(radius);

	this.color = color;
	this.xDir = 0;
	this.yDir = 0;
	this.setVel(velocity);
	this.configureEventListeners();
	this.draw();
};

Ball.prototype.draw = function () {
	this.createGradient();
	this.circle.setAttribute("cx", this.x);
	this.circle.setAttribute("cy", this.y);
	this.circle.setAttribute("r", this.radius);
	this.circle.setAttribute("fill", "url(#grad)");
	this.circle.style.cursor = "pointer";

	this.svg.appendChild(this.circle);
};

Ball.prototype.createGradient = function () {
	var gradient = document.createElementNS("http://www.w3.org/2000/svg", "radialGradient");
	var stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
	var stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");

	gradient.setAttribute("id", "grad");
	gradient.setAttribute("fx", "30%");
	gradient.setAttribute("fy", "30%");

	stop1.setAttribute("offset", "10%");
	stop1.setAttribute("stop-color", "white");
	stop2.setAttribute("offset", "75%");
	stop2.setAttribute("stop-color", this.color);

	gradient.appendChild(stop1);
	gradient.appendChild(stop2);
	this.svg.appendChild(gradient);
};

Ball.prototype.adjustBounds = function () {
	if (this.x - this.radius <= 0) {
		this.x = this.radius + 2;
		this.xDir = this.xDir < 0 ? this.xDir *= -1 : this.xDir;
	} else if (this.x + this.radius >= this.xBound) {
		this.x = this.xBound - this.radius - 2;
		this.xDir = this.xDir > 0 ? this.xDir *= -1 : this.xDir;
	}

	if (this.y - this.radius <= 0) {
		this.y = this.radius + 2;
		this.yDir = this.yDir < 0 ? this.yDir *= -1 : this.yDir;
	} else if (this.y + this.radius >= this.yBound) {
		this.y = this.yBound - this.radius - 2;
		this.yDir = this.yDir > 0 ? this.yDir *= -1 : this.yDir;
	}
};

Ball.prototype.move = function () {
	this.adjustBounds();
	this.x += this.xDir * this.velocity;
	this.y += this.yDir * this.velocity;

	this.circle.setAttribute("cx", this.x);
	this.circle.setAttribute("cy", this.y);
	// this.circle.setAttribute("transform", "rotate(10)");
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
	this.svg.style.cursor = "pointer";
};

Ball.prototype.mouseUp = function (e) {
	e.preventDefault();
	if (!this.moving) {
		this.moving = true;
	}

	// use basic geometry to define new direction of ball movement
	if (this.clicked) {
		var xDiff = e.screenX - this.x;
		var yDiff = e.screenY - this.y;

		var hyp = Math.sqrt((xDiff * xDiff) + (yDiff * yDiff));
		this.xDir = xDiff / hyp;
		this.yDir = yDiff / hyp;
		this.clicked = false;
		this.svg.style.cursor = "auto";
	}
};

Ball.prototype.setSize = function (value) {
	this.radius = (value * 0.8) + 20;
	this.y = this.radius + 30;
	this.adjustBounds();
	this.circle.setAttribute("r", this.radius);
	this.circle.setAttribute("cx", this.x);
	this.circle.setAttribute("cy", this.y);
};

Ball.prototype.setVel = function (value) {
	this.velocity = value * 0.15;
};

module.exports = Ball;