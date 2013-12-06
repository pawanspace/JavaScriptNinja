window.onload = function (){


	var SinWave = function(){

		var self = this;
		var canvas, context;


		var init = function(){
			canvas = document.getElementById("wavecanvas");
			context = canvas.getContext('2d');
		}


		self.drawWave = function(){
			context.beginPath();
			context.moveTo(0,145);
			context.lineTo(20000000, 1265);
		    context.lineWidth = 2;
			context.strokeStyle = 'black';
		    context.stroke();
		    context.beginPath();
			
		    var x = 0;
		    var y = 145
			context.moveTo(x, y);
			var yoffset = 0;
		    for(var i = 1; i<100; i++){
		    	var xoffset = i/5;
		    	if(i>50){
		    		xoffset = i;
		    	}
		    	
		    	if(i>50){
		    		if(i>70){
		    		yoffset = (-1) * i;
		    		}
		    	}else{
		    		yoffset = i;
		    	}

		    	context.lineTo(x+xoffset, y-yoffset);
		    	context.lineWidth = 2;
				context.strokeStyle = 'black';
		    	context.stroke();
		    }
		};

		self.drawPositiveWave = function(){
		};

		self.drawNeativeWave = function(){

		};

		init();
		return self;
	}

	var wave = new SinWave();
	wave.drawWave();

};