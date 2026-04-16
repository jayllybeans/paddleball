//Declare my variables

var canvas;
var context;
var timer;
//1000 ms or 1 second / FPS
var interval = 1000/60;
var player;

var frictionX = .5;	
var frictionY = .5;
var gravity = 1;

	//Set Up the Canvas
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");	
	
	//Instantiate the Player
	player = new GameObject(canvas.width/2, canvas.height - 50, 250, 40, "cyan");
	ball = new GameObject(canvas.width/2, canvas.height/2, 80, 80, "magenta");

	ball.vx = 5;

	//Set the Animation Timer
	timer = setInterval(animate, interval);
	let scoreCount = 0;

function animate()
{
	//Erase the Screen
	context.clearRect(0,0,canvas.width, canvas.height);

	//Move the Player to the right
	if(d)
	{
		//console.log("Moving Right");
		if (player.x + player.width >= (canvas.width + 125))
		{
			player.vx = 0;
		}
		else
		{
			player.x += 5;
		}
	}
	if(a)
	{
		//console.log("Moving Left");
		if(player.x - player.width <= -125)
		{
			player.vx = 0;
		}
		else
		{
			player.x += -5;
		}
	}

	let collision = player.hitTestObject(ball);

	if(collision)
	{
		scoreCount++;
		player.vy = -player.vy * .67;
		ball.vy *= -1;
	}

	if (ball.x + ball.width/2 >= canvas.width || ball.x - ball.width/2 <= 0)
        {
			ball.vx *= -1;
        }

        if(ball.y + ball.height/2 >= canvas.height || ball.y - ball.height/2 <= 0)
        {
            if (ball.y + ball.height/2 >= canvas.height)
			{
				scoreCount = 0;
			}
			player.vy = -player.vy * .67;
			ball.vy *= -1;
        }

		ball.vy += gravity;
        ball.x += ball.vx;
        ball.y += ball.vy;

	//Update the Screen
	context.font = "16px Arial black";
	context.fillStyle = "dark gray";
	context.fillText("Score: " + scoreCount, 80, 25);

	player.drawRect();
	ball.drawCircle();

	context.save();
	context.strokeStyle = "dark gray";
	context.beginPath();
	context.moveTo(ball.x, ball.y);
	context.lineTo(player.x, player.y);
	context.lineWidth = 1;
	context.stroke();
	context.restore();
}
