var MovingObject = function(object){
	
	this.object = object;
	this.enabled = false;
	this.selected = false;
	this.origin = object.position;
	this.dest = {};

	this.run = function(){
		if(this.enabled === true){
			console.log('moving')
		}
	}



}