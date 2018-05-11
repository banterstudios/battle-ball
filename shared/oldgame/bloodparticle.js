function BloodParticle(_opts){
	Particle.call(this,_opts);

	this.type = 'BloodParticle';
};
BloodParticle.prototype = Object.create(Particle.prototype);
BloodParticle.prototype.constructor=BloodParticle;
BloodParticle.prototype.parent = Particle.prototype;

BloodParticle.prototype.Render=function(){
	if(!this.parent.Render.call(this))return false;
	//ctx.globalAlpha = this.alpha;
		ctx.drawImage(Arena.spriteSheets['particlesgood'].img, this.dest.x, this.dest.y, this.srcsize.x,this.srcsize.y, this.position.x - g_Level.viewport.x - g_Level.shakeViewport.x, this.position.y - g_Level.viewport.y - g_Level.shakeViewport.y, this.size.x,this.size.y);
	//ctx.globalAlpha = 1;
	//this.alpha -= 0.06;
	//if(this.alpha <= 0){ this.Die(); return true;}
};

BloodParticle.prototype.Alive=function(_cp){
	this.parent.Alive.call(this,_cp);
	var speedx = Math.cos(Math.random() * Math.PI / 2) * 2;
	var speedy = Math.cos(Math.random() * Math.PI / 2) * 3;
	this.velocity.x = Math.cos(this.angle) * speedx;
	this.velocity.y = Math.sin(this.angle) * speedy;
};
BloodParticle.prototype.Update=function(){
	if(!this.parent.Update.call(this) || this.finished)return false;
	this.active=true;
	this.velocity.y += 0.08;
	this.position.x += this.velocity.x;
	this.position.y += this.velocity.y;

	//this.position.x += (Math.cos(this.angle) * this.velocity.x);
	//this.position.y += (Math.sin(this.angle) * this.velocity.y * Character.gravity);
};