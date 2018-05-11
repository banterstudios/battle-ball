function LadyOfTheNight(_opts){
	this.position = new Vector(_opts&&_opts.x || 0, _opts&&_opts.y || 0);
	this.staticPosition = new Vector(_opts&&_opts.x || 0, _opts&& _opts.y || 0);
	this.size = new Vector(_opts&&_opts.w || 26, _opts&&_opts.h || 46);
	this.srcsize = new Vector(_opts&&_opts.sw || 32, _opts&&_opts.sh || 46);
	this.dest = new Vector( _opts&&_opts.dx || 32,  _opts&&_opts.dy || 128);
	this.type = 'LadyOfTheNight';
	this.inView = false;
	this.currentFrameX = 0;
	this.maxFrameX = 4;
	this.frameDelay = 0;
	this.frameDelayAmount = 10;
	this.spawnIndex = 0;
	this.isEvil = false;
	this.isFg = _opts.isFg;
	this.position.y -= this.size.y;
	this.show = true;
	this.stopSmoking = false;
};

LadyOfTheNight.spawnPositions = [
	32,128,224,320,608,704,800
]; // Spawn positions for the x Axis -- y Axis is always static so no need to reset.
LadyOfTheNight.lastSpawnedPositionIndex = null;


LadyOfTheNight.prototype.Render=function(){
	if(!this.show || !Arena.spriteSheets['charactergood'] || !Arena.spriteSheets['charactergood'].img || !Arena.spriteSheets['charactergood'].spritesLoaded || !this.inView){return false;}
	if(!this.stopSmoking)this.Animate();
	ctx.drawImage(Arena.spriteSheets['charactergood'].img, this.dest.x*this.currentFrameX, this.dest.y, this.size.x,this.size.y, (this.position.x - g_Level.viewport.x - g_Level.shakeViewport.x), this.position.y - g_Level.viewport.y - g_Level.shakeViewport.y, this.size.x,this.size.y);
}
LadyOfTheNight.prototype.Update=function(_offset){
	if(_offset){this.position.x = (this.staticPosition.x + _offset); }
	if((this.position.x+this.size.x)-g_Level.viewport.x <= 0){ this.rePosition(); this.inView=false; return false; }
	if(((this.position.x)-g_Level.viewport.x) >= (playWidth) || (this.position.y+this.size.y)-g_Level.viewport.y<= 0 || (this.position.y-g_Level.viewport.y >= playHeight)){this.inView = false; return;}
	this.inView = true;
	this.evilWorld();
};
LadyOfTheNight.prototype.startSmoking=function(){
	this.stopSmoking = false;
};
LadyOfTheNight.prototype.Animate=function(){
	if(this.frameDelay++ > this.frameDelayAmount)
	{
		this.frameDelay = 0;
		this.currentFrameX++;
		if(this.currentFrameX >= this.maxFrameX)
		{	
			this.stopSmoking=true;
			this.currentFrameX = 0;
		}
	}
}
LadyOfTheNight.prototype.rePosition=function(){
	this.position.x += Arena.spriteSheets['testlevel2'].img.width;
	if(Math.round(Math.random() * (1)) === 0){this.show=false; return true;}
	this.show=true;
};


LadyOfTheNight.prototype.Restart=function(){
	this.inView = false;
	this.show=true;
	this.Spawn();
	this.stopSmoking = false;
};
LadyOfTheNight.prototype.Spawn=function(){
	this.spawnIndex = Math.round(Math.random() * (LadyOfTheNight.spawnPositions.length-1));
	
	while(LadyOfTheNight.spawnPositions[this.spawnIndex] === LadyOfTheNight.spawnPositions[LadyOfTheNight.lastSpawnedPositionIndex]){
		if(LadyOfTheNight.lastSpawnedPositionIndex === null){break;}
		this.spawnIndex = Math.round(Math.random() * (LadyOfTheNight.spawnPositions.length-1));
	};

	this.position.x = LadyOfTheNight.spawnPositions[this.spawnIndex];
	LadyOfTheNight.lastSpawnedPositionIndex = this.spawnIndex;

};
LadyOfTheNight.prototype.RenderEvil=function(){
	if(!this.show || !Arena.spriteSheets['charactergood'] || !Arena.spriteSheets['charactergood'].img || !Arena.spriteSheets['charactergood'].spritesLoaded || !this.inView){return false;}
	oCtx.drawImage(Arena.spriteSheets['charactergood'].img, this.dest.x*this.currentFrameX, this.dest.y, this.size.x,this.size.y, (this.position.x - g_Level.viewport.x - g_Level.shakeViewport.x), this.position.y - g_Level.viewport.y - g_Level.shakeViewport.y, this.size.x,this.size.y);
};
LadyOfTheNight.prototype.evilWorld=function(){
	this.isEvil = ((g_Level.evilViewport.x)) < ((this.position.x) - g_Level.viewport.x) ? false : ((this.position.x-g_Level.viewport.x) > playWidth || (this.position.x+this.size.x)-g_Level.viewport.x <= 0 || (this.position.y+this.size.y)-g_Level.viewport.y<= 0 || (this.position.y-g_Level.viewport.y >= playHeight+g_Level.viewport.y)) ? false : true;
};