function Collectable(_opts){

	this.position = new Vector( _opts&&_opts.x || 0, _opts&& _opts.y || 0);
	//this.staticPosition = new Vector(this.position.x, this.position.y);

	this.size = new Vector( _opts&&_opts.w || 0,  _opts&&_opts.h || 0);
	this.srcSize = new Vector( _opts&&_opts.sw || 0,  _opts&&_opts.sh || 0);
	this.bbox = new Vector( _opts&&_opts.bx ||  _opts&&_opts.w,  _opts&&_opts.by ||  _opts&&_opts.h);
	this.dest = new Vector( _opts&&_opts.dx || 0,  _opts&&_opts.dy || 0);
	this.inView = false;
	this.collision = true;
	//this.type = this.constructor.name;
	this.layer=12;
	this.active = false;

	this.currentFrameX = 0;
	this.maxFrameX = _opts&&_opts.maxFrameX || 0;
	this.frameDelay = 0;
	this.frameDelayAmount = 5;

	this.isFg = true;

	this.items = [];
	this.angle = 0;
	this.velocity = new Vector(0,0);
	this.speed = new Vector(0,0);
	this.hit=false;

	this.lights = [];
};

Collectable.prototype.Animate=function(){
	if(this.frameDelay++ > this.frameDelayAmount)
	{
		this.frameDelay = 0;
		this.currentFrameX++;
		if(this.currentFrameX >= this.maxFrameX)
		{	
			this.currentFrameX = 0;
		};
	};
};
Collectable.prototype.Restart=function(){
	this.Die();
	for(var i = 0, len = this.lights.length; i < len; i++)this.lights[i].Restart();
}
Collectable.prototype.Die=function(){
	this.collision = false;
	this.inView = false;
	this.active = false;
	this.velocity.x = 0; this.velocity.y = 0;
	this.speed.x = 0; this.speed.y = 0;
	this.hit = false;
	this.angle = 0;
};
Collectable.prototype.Render=function(){
	//if(!Arena.spriteSheets['goodtiles'] || !Arena.spriteSheets['goodtiles'].img || !Arena.spriteSheets['goodtiles'].spritesLoaded || !this.inView || !this.active )return false;
	//ctx.drawImage(Arena.spriteSheets['goodtiles'].img, this.dest.x, this.dest.y, this.size.x,this.size.y, (this.position.x - g_Level.viewport.x - g_Level.shakeViewport.x), this.position.y - g_Level.viewport.y - g_Level.shakeViewport.y, this.size.x,this.size.y);
};

Collectable.prototype.Update=function(_offset){
	//if(_offset){this.position.x = this.staticPosition.x + _offset; }

	if((this.position.x+this.size.x)-g_Level.viewport.x <= 0 || !this.active){
		this.inView = false; /*this.collision = false;*/ this.active = false; return false;
	}else
	if(((this.position.x)-g_Level.viewport.x) >= (playWidth+this.size.x) /*|| (this.position.y+this.size.y)-g_Level.viewport.y<= 0 || (this.position.y-g_Level.viewport.y >= playHeight)*/){ this.inView = false; return false;}

	if(!this.inView)this.inView = true;
	if(!this.collision)this.collision = true;

	//this.items = g_QuadTree.retrieve(this);
	
	for(var i = 0, len = g_Level.collisionChildren.length; i < len; i++){
		if(!g_Level.collisionChildren[i].inView)continue;
		if(g_Level.collisionChildren[i]===this || g_Level.collisionChildren[i].type===this.type || g_Level.collisionChildren[i].type==='Player' || g_Level.collisionChildren[i].type==='Deer' || g_Level.collisionChildren[i].type==='Elf')continue;
		if(boundingBoxCollision(this,g_Level.collisionChildren[i],{x:this.position.x+this.velocity.x, y:this.position.y})){
			//this.position.y = g_Level.collisionChildren[i].position.y - this.size.y - 1;
			return true;
		};
	};

	if((this.position.y+this.velocity.y) >= (scrollHeight-(Arena.TILESIZE*2))){return true;}

	this.velocity.y += 0.08;
	this.position.x += this.velocity.x;
	this.position.y += this.velocity.y;

	return true;

};
Collectable.prototype.Trigger=function(obj){
	var self = this;

	if(obj.type==='Player'){
		if(this.type==='CoinCollectable'){this.Die(); if(g_Player!==null)g_Player.score++;}
	}
};
Collectable.prototype.Spawn=function(_opts){
	
	/*this.position.x = (g_Level.viewport.x + (playWidth));
	this.position.y = g_Level.levels[g_Level.currentLevel].scrollHeight-(Arena.TILESIZE*2);*/
	this.speed.x = Math.cos(Math.random() * Math.PI / 2) * ((Math.random() * (5-3)+3)|0);
	this.speed.y = Math.sin(Math.random() * Math.PI / 2) * ((Math.random() * (5-3)+3)|0);
	
	this.angle = -20 * (Math.PI / 180);

	this.velocity.x = Math.cos(this.angle) * this.speed.x;
	this.velocity.y = Math.sin(this.angle) * this.speed.y;

	this.position.x = _opts.x;
	this.position.y = _opts.y-this.size.y;

	this.active = true;
	this.collision = true;
	for(var i = 0, len = g_Level.collisionChildren.length; i < len; i++){
		//if(!g_Level.collisionChildren[i].inView)continue;
		if(g_Level.collisionChildren[i]===this || g_Level.collisionChildren[i].type===this.type || g_Level.collisionChildren[i].type==='Player' || g_Level.collisionChildren[i].type==='Deer' || g_Level.collisionChildren[i].type==='Elf')continue;
		if(boundingBoxCollision(this,g_Level.collisionChildren[i],{x:this.position.x+this.velocity.x, y:this.position.y}, true)){
			this.position.y = g_Level.collisionChildren[i].position.y - this.size.y - 1;
			return true;
		};
	};
};


