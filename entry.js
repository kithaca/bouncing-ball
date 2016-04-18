var Ball = require("./ball")

var svg = document.getElementById("svg");
var width = window.innerWidth;
var height = window.innerHeight;

// svg.setAttribute("x", 10);
// svg.setAttribute("y", 10);
svg.setAttribute("height", height * 0.9);
svg.setAttribute("width", width * 0.9);

var ballRadius = width * 0.05;

var ball = new Ball(svg, width/2, ballRadius+10, ballRadius, width*0.9, height*0.9);

setInterval(function () {
	ball.move();
}, 5);