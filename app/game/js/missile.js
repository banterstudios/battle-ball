function Missile(_opts){
	Trap.call(this,_opts);

	this.type = 'Missile';
	
	this.strength = 30;

	this.createExplosion();
	this.createParticle();
};
Missile.prototype = Object.create(Trap.prototype);
Missile.prototype.constructor=Missile;
Missile.prototype.parent = Trap.prototype;


