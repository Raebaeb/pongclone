//preform an animation & request the browser call a specified function to update an animation before the next repaint (redraw)//
var animate = window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  function(callback) { window.setTimeout(callback, 1000/60) };
//set size of our pong canvas & grab its 2d context//
var canvas = document.createElement('canvas'); 
var width = 400;
var height = 600;
canvas.width = width;
canvas.height = height;
var context = canvas.getContext('2d');
//when page loads attach canvas to the screen and call step function//
window.onload = function() {
    document.body.appendChild(canvas);
    animate(step);
};
//step function will udate all objects (paddles & ball), render them and use animate(step) to call the step function again//
var step = function() {
    update();
    render();
    animate(step);
};
//update as a no-op (no operation, empty function) and use render function to give our pong canvas a color & show up on screen//
var update = function() {
};
//build the objects and update render function//
var player = new Player();
var computer = new Computer();
var ball = new Ball(200, 300);

var render = function() {
    context.fillStyle = "#00FFFF";
    context.fillRect(0, 0, width, height);
    player.render();
    computer.render();
    ball.render();
  };
//create paddle object & give it an x,y position, height/width, and x,y speed//
function Paddle(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.x_speed = 0;
    this.y_speed = 0;
}
//set paddle color to black//
Paddle.prototype.render = function() {
    context.fillStyle = "#000000";
    context.fillRect(this.x, this.y, this.width, this.height);
};
//create objects so that each paddle is controlled independently//
function Player() {
    this.paddle = new Paddle(175, 580, 50, 10);//set coordinates and size of player paddle//
}
//the canvas's coordinate system's origin is in the upper left hand corner so each paddle is moved accordingly//
function Computer() {
    this.paddle = new Paddle(175, 10, 50, 10);//set coordinates and size of computer paddle//
}
//render paddles//
Player.prototype.render = function() {
    this.paddle.render();
};
Computer.prototype.render = function() {
    this.paddle.render();
};
//render the ball. the ball is a circle, therefore its given x,y coordinates and a radius//
function Ball(x, y) {
    this.x = x;
    this.y = y;
    this.x_speed = 0;
    this.y_speed = 3;
    this.radius = 5;
}
//render the ball, add color -- Math.PI property represents the ratio of the circumference of a circle to its diameter, which is Pi//
Ball.prototype.render = function() {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
    context.fillStyle = "#800000";
    context.fill();
};