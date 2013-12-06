	(function(){
				var queue = [];
				var results;
				var paused = false;

				
				// This refers to Window object here. In case you want you can use name space to have your own object.
				this.test = function(name, func){

					//Add test suite to the Queue
					queue.push(function(){
						results = document.getElementById("results");
						//append child method return reference to the added node. So here we get the UL for particular
						// test suite.
						results = assert(true, name).appendChild(document.createElement("ul"));
						func();
					});
				
					runTests();
				}


				this.pause = function () {
					paused = true;
				}

				this.resume = function () {
					paused = false;

					//Resume running other test suites in the Queue.
					setTimeout(runTests, 1);
				}


				// THis is the main function that runs it asynchronosly.
				this.runTests = function () {
					if( !paused && queue.length ){
						pause();
						
						// How cool is this . Fetch method from array and execute it! No need to have a reference!!
						queue.shift()();
						
						if( !paused ) {
							resume();
						}
					}
				}


				this.assert = function(value, description){
					var testCaseLi = document.createElement("li");
					testCaseLi.className = value ? "pass": "fail";
					testCaseLi.appendChild(document.createTextNode(description));

					// In case running a test without test suite
					if( results === undefined ){
						results = document.getElementById("results");
					}

					results.appendChild(testCaseLi);
					if(!value){
						testCaseLi.parentNode.parentNode.className = "fail";
					}

					return testCaseLi;
				}


			})(); //Calling itself
