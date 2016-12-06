function Bullet(_opts){
	var self = this;
	this._id = _opts.id || null;
	this.position = new Vector(_opts.x || 0,_opts.y || 0);
	this.size = new Vector(_opts.w || 0, _opts.h || 0);
	this.bbox = new Vector(_opts.bx || _opts.w, _opts.by || _opts.h);
	this.velocity = new Vector(_opts.velocity.x,_opts.velocity.y);
	this.inView = true;
	this.collision = true;
	this.dead = true;
	//this.type = this.constructor.name;
	this.layer = 2;
	this.strength = 0;
	this.items = [];
	this.angle = 0;
};

Bullet.prototype.Render=function(){
	if(!Arena.spriteSheets['bullets'][this.type].spritesLoaded || this.dead)return false;
	this.inView = true;

	//put in render function here!
	ctx.drawImage(Arena.spriteSheets['bullets'][this.type].img, this.position.x - g_Level.viewport.x - g_Level.shakeViewport.x, this.position.y - g_Level.viewport.y - g_Level.shakeViewport.y, this.size.x,this.size.y);
};

Bullet.prototype.checkCollision=function(_cp){

	//this.items = g_QuadTree.retrieve(this);

	for(var i = 0, len = g_Level.collisionChildren.length; i < len; i++){
		if(!g_Level.collisionChildren[i].inView || g_Level.collisionChildren[i].type==='Player')continue;
		if(boundingBoxCollision(this,g_Level.collisionChildren[i],_cp)){
			if(g_Level.collisionChildren[i].layer===5 || this.type==='GunBullet'&&g_Level.collisionChildren[i].layer!==11/*11 = enemies*/ ){continue;} //5 = roadbottom
			g_Level.collisionChildren[i].Trigger(this);
			if(this.type!=='BazookaBullet')return true;
		};
	};
	return false;

};
Bullet.prototype.Restart=function(){
	this.Die();
};
Bullet.prototype.Alive=function(_cp){
	this.position.x = _cp.x;
	this.position.y = _cp.y;
	this.dead = false;
	this.collision = true;
	this.inView = true;
	this.angle = _cp.angle || 0;
};
Bullet.prototype.Die=function(){
	this.dead=true;
	this.collision = false;
	this.inView = false;
	this.position.x = -1000;
	this.position.y = -1000;
};
Bullet.prototype.Update=function(){
	if(this.dead)return false;

	var speed =  g_Player.speedBoost ? g_Player.velocity.x : this.velocity.x;//Math.ceil((this.velocity.x));

	if((((this.position.x+speed)+(this.size.x*2))-g_Level.viewport.x) > playWidth || (this.position.x+this.size.x)-g_Level.viewport.x <= 0 || (this.position.y+this.size.y)<= 0 || (this.position.y >= playHeight+g_Level.viewport.y+256)){this.Die(); return;}
		
	for(var i = 0; i < speed; i++){
		if(this.checkCollision({x:(this.position.x + 1),y:this.position.y,side:Character.DIRECTIONS.RIGHT})){
			if(this.type!=='BazookaBullet')this.Die();
		}
		/*this.position.x ++;*/
		this.position.x += Math.cos(this.angle) * 1;
		this.position.y += Math.sin(this.angle) * 1;
	}
};