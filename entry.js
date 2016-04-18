var Ball = require("./ball")

var svg = document.getElementById("svg");
var width = window.innerWidth;
var height = window.innerHeight;

svg.setAttribute("height", height);
svg.setAttribute("width", width);

var ballRadius = width * 0.1;

var ball = new Ball(svg, width/2, ballRadius+10, ballRadius);

setInterval(function () {
	ball.move();
}, 10);