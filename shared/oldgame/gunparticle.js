function GunParticle(_opts){
	Particle.call(this,_opts);
	this.type = 'GunParticle';
};
GunParticle.prototype = Object.create(Particle.prototype);
GunParticle.prototype.constructor=GunParticle;
GunParticle.prototype.parent = Particle.prototype;

GunParticle.prototype.Render=function(){
	if(!this.parent.Render.call(this))return false;
	ctx.drawImage(Arena.spriteSheets['particlesgood'].img, this.dest.x, this.dest.y, this.srcsize.x,this.srcsize.y, this.position.x - g_Level.viewport.x - g_Level.shakeViewport.x, this.position.y - g_Level.viewport.y - g_Level.shakeViewport.y, this.size.x,this.size.y);
};

GunParticle.prototype.Update=function(){
	if(!this.parent.Update.call(this) || this.finished)return false;
	

	this.active=true;
	this.position.x += (Math.cos(this.angle) * this.velocity.x);

	this.velocity.y -= Character.gravity;
	if(this.velocity.y <= 0){
		this.position.y += (this.velocity.y*-1);
	}else{
		this.position.y -= (this.velocity.y);
	}
	
	if(this.position.y >= playHeight+g_Level.viewport.y)this.Die();

};
GunParticle.prototype.Alive=function(_cp){
	if(!this.dead || this.active)return false;

	this.parent.Alive.call(this,_cp);
};