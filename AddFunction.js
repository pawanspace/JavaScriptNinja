addFunction = function (object, functionName, func){

	var oldFunction = object[functionName];
	object[functionName] = function(){
		if(func.length === arguments.length){
			return func.apply(this, arguments);
		}
		else if(typeof oldFunction === "function"){
			return oldFunction.apply(this, arguments)
		}
	}
}