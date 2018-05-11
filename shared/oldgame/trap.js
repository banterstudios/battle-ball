function Trap(_opts){
	this.position = new Vector(_opts&&_opts.x || -1000, _opts&&_opts.y || -1000);
	this.evilPosition = new Vector(0,0);
	this.size = new Vector(_opts&&_opts.w || 64, _opts&&_opts.h || 64);
	this.bbox = new Vector(_opts&&_opts.bx || this.size.x , _opts&&_opts.by || this.size.y);
	this.dest = new Vector(_opts&&_opts.dx || 0, _opts&&_opts.dy || 0);
	this.velocity = new Vector(0,0);
	this.inView = false;
	this.collision = true;
	this.active = false;
	this.dead = false;
	//this.type = this.constructor.name;
	this.layer=12;
	this.isFg =  true;
	this.delay = 0;
	this.strength = 0;
	this.currentDelay = 0;
	this.currentShakeDelay = 0;
	this.shakeDelay = 30;
	this.children = [];
	this.particles = [];

	this.indicatorPosition = new Vector(0,0);
	this.indicatorAngle = 0;
	this.offset = 0;
	this.isEvil = false;
};

Trap.prototype.Render=function(){

for(var i = 0, len = this.children.length; i < len; i++)this.children[i].Render();

if(!Arena.spriteSheets['traps'] || !Arena.spriteSheets['traps'].img || !Arena.spriteSheets['traps'].spritesLoaded || !this.inView || !this.active )return false;
	
	if(this.currentDelay < this.delay){
		ctx.drawImage(Arena.spriteSheets['traps'].img, 32, 0, 32,32 , this.indicatorPosition.x, (this.indicatorPosition.y) - g_Level.viewport.y - g_Level.shakeViewport.y , 32,32);
		return true;
	};

	if(this.currentShakeDelay < this.shakeDelay){
		ctx.drawImage(Arena.spriteSheets['traps'].img, 0, 0, 32,32 , this.indicatorPosition.x, (this.indicatorPosition.y) - g_Level.viewport.y - g_Level.shakeViewport.y , 32,32);
		return true;
	};
	
	ctx.drawImage(Arena.spriteSheets['traps'].img, this.dest.x, this.dest.y, this.size.x,this.size.y, (this.position.x - g_Level.viewport.x - g_Level.shakeViewport.x), this.position.y - g_Level.viewport.y - g_Level.shakeViewport.y, this.size.x,this.size.y);

};

Trap.prototype.evilWorld=function(){
	this.isEvil = ((g_Level.evilViewport.x)) < ((this.position.x) - g_Level.viewport.x) ? false : ((this.position.x-g_Level.viewport.x) > playWidth || (this.position.x+this.size.x)-g_Level.viewport.x <= 0 || (this.position.y+this.size.y)-g_Level.viewport.y<= 0 || (this.position.y-g_Level.viewport.y >= playHeight+g_Level.viewport.y)) ? false : true;
};


Trap.prototype.RenderEvil=function(){
	if(!Arena.spriteSheets['traps'].img || !Arena.spriteSheets['traps'].spritesLoaded  || !this.active || !this.inView || !this.isEvil)return false;
	
	this.evilPosition.x = (((g_Level.evilViewport.x)) - ((this.position.x) - g_Level.viewport.x));
	this.evilPosition.y = this.size.y;

	if(this.evilPosition.x >= this.size.x){this.evilPosition.x = this.size.x;}
	if(this.evilPosition.x <= 0)this.evilPosition.x = 0.1;
	
	var imageWidth = (this.size.x-this.evilPosition.x);
	//if(imageWidth)ctx.drawImage(Arena.spriteSheets['goodtiles'].img,(this.dest.x)+this.evilPosition.x,this.dest.y,imageWidth,this.size.y, ((this.position.x+this.evilPosition.x) - g_Level.viewport.x - g_Level.shakeViewport.x), this.position.y - g_Level.viewport.y - g_Level.shakeViewport.y, imageWidth, this.size.y);
	if(this.evilPosition.x)oCtx.drawImage(Arena.spriteSheets['traps'].img, (this.dest.x) , (this.dest.y) , this.evilPosition.x ,this.size.y, (this.position.x - g_Level.viewport.x - g_Level.shakeViewport.x), this.position.y - g_Level.viewport.y - g_Level.shakeViewport.y, this.evilPosition.x,this.size.y);
};

