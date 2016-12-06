function LevelObject(_opts){
	//this.type = this.constructor.name;
	this.position = new Vector(_opts&&_opts.x || 0, _opts&&_opts.y || 0);
	this.size = new Vector(_opts&&_opts.w || 32, _opts&&_opts.h || 32);
	this.bbox = new Vector(_opts&&_opts.bw || this.size.x, _opts&&_opts.bh || this.size.y);
	this.inView = false;
	this.collision = true;
	this.startCollision = this.collision;
	this.isEvil = false;
	this.dest = new Vector( _opts&&_opts.dx || 0,  _opts&&_opts.dy || 0);
	this.evilPosition = new Vector(0,0);
	this.isFg = true;
	this.children = [];
	this.dead = true;
	this.layer =  _opts&&_opts.layer || 3;
	this.enemylayer = _opts&&_opts.enemylayer || 3;	
	this.particles = [];
	this.lights = [];
	this.childrenBoundingBoxes = [];
	this.imageWidth = 0;
	this.trigger = false;
};

LevelObject.maxNumberOfDifferentObstacles = 4; // House, Car , SUV, TRUCK
LevelObject.ObstacleTypes = {
	HOUSE:0,
	TRUCK:1,
	SUV:2,
	CAR:3,
	BIN:4,
	ROADHOLE:5
};
//LevelObject.once = false;

LevelObject.prototype.Restart=function(){
	this.inView = false;
	for(var i = 0, len = this.children.length; i < len; i++)this.children[i].Restart();
	this.collision = this.startCollision;
	this.dead = true;
	this.position.x = -1000;
	this.position.y = -1000;
	this.trigger = false;
	LevelObject.once = false;
};

LevelObject.prototype.Update=function(){
	for(var i = 0, len = this.children.length; i < len; i++)this.children[i].Update();
	
	if(this.dead){ this.collision = false; }
	if((this.position.x+this.size.x)-g_Level.viewport.x <= 0){ if(this.trigger&&this.type==='House'){ g_Player.preventJumping = false; g_Level.spawningHouses = false;}this.Die(); this.inView=false; return false; }
	if(((this.position.x)-g_Level.viewport.x) >= (playWidth+this.size.x)){this.inView = false; return false;}
	//if((this.position.y+this.size.y)-g_Level.viewport.y<= 0 || (this.position.y-g_Level.viewport.y >= playHeight)){this.inView = false; this.collision = true; return false;}

	if(!this.inView)this.inView = true;
	if(this.collision !== true)this.collision = this.startCollision;


	if(this.type==='House'&&this.trigger){
		if(g_Player.position.x >= this.position.x+this.size.x){
			if(!g_Player.lockViewportOnMove)g_Player.lockViewportOnMove=true;
			g_Level.isOnRoofTops = false;
		};
	};


	this.evilWorld();

	return true;
};

LevelObject.prototype.Trigger=function(obj, _opts){
	var self = this;
	if(obj.type==='Player'){
		if(_opts&&_opts.direction===Character.DIRECTIONS.RIGHT){
			g_Level.catchPlayer();
		}
	}else
	if(obj.type==='BazookaBullet'){
		this.Smash();
		//do nothing for now.
	}
};
LevelObject.prototype.evilWorld=function(){
	this.isEvil = ((g_Level.evilViewport.x)) < ((this.position.x) - g_Level.viewport.x) ? false : ((this.position.x-g_Level.viewport.x) > playWidth || (this.position.x+this.size.x)-g_Level.viewport.x <= 0 || (this.position.y+this.size.y)-g_Level.viewport.y<= 0 || (this.position.y-g_Level.viewport.y >= playHeight+g_Level.viewport.y)) ? false : true;
};
LevelObject.prototype.Die=function(){
	this.collision = false;
	this.dead = true;
	this.trigger = false;
};

