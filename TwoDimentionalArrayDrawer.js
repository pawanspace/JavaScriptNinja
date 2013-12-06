window.onload = function (){
	
var MYAPP = {};
MYAPP.colors = ['#FF0000','#00FFFF', 	'#0000FF','#0000A0',	'#ADD8E6','#800080',	'#FFFF00','#00FF00', '#FF00FF','#C0C0C0','#808080','#000000','#FFA500','#A52A2A','#800000','#008000'];
 MYAPP.shouldContinue = true;
	var x, y, context, painter;
	
	var xCounter = 0 , yCounter = 0, imageCounter = -1;
	var xarray = [];
	var yarray = [];

	function init(){
	
		var canvas = document.getElementById("paint");

		context = canvas.getContext('2d'); 
		painter = new Painter();

		canvas.addEventListener('mousedown', capture, false);
		canvas.addEventListener('mouseup', capture, false);
		canvas.addEventListener('mousemove', capture, false);

		document.getElementById("reset").addEventListener("click", function(){
clearCanvas(canvas);

		}, false);

			document.getElementById("redraw").addEventListener("click", function(){
				clearCanvas(canvas);
				var multiPainter = new MultiPainter();
				multiPainter.autoDraw();
			}, false);

			document.getElementById("haveFun").addEventListener("click", function(){
				clearCanvas(canvas);
				var multiPainter = new MultiPainter();
				multiPainter.autoDraw();
        if(MYAPP.shouldContinue){
          setTimeout(arguments.callee, 1000*(xarray.length));
        }
				
			}, false);
   
    document.getElementById("stop").addEventListener("click", function(){
				MYAPP.shouldContinue= false;
			}, false);

			document.getElementById("clear").addEventListener("click", function(){
        MYAPP.shouldContinue= false;
				clearCanvas(canvas);
				 xarray = [];
				  yarray = [];
				   imageCounter = -1;
				   xCounter = 0;
				    yCounter = 0;
				    x = 0;
				    y = 0;
			}, false);
	}	

	

function clearCanvas(canvas){
	context.save();

// Use the identity matrix while clearing the canvas
context.setTransform(1, 0, 0, 1, 0, 0);
context.clearRect(0, 0, canvas.width, canvas.height);

// Restore the transform
context.restore();
}

function capture(event){
    	
    if(event.which !== 1){
    	return;
    }	

    x = event.layerX;
	y = event.layerY;

	switch(event.type){
		case 'mousedown':
			painter.startPaint(event);
			break;
		case 'mouseup':
			painter.endPaint(event);
			break;
		case 'mousemove':
			painter.paint(event);
			break;
	}


}




var Painter = function(){

	var self = this;
	self.paintStarted = false;

	self.startPaint  = function(event){
			imageCounter++;
      MYAPP.shouldContinue
			self.resetRecordingParams();
			self.paintStarted = true;
			context.beginPath();
			context.strokeStyle =  MYAPP.colors[Math.floor(Math.random() * (MYAPP.colors.length- 0) + 0)];
			context.moveTo(x,y);
			self.record();
	}

	self.endPaint = function(event){
			self.paintStarted = false;
			self.record();
			self.paint(event)
	}

	self.paint  = function(event){
		if(self.paintStarted){
			context.lineTo(x,y); 
			context.stroke(); 
			self.record();
		}
	}

	self.record = function(){
		if(xarray[imageCounter] === undefined){
			xarray[imageCounter] = [];
		}

		if(yarray[imageCounter] === undefined){
			yarray[imageCounter] = [];
		}
		xarray[imageCounter][xCounter++] = x;
		yarray[imageCounter][yCounter++] = y;
	}

	self.resetRecordingParams = function(){
		xCounter = 0;
		yCounter = 0;
	}

return self;

}


var MultiPainter = function(){

	var self = this;

	self.isDrawingNow = false;

	self.queue = [];
	var queueCounter = 0;

	self.autoDraw = function(){

		for (var j = 0; j <= imageCounter; j++) {
				self.queue.push(j);
		}

		self.drawInQueue();
		

	}

	self.pause = function(){
		isDrawingNow = true;
	}

	self.resume = function(){
		isDrawingNow = false;
		self.drawInQueue();
	}

	self.drawInQueue = function(){

		if(!self.isDrawingNow && self.queue.length !== 0){
				self.pause();
				var j = self.queue.shift();
				var colx = xarray[j];
				var coly = yarray[j];
				context.beginPath();
				context.strokeStyle =  MYAPP.colors[Math.floor(Math.random() * (MYAPP.colors.length- 0) + 0)];
				context.moveTo(colx[0],coly[0]);

				var totalTimeOut = 0;
				for (var i = 1; i < colx.length; i++) {
					totalTimeOut += 100;
					setTimeout(self.drawLineSlowly, 100+(i*20),i, j);	
				}; 	
				if(totalTimeOut < 1500){
					totalTimeOut+=2000;
				}
				console.log(totalTimeOut);
				setTimeout(self.resume, totalTimeOut);
		}

	};

	self.drawLineSlowly = function(i, j)
	{
		context.lineTo(xarray[j][i],yarray[j][i]); 
		context.stroke(); 
		 
	};

	return self;

}

init();
}