Trap.prototype.checkCollision=function(){
	//this.items = g_QuadTree.retrieve(this);
	for(var i = 0, len = g_Level.collisionChildren.length; i < len; i++){
		if(!g_Level.collisionChildren[i].inView)continue;
		if(g_Level.collisionChildren[i]!==g_Player)continue;
		if(boundingBoxCollision(this,g_Level.collisionChildren[i],{x:this.position.x, y:this.position.y})){
			g_Level.collisionChildren[i].Trigger(this,{direction:Character.DIRECTIONS.LEFT});
			return true;
		};
	};

	return false;
};

Trap.prototype.Update=function(){

	for(var i = 0, len = this.children.length; i < len; i++)this.children[i].Update();

	
	if(this.currentDelay++ < this.delay && this.active){
	 	this.position.x = (g_Level.viewport.x + (playWidth));
		this.position.y = g_Player.position.y + this.offset;
		this.indicatorPosition.x = playWidth-48;
		this.indicatorPosition.y = this.position.y;
		return false; 
	};

	if(this.currentShakeDelay++ < this.shakeDelay && this.active){
		this.position.x = (g_Level.viewport.x + (playWidth));
		this.indicatorAngle += (5 + Math.round(Math.random()%60)); //pick new angle 
    	this.indicatorPosition.x += (Math.sin(this.indicatorAngle) * 1);
    	this.indicatorPosition.y += (Math.cos(this.indicatorAngle) * 1);
   
		return false;
	};

	if(!this.active)return false;
	if((this.position.x+this.size.x)-g_Level.viewport.x <= 0){
		this.Die(); this.inView = false; return false;
	}else
	if(((this.position.x)-g_Level.viewport.x) >= (playWidth) /*|| (this.position.y+this.size.y)-g_Level.viewport.y<= 0 || (this.position.y-g_Level.viewport.y >= playHeight)*/){ /*this.inView = false; // DONT WANT TO CONFLICT INDICATORS*/ return false;}

	if(!this.inView)this.inView = true;
	if(!this.collision)this.collision = true;

	for(var i = 0, len = Math.floor(this.velocity.x); i < len; i++){
		if(this.checkCollision({x:(this.position.x - 1),y:this.position.y,side:Character.DIRECTIONS.LEFT})){
			this.Explode();
			return true;
		};
		this.position.x --;
	};

	this.evilWorld();
	
};

Trap.prototype.Explode=function(){
	g_Level.shake=true;
	if(this.children[0]){ this.children[0].Spawn({x: this.position.x + (this.size.x/2), y:this.position.y + (this.size.y/2)}); sounds.explosion.play(); }
	for(var i=0,len=this.particles.length; i < len; i++)this.particles[i].Alive({x:(this.position.x+(this.size.x/2)), y:(this.position.y+(this.size.y/2))});
	this.Die();
};
Trap.prototype.Trigger=function(obj){
};

Trap.prototype.createParticle=function(){
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

Trap.prototype.createExplosion=function(){
	this.children.push( new Explosion() );
};


Trap.prototype.Restart=function(){
	for(var i = 0, len = this.children.length; i < len; i++)this.children[i].Restart();
	this.Die();
}
Trap.prototype.Die=function(){
	this.collision = false;
	//this.inView = false;
	this.offset = 0;
	this.active = false;
	g_Level.spawningTraps = false;
};

Trap.prototype.Spawn=function(_delay, _offset, speed){
	for(var i = 0, len = this.children.length; i < len; i++)this.children[i].Restart();
	this.currentDelay = 0;
	this.currentShakeDelay = 0;
	this.indicatorAngle = 0;
	this.active = true;
	this.inView = true;
	this.delay = _delay;
	this.collision = true;
	this.velocity.x = speed > 4 ? 4 : speed;
	this.offset = _offset;
};