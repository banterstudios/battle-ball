function ExplosionParticle(_opts){
	Particle.call(this,_opts);
	this.type = 'ExplosionParticle';
	this.finished = false;
};
ExplosionParticle.prototype = Object.create(Particle.prototype);
ExplosionParticle.prototype.constructor=ExplosionParticle;
ExplosionParticle.prototype.parent = Particle.prototype;

ExplosionParticle.prototype.Render=function(){
	if(!this.parent.Render.call(this))return false;
	ctx.globalAlpha = this.alpha;
		ctx.drawImage(Arena.spriteSheets['particlesgood'].img, this.dest.x, this.dest.y, this.srcsize.x,this.srcsize.y, this.position.x - g_Level.viewport.x - g_Level.shakeViewport.x, this.position.y - g_Level.viewport.y - g_Level.shakeViewport.y, this.size.x,this.size.y);
	ctx.globalAlpha = 1;

	this.alpha -= 0.02;
	if(this.alpha <= 0){ this.Die(); return true; }



};

ExplosionParticle.prototype.Update=function(){
	if(!this.parent.Update.call(this) || this.finished)return false;
	
	this.active=true;
	this.position.x += (Math.cos(this.angle) * this.velocity.x);
	this.position.y += (Math.sin(this.angle) * this.velocity.y);
};
ExplosionParticle.prototype.Alive=function(_cp){
	this.finished = false;
	this.parent.Alive.call(this,_cp);
};
