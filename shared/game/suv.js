function Suv(_opts){
	LevelObject.call(this,_opts);
	this.type = 'Suv';
	this.createExplosion();
	this.createParticle();
	//this.createLights();
	this.createChildrenBoundingBoxes();

};
Suv.prototype = Object.create(LevelObject.prototype);
Suv.prototype.constructor=Suv;
Suv.prototype.parent = LevelObject.prototype;

Suv.prototype.createChildrenBoundingBoxes=function(){
	this.childrenBoundingBoxes.push({
		position:{x: this.position.x, y:this.position.y+32},
		size:{x:32, y:32},
		bbox:{x:32, y:32}
	});
	this.childrenBoundingBoxes.push({
		position:{x: this.position.x+32, y:this.position.y},
		size:{x:64, y:64},
		bbox:{x:64, y:64}
	});
};

/*Suv.prototype.createLights=function(){
	this.lights.push( new Light({flicker:Light.FLICKER.INITIAL, w:34, h:20, dx:192, dy:0, ox:0,oy:0, sw:34,sh:20,name:'Beam'}) );
};*/
Suv.prototype.Update=function(){
	if(!this.parent.Update.call(this))return false;

	this.childrenBoundingBoxes[0].position.x = this.position.x;
	this.childrenBoundingBoxes[0].position.y = this.position.y+32;

	this.childrenBoundingBoxes[1].position.x = this.position.x+32;
	this.childrenBoundingBoxes[1].position.y = this.position.y;
};
/*window.debugobj = [];
Suv.prototype.Spawn=function(_position){
	this.parent.Spawn.call(this,_position);
	debugobj.push(this);
	console.log('here!');
	this.spawnLights();
};

Suv.prototype.spawnLights=function(){
	this.lights[0].position.x = this.position.x;
	this.lights[0].position.y = this.position.y;
	this.lights[0].offset.x = 29;
	this.lights[0].offset.y = -30;
};*/