//Declare my variables

var canvas;
var context;
var timer;
//1000 ms or 1 second / FPS
var interval = 1000/60;
var player;

var frictionX = .85;	
var frictionY = .97;
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
	
	showGravity();

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
			player.x += 2;
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
			player.x += -2;
		}
	}

	let collision = player.hitTestObject(ball);

	if(collision)
	{
		scoreCount++;
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
			ball.vy *= -1;
        }

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

function showAcceleration()
{
	//--------------Use Velocity and Acceleration to move around----------------------
	if(d)
	{	
		player.vx +=  player.ax * player.force;
	}
	if(a)
	{
		player.vx += player.ax * -player.force;
	}
	if(w)
	{	
		player.vy += player.ay * -player.force;
	}
	if(s)
	{
		player.vy += player.ay * player.force;
	}
	//---------------------------------------------------------------------------------------
	player.x += player.vx;
	player.y += player.vy;
}

function showFriction()
{
	if(d)
	{	
		player.vx += player.ax * player.force;
	}
	if(a)
	{
		player.vx += player.ax * -player.force;
	}
	if(w)
	{	
		player.vy += player.ay * -player.force;
	}
	if(s)
	{
		player.vy += player.ay * player.force;
	}
	
	//--------------Apply friction to the Velocity X-----------------------------------------
	player.vx *= frictionX;
	player.vy *= frictionY;
	//---------------------------------------------------------------------------------------
	player.x += player.vx;
	player.y += player.vy;
}

function showGravity()
{
	
	if(d)
	{	
		ball.vx += ball.ax * ball.force;
	}
	if(a)
	{
		ball.vx += ball.ax * -ball.force;
	}
	/*if(w)
	{	
		player.vy += player.ay * -player.force;
	}
	if(s)
	{
		player.vy += player.ay * player.force;
	}*/
	
	//--------------Apply Gravity to the Velocity Y-----------------------------------------
	ball.vy += gravity;
	ball.y += ball.vy;
	//---------------------------------------------------------------------------------------
	
	ball.vx *= frictionX;
	ball.x += ball.vx;
}

function showPixelLock()
{
	
	if(d)
	{	
		player.vx += player.ax * player.force;
	}
	if(a)
	{
		player.vx += player.ax * -player.force;
	}
	if(w)
	{	
		player.vy += player.ay * -player.force;
	}
	if(s)
	{
		player.vy += player.ay * player.force;
	}
	

	player.vx *= frictionX;	
	player.vy *= frictionY;
	
	//------Round the velocity before applying it to the position.--------------------------
    //------This will keep the object from moving fractions of a pixel----------------------
	//------This might not be noticeable now, but will help alot when things get complex----
	player.y += Math.round(player.vy);
	player.x += Math.round(player.vx);
	//--------------------------------------------------------------------------------------
}

function showBounce()
{
	if(d)
	{	
		ball.vx += ball.ax * ball.force;
	}
	if(a)
	{
		ball.vx += ball.ax * -ball.force;
	}
	/*if(w)
	{	
		player.vy += player.ay * -player.force;
	}
	if(s)
	{
		player.vy += player.ay * player.force;
	}*/
	
	ball.vy *= frictionY;
	ball.vx *= frictionX;
	
	ball.vy += gravity;
	
	ball.x += ball.vx;
	ball.y += ball.vy;
	
	//--------------------Check Collision------------------------------------------------------
	if(ball.y > canvas.height - ball.height/2)
	{
		
		//--------Bounce the Ball---------------------------------------------------------------
		ball.y = canvas.height - ball.height/2;
		//the decimal is how bouncy you want the object to be
		//It should be a number between 0 and 2;
		ball.vy = -ball.vy * .67;
	}
	if(ball.x > canvas.width - ball.width/2)
	{
		ball.x = canvas.width - ball.width/2;
		ball.vx = -ball.vx * .99;
	}
	if(ball.x < 0)
	{
		ball.x = 0;
		ball.vx = -ball.vx * .99;
	}
}
