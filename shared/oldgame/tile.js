function Tile(_opts){
	

	this.type = 'Tile';
	this.position = new Vector( _opts&&_opts.x || 0, _opts&& _opts.y || 0);
	this.staticPosition = new Vector(_opts&&_opts.x || 0, _opts&& _opts.y || 0);
	this.size = new Vector( _opts&&_opts.w || 0,  _opts&&_opts.h || 0);
	this.inView = false;
	this.isEvil = false;
	this.dest = new Vector( _opts&&_opts.dx || 0,  _opts&&_opts.dy || 0);
	this.tileType =  _opts&&_opts.type || Tile.TYPE.tile;
	this.evilPosition = new Vector(0,0);
	this.isFg = _opts.isFg;
	this.children = [];

};

Tile.TYPE = {
	tile:0
};

Tile.prototype.Restart=function(_override){
	if(_override){
		this.position.x = this.staticPosition.x;
		this.position.y = this.staticPosition.y;
	}
	this.inView = false;
	for(var i = 0, len = this.children.length; i < len; i++)this.children[i].Restart(_override);
};
Tile.prototype.Update=function(_offset){
	if(_offset){this.position.x = (this.staticPosition.x + _offset); }
	for(var i = 0, len = this.children.length; i < len; i++)this.children[i].Update(_offset);
	
	if(((this.position.x)-g_Level.viewport.x) >= (playWidth+this.size.x) || (this.position.x+this.size.x)-g_Level.viewport.x <= 0 || (this.position.y+this.size.y)-g_Level.viewport.y<= 0 || (this.position.y-g_Level.viewport.y >= playHeight)){this.inView = false; /*this.collision = false;*/ return;}
	//if((this.position.y+this.size.y)-g_Level.viewport.y<= 0 || (this.position.y-g_Level.viewport.y >= playHeight)){this.inView = false; this.collision = this.startCollision; return;}

	if(!this.inView)this.inView = true;
	if(this.collision !== this.startCollision)this.collision = this.startCollision;

	this.evilWorld();
	//if(this.dead)return false;

};

/*Tile.prototype.Trigger=function(obj, _opts){
	var self = this;
	if(obj.type==='Player'){
		if(_opts&&_opts.direction===Character.DIRECTIONS.RIGHT){
			g_Level.catchPlayer();
		}
	}else
	if(obj.type==='BazookaBullet'){
		if(!g_Level.levels[g_Level.currentLevel].linkTileToExplosion[this.tileType]){ this.Smash(); return true; }

		for(var i=0, len=g_Level.levels[g_Level.currentLevel].linkTileToExplosion[this.tileType].length; i<len; i++){
			g_Level.levels[g_Level.currentLevel].children[g_Level.levels[g_Level.currentLevel].linkTileToExplosion[this.tileType][i]].Smash();
		}
		//this.Smash();
		//do nothing for now.
	}

};*/


Tile.prototype.evilWorld=function(){
	this.isEvil = ((g_Level.evilViewport.x)) < ((this.position.x) - g_Level.viewport.x) ? false : ((this.position.x-g_Level.viewport.x) > playWidth || (this.position.x+this.size.x)-g_Level.viewport.x <= 0 || (this.position.y+this.size.y)-g_Level.viewport.y<= 0 || (this.position.y-g_Level.viewport.y >= playHeight+g_Level.viewport.y)) ? false : true;
};
/*Tile.prototype.Die=function(){
	this.collision = false;
	//this.inView = false;
	this.dead = true;
};

Tile.prototype.Smash=function(){
	g_Level.shake=true;
	if(this.children[0]){ this.children[0].Spawn({x: this.position.x, y:this.position.y}); sounds.explosion.play(); }
	for(var i=0,len=this.particles.length; i < len; i++)this.particles[i].Alive({x:(this.position.x+(this.size.x/2)), y:(this.position.y+(this.size.y/2))});
	this.Die();
};*/

