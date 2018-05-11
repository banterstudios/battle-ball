function Bin(_opts){
	LevelObject.call(this,_opts);

	this.type = 'Bin';

	this.createExplosion();
	this.createParticle();
};
Bin.prototype = Object.create(LevelObject.prototype);
Bin.prototype.constructor=Bin;
Bin.prototype.parent = LevelObject.prototype;
