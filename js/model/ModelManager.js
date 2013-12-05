if(window.parent.ModelManager){
	ModelManager = window.parent.ModelManager;
}
else{
	var ModelManager = {};
	window.model = {};
	ModelManager.get = function(name){
		return window.model[name];
	};
}
