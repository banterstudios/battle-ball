function Mask(_opts){
	this.position = new Vector(_opts&&_opts.x || 0, _opts&&_opts.y || 0);
	this.size = new Vector(_opts&&_opts.w || 196, _opts&&_opts.h || playHeight);
	this.srcSize = new Vector(_opts&&_opts.sw || this.size.x, _opts&&_opts.sh || this.size.y);
	this.dest = new Vector(_opts&&_opts.dx || 196, _opts&&_opts.dy || 0);
	this.type = 'Mask';
	this.currentFrameX = 0;
	this.maxFrameX = 3;
	this.frameDelay = 0;
	this.frameDelayAmount = 6;

	this.srcSizeX = 0;
	this.evilViewportOffset = 0;
};

Mask.prototype.Animate=function(){
	if(this.frameDelay++ > this.frameDelayAmount)
	{
		this.frameDelay = 0;
		this.currentFrameX++;
		if(this.currentFrameX >= this.maxFrameX)
		{	
			this.currentFrameX = 0;
		}
	}
};

Mask.prototype.RenderToOffCanvas=function(){
	o2Ctx.clearRect(0,0,playWidth,playHeight);

	this.srcSizeX = ((this.srcSize.x)*this.currentFrameX) <= 0 ? 0.1 : ((this.srcSize.x)*this.currentFrameX);
	this.evilViewportOffset = (g_Level.evilViewport.x-(this.size.x)) <= 0 ? 0.1 : (g_Level.evilViewport.x-(this.size.x));

	o2Ctx.drawImage(Arena.spriteSheets['meshoverlay'].img,0,0,this.evilViewportOffset, playHeight);
	o2Ctx.drawImage(Arena.spriteSheets['mesh'].img,this.srcSizeX , 0 , this.srcSize.x , this.srcSize.y , this.evilViewportOffset,0,this.size.x,this.size.y);
};
Mask.prototype.Render=function(){
	if(!Arena.spriteSheets['mesh'] || !Arena.spriteSheets['mesh'].img || !Arena.spriteSheets['mesh'].spritesLoaded || !Arena.spriteSheets['meshoverlay'] || !Arena.spriteSheets['meshoverlay'].img || !Arena.spriteSheets['meshoverlay'].spritesLoaded) return false;
	this.Animate();
	this.RenderToOffCanvas();
	if(g_Level.evilViewport.x)oCtx.drawImage(o2Canvas,0,0,g_Level.evilViewport.x,playHeight,0,0,g_Level.evilViewport.x,playHeight);
	//oCtx.drawImage(Arena.spriteSheets['mesh'].img, (this.srcSize.x)*this.currentFrameX , 0 , this.srcSize.x , this.srcSize.y , this.position.x , this.position.y ,this.size.x, this.size.y);
};