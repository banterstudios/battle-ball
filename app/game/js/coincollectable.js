function CoinCollectable(_opts){
/*	var randomIndex = Math.round(Math.random() * g_Level.collectableSpawnPoints.length-1);
	var _sp = g_Level.collectableSpawnPoints[randomIndex];*/

	Collectable.call(this,{
		x:_opts&&_opts.x || -1000,
		y:_opts&&_opts.y || -1000,
		w:32,
		h:32,
		sw:32,
		sh:32,
		dx:32,
		dy:0,
		isFg:true,
		maxFrameX:3
	});

	this.type = 'CoinCollectable';

	this.createLights();
};
CoinCollectable.prototype = Object.create(Collectable.prototype);
CoinCollectable.prototype.constructor=CoinCollectable;
CoinCollectable.prototype.parent = Collectable.prototype;

CoinCollectable.prototype.createLights=function(){
	this.lights.push( new Light({imageName:'goodtiles',rotate:true,lox:1,loy:1, compositeOperation:'overlay' , flicker:Light.FLICKER.INITIAL, w:59, h:60,dx:160, dy:416,name:'coinlight'}) );
};

CoinCollectable.prototype.Render=function(){
if(!Arena.spriteSheets['coins'] || !Arena.spriteSheets['coins'].img || !Arena.spriteSheets['coins'].spritesLoaded || !this.inView || !this.active )return false;
	
	for(var i = 0, len = this.lights.length; i<len; i++)this.lights[i].Render();
	
	this.Animate();
	ctx.globalCompositeOperation = 'lighter';
	ctx.drawImage(Arena.spriteSheets['coins'].img, this.dest.x*this.currentFrameX, this.dest.y, this.srcSize.x,this.srcSize.y, (this.position.x - g_Level.viewport.x - g_Level.shakeViewport.x), this.position.y - g_Level.viewport.y - g_Level.shakeViewport.y, this.size.x,this.size.y);
	ctx.globalCompositeOperation = 'source-over';
};

CoinCollectable.prototype.Update=function(_offset){
	if(!this.parent.Update.call(this,_offset))return false;
	for(var i = 0, len = this.lights.length; i<len; i++)this.lights[i].Update(this.position.x,this.position.y,this.size.x,this.size.y);
};