function Snow(_opts){
	this.type = 'Snow';
	this.position = new Vector(_opts&&_opts.x || 0, _opts&&_opts.y || 0);
	this.size = new Vector(_opts&&_opts.w || playWidth, _opts&&_opts.h || 60);
	this.dest = new Vector(_opts&&_opts.dx || 0, _opts&&_opts.dy || 0);
	this.delay = _opts&&_opts.delay || 0;
	this.yTimer = 0;
};

Snow.prototype.Render=function(){
	if(!Arena.spriteSheets['snow'].img || !Arena.spriteSheets['snow'].spritesLoaded)return false;

	var pX = (g_Level.viewport.x % (playWidth / this.delay)) * this.delay; 
	for(var x = 0; x < (playWidth/playWidth) + 1; x++){
		ctx.drawImage(Arena.spriteSheets['snow'].img, 0 , 0 , playWidth ,Arena.spriteSheets['snow'].img.height, (x*playWidth) - pX,0 , playWidth,Arena.spriteSheets['snow'].img.height);
	}

};