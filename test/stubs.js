function require(module){
	if(module === 'express')
		return expressStub;
	return {
		appendFile: function(){}
	};;
}

function expressStub() {
	return {
		get : function(){

		},
		post : function(){

		},
		listen : function(){

		}, 
		use : function(){

		}
	}
}

expressStub.bodyParser = function(){}