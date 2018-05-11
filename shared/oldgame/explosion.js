function Explosion(_opts){
	this.position = new Vector(_opts&&_opts.x || -1000, _opts&&_opts.y || -1000);
	this.size = new Vector(_opts&&_opts.w || 32, _opts&&_opts.h || 32);
	this.srcsize = new Vector(_opts&&_opts.sw || 96, _opts&&_opts.sh || 96);
	

	this.dest = new Vector(0,0);
	this.dest.x = _opts&&_opts.dx ? _opts.dx : 96;
	this.dest.y = _opts&&_opts.dy===0 ? _opts.dy : 128;
	

	this.inView = true;
	this.collision = false;
	this.active = false;
	this.type = 'Explosion';
	this.currentFrameX = 0;
	this.maxFrameX = _opts&&_opts.maxFrameX || 5;
	this.frameDelay = 0;
	this.frameDelayAmount = 2;

	this.minSize = _opts&&_opts.minSize || 32;
	this.maxSize = _opts&&_opts.maxSize || 160;

	this.delay = _opts&&_opts.delay || 0;
	this.currentDelay = 0;

	this.isEvil = false;
	this.evilPosition = new Vector(0,0);

};

Explosion.prototype.Render=function(){
	if(this.currentDelay++ < this.delay)return false;
	if(!Arena.spriteSheets['explosion'] || !Arena.spriteSheets['explosion'].img || !Arena.spriteSheets['explosion'].spritesLoaded || !this.inView || !this.active){return false;}
	this.Animate();
	ctx.drawImage(Arena.spriteSheets['explosion'].img, this.dest.x*this.currentFrameX, this.dest.y, this.srcsize.x,this.srcsize.y, ((this.position.x-(this.size.x/2)) - g_Level.viewport.x - g_Level.shakeViewport.x), (this.position.y-(this.size.y/2)) - g_Level.viewport.y - g_Level.shakeViewport.y, this.size.x,this.size.y);
};
Explosion.prototype.RenderEvil=function(){
	if(this.currentDelay < this.delay)return false;
	if(!Arena.spriteSheets['explosion'] || !Arena.spriteSheets['explosion'].img || !Arena.spriteSheets['explosion'].spritesLoaded || !this.inView || !this.active || !this.isEvil){return false;}
	
	this.evilPosition.x = (((g_Level.evilViewport.x)) - ((this.position.x) - g_Level.viewport.x));
	this.evilPosition.y = this.size.y;
	//if(this.evilPosition.x >= this.size.x){this.evilPosition.x = this.size.x;}
	//if(this.evilPosition.x)oCtx.drawImage(Arena.spriteSheets['explosion'].img, this.dest.x*this.currentFrameX, this.dest.y , this.evilPosition.x ,this.srcsize.y, ((this.position.x-(this.size.x/2)) - g_Level.viewport.x - g_Level.shakeViewport.x), (this.position.y-(this.size.y/2)) - g_Level.viewport.y - g_Level.shakeViewport.y, this.evilPosition.x,this.size.y);
	oCtx.drawImage(Arena.spriteSheets['explosion'].img, this.dest.x*this.currentFrameX, this.dest.y, this.srcsize.x,this.srcsize.y, ((this.position.x-(this.size.x/2)) - g_Level.viewport.x - g_Level.shakeViewport.x), (this.position.y-(this.size.y/2)) - g_Level.viewport.y - g_Level.shakeViewport.y, this.size.x,this.size.y);

};
Explosion.prototype.Update=function(){
	if(((this.position.x)-g_Level.viewport.x) >= (playWidth) || (this.position.x+this.size.x)-g_Level.viewport.x <= 0 || (this.position.y+this.size.y)-g_Level.viewport.y<= 0 || (this.position.y-g_Level.viewport.y >= playHeight) || !this.active || !this.inView){this.Die(); return;}
	if(!this.inView)this.inView = true;

	this.size.x+=15; //maybe remove these {
	this.size.y+=15; // }

	if(this.size.x >= this.maxSize)this.size.x=this.maxSize;
	if(this.size.y >= this.maxSize)this.size.y=this.maxSize;

	this.evilWorld();
};
Explosion.prototype.Animate=function(){
	if(this.frameDelay++ > this.frameDelayAmount)
	{
		this.frameDelay = 0;
		this.currentFrameX++;
		if(this.currentFrameX >= this.maxFrameX)
		{	
			this.Die();
			//this.currentFrameX = 0;
		}
	}
}
Explosion.prototype.evilWorld=function(){ this.isEvil = ((g_Level.evilViewport.x)) < ((this.position.x) - g_Level.viewport.x) ? false : ((this.position.x-g_Level.viewport.x) > playWidth || (this.position.x+this.size.x)-g_Level.viewport.x <= 0 || (this.position.y+this.size.y)-g_Level.viewport.y<= 0 || (this.position.y-g_Level.viewport.y >= playHeight+g_Level.viewport.y)) ? false : true; }
Explosion.prototype.Die=function(){ this.inView = false; this.active = false; this.currentDelay = 0; }
Explosion.prototype.Restart=function(){
	this.Die();
};
Explosion.prototype.Spawn=function(_opts){
	this.inView=true;
	this.active=true;
	this.currentFrameX = 0;
	this.position.x = _opts.x;
	this.position.y = _opts.y;
	this.size.x = this.minSize;
	this.size.y = this.minSize;
};