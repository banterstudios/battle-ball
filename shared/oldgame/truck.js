function Truck(_opts){
	LevelObject.call(this,_opts);
	this.type = 'Truck';
	this.explosionAmount = 10;
	this.rx = 0;
	this.ry = 0;
	this.createExplosion();
	this.createParticle();

	this.createChildrenBoundingBoxes();
};
Truck.prototype = Object.create(LevelObject.prototype);
Truck.prototype.constructor=Truck;
Truck.prototype.parent = LevelObject.prototype;


Truck.prototype.createChildrenBoundingBoxes=function(){
	this.childrenBoundingBoxes.push({
		position:{x: this.position.x, y:this.position.y+32},
		size:{x:32, y:64},
		bbox:{x:32, y:64}
	});
	this.childrenBoundingBoxes.push({
		position:{x: this.position.x+32, y:this.position.y},
		size:{x:256, y:96},
		bbox:{x:256, y:96}
	});
};

Truck.prototype.Update=function(){
	if(!this.parent.Update.call(this))return false;

	this.childrenBoundingBoxes[0].position.x = this.position.x;
	this.childrenBoundingBoxes[0].position.y = this.position.y+32;

	this.childrenBoundingBoxes[1].position.x = this.position.x+32;
	this.childrenBoundingBoxes[1].position.y = this.position.y;
};

Truck.prototype.createExplosion=function(){
	for(var i = 0; i < this.explosionAmount; i ++ ){
		this.children.push(new Explosion({delay:i*2}));
		/*this.children[this.children.length-1].dest.x = 96;
		this.children[this.children.length-1].dest.y = 128;*/
	};
};
Truck.prototype.Smash=function(){
	g_Level.shake=true;
	
	for(var i = 0; i < this.explosionAmount; i++){
		this.rx = Math.round(Math.random() * (this.position.x+(this.size.x) - this.position.x) + this.position.x);
		this.ry = Math.round(Math.random() * (this.position.y+(this.size.y) - this.position.y) + this.position.y);
		this.children[i].Spawn({x:this.rx, y:this.ry}); 
	};

	sounds.explosion.play();
	
	for(var i=0,len=this.particles.length; i < len; i++)this.particles[i].Alive({x:(this.position.x+(this.size.x/2)), y:(this.position.y+(this.size.y/2))});
	
	this.Die();
};