LevelObject.prototype.Smash=function(){
	g_Level.shake=true;
	if(this.children[0]){ this.children[0].Spawn({x: this.position.x + (this.size.x/2), y:this.position.y + (this.size.y/2)}); sounds.explosion.play(); }
	for(var i=0,len=this.particles.length; i < len; i++)this.particles[i].Alive({x:(this.position.x+(this.size.x/2)), y:(this.position.y+(this.size.y/2))});
	this.Die();
};

LevelObject.prototype.Render=function(){

	if(this.children.length){
		ctx.globalCompositeOperation = "lighter";
		for(var i = 0, len = this.children.length; i < len; i++)this.children[i].Render();
		ctx.globalCompositeOperation = "source-over";
	}

	if( !Arena.spriteSheets['objectsbad'].img || !Arena.spriteSheets['objectsgood'].img || !Arena.spriteSheets['objectsbad'].spritesLoaded || !Arena.spriteSheets['objectsgood'].spritesLoaded || this.dead  || !this.inView)return;
	
	if(debug&&this.collision){
		ctx.strokeStyle='#0000ff';
		ctx.strokeRect(this.position.x-g_Level.viewport.x,this.position.y-g_Level.viewport.y,this.size.x,this.size.y);
	}

	ctx.drawImage(Arena.spriteSheets['objectsgood'].img, this.dest.x, this.dest.y, this.size.x,this.size.y, (this.position.x - g_Level.viewport.x - g_Level.shakeViewport.x), this.position.y - g_Level.viewport.y - g_Level.shakeViewport.y, this.size.x,this.size.y);

	for(var i = 0, len = this.lights.length; i < len; i++)this.lights[i].Render();
	//return;
};

LevelObject.prototype.RenderEvil=function(){
	for(var i = 0, len = this.children.length; i < len; i++)if(this.children[i].RenderEvil)this.children[i].RenderEvil();
		
	if(!Arena.spriteSheets['objectsbad'].img || !Arena.spriteSheets['objectsbad'].spritesLoaded || !this.isEvil || this.dead || !this.inView)return false;
	this.evilPosition.x = (((g_Level.evilViewport.x)) - ((this.position.x) - g_Level.viewport.x));
	this.evilPosition.y = this.size.y;
	if(this.evilPosition.x >= this.size.x){this.evilPosition.x = this.size.x;}
	if(this.evilPosition.x <= 0)this.evilPosition.x = 0.1;
	//this.imageWidth = (this.size.x-this.evilPosition.x);
	//if(this.imageWidth&&this.srcImageWidth)ctx.drawImage(Arena.spriteSheets['objectsbad'].img,(this.size.x)+this.evilPosition.x,(this.size.y),this.srcImageWidth,this.size.y, ((this.position.x+this.evilPosition.x) - g_Level.viewport.x) - g_Level.shakeViewport.x, (this.position.y - g_Level.viewport.y) - g_Level.shakeViewport.y, this.imageWidth, this.size.y);	
	
	if(this.evilPosition.x)oCtx.drawImage(Arena.spriteSheets['objectsbad'].img, (this.dest.x) , (this.dest.y) , this.evilPosition.x ,this.size.y, (this.position.x - g_Level.viewport.x - g_Level.shakeViewport.x), this.position.y - g_Level.viewport.y - g_Level.shakeViewport.y, this.evilPosition.x,this.size.y);

};

LevelObject.prototype.createParticle=function(){
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
				delay:0
			}));
			this.particles.push(this.children[this.children.length-1]);
		};
	};
};

LevelObject.prototype.createExplosion=function(){
	this.children.push( new Explosion() );
};

LevelObject.prototype.Spawn=function(_position){
	for(var i = 0, len = this.children.length; i<len;i++)this.children[i].Restart();
	this.position.x = _position;
	this.dead = false;
	this.collision = true;
	this.position.y = scrollHeight - (Arena.TILESIZE) - (this.size.y);
};



