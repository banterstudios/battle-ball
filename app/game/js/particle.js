function Particle(_opts){
	var self = this;
	this._id = _opts.id || null;
	this.position = new Vector(_opts.x || 0,_opts.y || 0);
	this.staticPosition = new Vector(_opts.x || 0 , _opts.y || 0);
	this.size = new Vector(_opts.w || 0, _opts.h || 0);
	this.srcsize = new Vector(_opts.sw || 0, _opts.sh || 0);
	this.velocity = new Vector(_opts.velocity.x,_opts.velocity.y);
	this.velocityold = new Vector(_opts.velocity.x,_opts.velocity.y);
	this.inView = true;
	this.collision = false;
	this.dead = true;
	//this.type = this.constructor.name;
	this.layer = -1;
	this.angle = _opts.angle*(Math.PI/180) || 45*(Math.PI/180);
	this.dest = new Vector(_opts.dx || 0, _opts.dy || 0);
	this.alpha = 1;
	this.delay = _opts.delay || 0;
	this.currentDelay = 0;
	this.active = false;
	this.isEvil = false;
	this.srcImageWidth = 0;
	this.imageWidth = 0;
	this.evilPosition = new Vector(0,0);
};

Particle.prototype.Render=function(){
	if(!Arena.spriteSheets['particlesgood'].spritesLoaded || !Arena.spriteSheets['particlesbad'].spritesLoaded ||  this.dead || !this.active)return false;
	this.inView = true;
	return true;
	
};
Particle.prototype.Restart=function(){
	this.Die();
};
Particle.prototype.Alive=function(_cp){
	this.position.x = _cp.x;
	this.position.y = _cp.y;
	this.staticPosition.x = _cp.x;
	this.staticPosition.y = _cp.y;
	this.velocity.x = this.velocityold.x;
	this.velocity.y = this.velocityold.y;
	this.dead = false;
	this.inView = true;
	this.alpha = 1;
	this.active = false;
};
Particle.prototype.Die=function(){
	this.dead=true;
	this.inView = false;
	this.position.x = -1000;
	this.position.y = -1000;
	this.velocity.x = this.velocityold.x;
	this.velocity.y = this.velocityold.y;
	this.currentDelay = 0;
	this.active = false;
	this.alpha = 1;
};
Particle.prototype.Update=function(){
	if(this.dead)return false;
	if(/*(this.position.x-g_Level.viewport.x) > playWidth ||*/ (this.position.x+this.size.x)-g_Level.viewport.x <= 0 || (this.position.y+this.size.y)<= 0 || (this.position.y >= playHeight+g_Level.viewport.y)){this.Die(); return;}
	if(this.currentDelay++ < this.delay){return false;}
	this.evilWorld();
	return true;

};
Particle.prototype.evilWorld=function(){
	this.isEvil = ((g_Level.evilViewport.x)) < ((this.position.x) - g_Level.viewport.x) ? false : ((this.position.x-g_Level.viewport.x) > playWidth || (this.position.x+this.size.x)-g_Level.viewport.x <= 0 || (this.position.y+this.size.y)-g_Level.viewport.y<= 0 || (this.position.y-g_Level.viewport.y >= playHeight+g_Level.viewport.y)) ? false : true;
};
Particle.prototype.RenderEvil=function(){
	if(!Arena.spriteSheets['particlesbad'].img || !Arena.spriteSheets['particlesbad'].spritesLoaded || this.dead || !this.active)return;
	
	this.evilPosition.x = (((g_Level.evilViewport.x)) - ((this.position.x) - g_Level.viewport.x));

	
	if(this.evilPosition.x >= this.size.x)this.evilPosition.x = this.size.x;
	if(this.evilPosition.x <= 0)this.evilPosition.x = 0.1;
	
	this.srcImageWidth = (this.srcsize.x-this.evilPosition.x);
	this.imageWidth = (this.size.x-this.evilPosition.x);
	
	if(this.evilPosition.x)ctx.drawImage(Arena.spriteSheets['particlesbad'].img, ((this.srcsize.x)), ((this.srcsize.y)), this.evilPosition.x ,this.size.y, (this.position.x - g_Level.viewport.x) - g_Level.shakeViewport.x, (this.position.y) - g_Level.shakeViewport.y, this.evilPosition.x,this.size.y);
	
};