Tile.prototype.Render=function(){

	//ctx.globalCompositeOperation = "lighter";
	for(var i = 0, len = this.children.length; i < len; i++)this.children[i].Render();
	//ctx.globalCompositeOperation = "source-over";

	if( !Arena.spriteSheets['eviltiles'].img || !Arena.spriteSheets['goodtiles'].img || !Arena.spriteSheets['eviltiles'].spritesLoaded || !Arena.spriteSheets['goodtiles'].spritesLoaded /*|| this.dead*/ || this.tile===null || !this.inView)return;
	
	/*if(debug&&this.collision){
		ctx.strokeStyle='#0000ff';
		ctx.strokeRect(this.position.x-g_Level.viewport.x,this.position.y-g_Level.viewport.y,this.size.x,this.size.y);
	}*/
	//if(!this.isEvil){ ctx.drawImage(Arena.spriteSheets['goodtiles'].img, this.dest.x, this.dest.y, this.size.x,this.size.y, (this.position.x - g_Level.viewport.x - g_Level.shakeViewport.x), this.position.y - g_Level.viewport.y - g_Level.shakeViewport.y, this.size.x,this.size.y); return;}
	ctx.drawImage(Arena.spriteSheets['goodtiles'].img, this.dest.x, this.dest.y, this.size.x,this.size.y, (this.position.x - g_Level.viewport.x - g_Level.shakeViewport.x), this.position.y - g_Level.viewport.y - g_Level.shakeViewport.y, this.size.x,this.size.y);
	//return;


	/*this.evilPosition.x = (((g_Level.evilViewport.x)) - ((this.position.x) - g_Level.viewport.x));
	this.evilPosition.y = this.size.y;

	if(this.evilPosition.x >= this.size.x){this.evilPosition.x = this.size.x;}
	
	var imageWidth = (this.size.x-this.evilPosition.x);
	if(imageWidth)ctx.drawImage(Arena.spriteSheets['goodtiles'].img,(this.dest.x)+this.evilPosition.x,this.dest.y,imageWidth,this.size.y, ((this.position.x+this.evilPosition.x) - g_Level.viewport.x - g_Level.shakeViewport.x), this.position.y - g_Level.viewport.y - g_Level.shakeViewport.y, imageWidth, this.size.y);
	if(this.evilPosition.x)ctx.drawImage(Arena.spriteSheets['eviltiles'].img, (this.dest.x) , (this.dest.y) , this.evilPosition.x ,this.size.y, (this.position.x - g_Level.viewport.x - g_Level.shakeViewport.x), this.position.y - g_Level.viewport.y - g_Level.shakeViewport.y, this.evilPosition.x,this.size.y);*/
};

Tile.prototype.RenderEvil=function(){
	if(!Arena.spriteSheets['eviltiles'].img || !Arena.spriteSheets['goodtiles'].img || !Arena.spriteSheets['eviltiles'].spritesLoaded || !Arena.spriteSheets['goodtiles'].spritesLoaded || this.tile===null || !this.inView || !this.isEvil)return;
	
	this.evilPosition.x = (((g_Level.evilViewport.x)) - ((this.position.x) - g_Level.viewport.x));
	this.evilPosition.y = this.size.y;

	if(this.evilPosition.x >= this.size.x){this.evilPosition.x = this.size.x;}
	if(this.evilPosition.x <= 0)this.evilPosition.x = 0.1;
	//this.imageWidth = (this.size.x-this.evilPosition.x);
	//if(imageWidth)ctx.drawImage(Arena.spriteSheets['goodtiles'].img,(this.dest.x)+this.evilPosition.x,this.dest.y,imageWidth,this.size.y, ((this.position.x+this.evilPosition.x) - g_Level.viewport.x - g_Level.shakeViewport.x), this.position.y - g_Level.viewport.y - g_Level.shakeViewport.y, imageWidth, this.size.y);
	if(this.evilPosition.x)oCtx.drawImage(Arena.spriteSheets['eviltiles'].img, (this.dest.x) , (this.dest.y) , this.evilPosition.x ,this.size.y, (this.position.x - g_Level.viewport.x - g_Level.shakeViewport.x), this.position.y - g_Level.viewport.y - g_Level.shakeViewport.y, this.evilPosition.x,this.size.y);
};

/*Tile.prototype.createParticle=function(){
	for(var j = 0; j < 3; j++){
		for(var i = 0; i < 8; i++){
			var _angle = (Math.random() * (360)) >> 0;
			this.children.push(new ExplosionParticle({
				id:Math.random(),
				x:-1000,
				y:-1000,
				w:20,
				h:20,
				sw:32,
				sh:32,
				velocity:{x:(Math.random()*(5-2)+2),y:((3))},
				angle:_angle,
				dx:(i*32),
				dy:160,
				delay:0//i === 0 ? 0 : Math.round(i/8)
			}));
			this.particles.push(this.children[this.children.length-1]);
		};
	};
};*/








