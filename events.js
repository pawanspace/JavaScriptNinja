function add(ele, event){
	console.log(event.target);
	var same = ele.cloneNode(true);
	same.id = parseInt(ele.id)+ 1 
	ele.parentNode.appendChild(same);
	
    /*if(same.addEventListener != undefined){
		same.addEventListener('click', add);
	}
	else{
		same.detachEvent('onclick');
		same.attachEvent('onclick', add);
	}*/
}



document.body.onload = function(){



	var originalAddEventListener = window.EventTarget != undefined ? EventTarget.prototype.addEventListener:Element.prototype.attachEvent;

	if( window.EventTarget != undefined ){
		EventTarget.prototype.addEventListener = function(event, handler, useCapture, wantsUntrusted){
			this.attachedEvents =  [];
			var ele = this;
			this.attachedEvents[event] = {name: event, handler: handler};
			originalAddEventListener.call(this,event, function(){handler(ele)}, useCapture, wantsUntrusted);
		}
	}else{
		Element.prototype.attachEvent = function(event, handler){
			this.attachedEvents =  [];
			var ele = this;
			this.attachedEvents[event] = {name: event, handler: handler};
            originalAddEventListener.call(this,event, function(event){handler(ele, event)});
		}
	}

	var array = document.getElementsByTagName('div');
	
	for (var i = array.length - 1; i >= 0; i--) {
		if(array[i].addEventListener != undefined){
			array[i].addEventListener('click', add);
		}
		else{
			array[i].attachEvent('onclick', add);
		}
	};
	
}
