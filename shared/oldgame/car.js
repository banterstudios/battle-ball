function Car(_opts){
	LevelObject.call(this,_opts);

	this.type = 'Car';
	
	this.createExplosion();
	this.createParticle();
	this.createChildrenBoundingBoxes();

};
Car.prototype = Object.create(LevelObject.prototype);
Car.prototype.constructor=Car;
Car.prototype.parent = LevelObject.prototype;


Car.prototype.createChildrenBoundingBoxes=function(){
	this.childrenBoundingBoxes.push({
		position:{x: this.position.x, y:this.position.y+16},
		size:{x:32, y:16},
		bbox:{x:32, y:16}
	});
	this.childrenBoundingBoxes.push({
		position:{x: this.position.x+32, y:this.position.y},
		size:{x:64, y:32},
		bbox:{x:64, y:32}
	});
};

Car.prototype.Update=function(){
	if(!this.parent.Update.call(this))return false;

	this.childrenBoundingBoxes[0].position.x = this.position.x;
	this.childrenBoundingBoxes[0].position.y = this.position.y+16;

	this.childrenBoundingBoxes[1].position.x = this.position.x+32;
	this.childrenBoundingBoxes[1].position.y = this.position.y;
};
