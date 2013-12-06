window.onload = function (){


	var x, y, context, painter;

	var xCounter = 0 , yCounter = 0;
	var xarray = [];
	var yarray = [];

	function init(){
		while(document.getElementById("paint") === undefined){
			//do nothing
		}

		console.log("Loaded document now registering events for canvas");
		var canvas = document.getElementById("paint");

		context = canvas.getContext('2d');
		painter = new Painter();

		canvas.addEventListener('mousedown', capture, false);
		canvas.addEventListener('mouseup', capture, false);
		canvas.addEventListener('mousemove', capture, false);

		document.getElementById("reset").addEventListener("click", hidePainting, false);

		document.getElementById("redraw").addEventListener("click", function(){
				autoDraw();
		}, false);

		document.getElementById("haveFun").addEventListener("click", function(){
				haveFun();
		}, false);
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


var MYAPP = {};
MYAPP.colors = ['#FF0000','#00FFFF', 	'#0000FF','#0000A0',	'#ADD8E6','#800080',	'#FFFF00','#00FF00', '#FF00FF','#FFFFFF','#C0C0C0','#808080','#000000','#FFA500','#A52A2A','#800000','#008000'];

var Painter = function(){


	var self = this;
	self.paintStarted = false;

	self.startPaint  = function(event){
			event.originalEvent.preventDefault();
			self.resetRecordingParams();
			self.paintStarted = true;
			context.strokeStyle =  MYAPP.colors[Math.random() * (MYAPP.colors.length- 0) + 0;]
			context.beginPath();
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
		xarray[xCounter++] = x;
		yarray[yCounter++] = y;
	}

	self.resetRecordingParams = function(){
		xarray = [];
		yarray = [];
		xCounter = 0;
		yCounter= 0;
	}

return self;

}


function autoDraw(){
	hidePainting();
	context.beginPath();
	context.moveTo(xarray[0],yarray[0]);
	context.strokeStyle =  MYAPP.colors[Math.random() * (MYAPP.colors.length- 0) + 0;]
	for (var i = 0; i < xarray.length; i++) {
		setTimeout(drawLineSlowly, 1000+(i*20), i);
	};

}

function haveFun(){
	hidePainting();
	for (var i = 0; i < 5; i++) {
		setTimeout(autoDraw, 10000+(i*20), i);
	};	
}

function drawLineSlowly(i)
{
	context.lineTo(xarray[i],yarray[i]);
	context.stroke();

}

function hidePainting(){
	context.save();
	// Use the identity matrix while clearing the canvas
	context.setTransform(1, 0, 0, 1, 0, 0);
	context.clearRect(0, 0, canvas.width, canvas.height);
	// Restore the transform
	context.restore();
}

init();
}