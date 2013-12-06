var ForEach = function(list, callback, args){

	var isObject = false;

	if(list.length === undefined){
		isObject = true;
	}


	if(isObject){
		for (var key in list) {
			var shouldBreak = callback.call(list[key],key, args);
			if(shouldBreak){
				break;
			}
		};
	}


	for (var i = 0; i < list.length; i++) {
		//We can also use apply except the arguments need to be passed as an array.
		//passing context via call
		var shouldBreak = callback.call(list[i], i, args);
		if(shouldBreak){
				break;
		}
	}
}

