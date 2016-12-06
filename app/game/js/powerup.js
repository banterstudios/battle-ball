function Powerup(_opts){

	this.position = new Vector( _opts&&_opts.x || 0, _opts&& _opts.y || 0);

	this.size = new Vector( _opts&&_opts.w || 0,  _opts&&_opts.h || 0);
	this.bbox = new Vector( _opts&&_opts.bx ||  _opts&&_opts.w,  _opts&&_opts.by ||  _opts&&_opts.h);
	this.dest = new Vector( _opts&&_opts.dx || 0,  _opts&&_opts.dy || 0);
	this.inView = false;
	this.collision = true;
	this.layer = 12;
	this.active = false;
	this.isFg = true;
	//this.items = [];
	this.lights = [];
};

Powerup.prototype.Restart=function(){
	this.Die();
	for(var i = 0, len = this.lights.length; i < len; i++)this.lights[i].Restart();
}
Powerup.prototype.Die=function(){
	this.collision = false;
	this.inView = false;
	this.active = false;
};
Powerup.prototype.Render=function(){
	if(!Arena.spriteSheets['goodtiles'] || !Arena.spriteSheets['goodtiles'].img || !Arena.spriteSheets['goodtiles'].spritesLoaded || !this.inView || !this.active )return false;
	for(var i = 0, len = this.lights.length; i<len; i++)this.lights[i].Render();
	ctx.drawImage(Arena.spriteSheets['goodtiles'].img, this.dest.x, this.dest.y, this.size.x,this.size.y, (this.position.x - g_Level.viewport.x - g_Level.shakeViewport.x), this.position.y - g_Level.viewport.y - g_Level.shakeViewport.y, this.size.x,this.size.y);
};
Powerup.prototype.Update=function(_offset){
	
	if((this.position.x+this.size.x)-g_Level.viewport.x <= 0 || !this.active){
		this.inView = false; this.active = false; return false;
	}else
	if(((this.position.x)-g_Level.viewport.x) >= (playWidth+this.size.x)){ this.inView = false; return false;}

	if(!this.inView)this.inView = true;
	if(!this.collision)this.collision = true;


	for(var i = 0, len = this.lights.length; i<len; i++)this.lights[i].Update(this.position.x,this.position.y,this.size.x,this.size.y);

	return true;

};
Powerup.prototype.createLights=function(ox,oy){
	this.lights.push( new Light({imageName:'goodtiles',rotate:true,lox:ox,loy:oy, compositeOperation:'overlay' , flicker:Light.FLICKER.INITIAL, w:59, h:60,dx:160, dy:416,name:'poweruplight'}) );
};
Powerup.prototype.Trigger=function(obj){
	var self = this;

	if(obj.type==='Player'){
		if(this.type==='BazookaPowerUp'){this.Die(); g_Player.powerUp(Character.POWERUPS[g_Player.type].BAZOOKA); }
		if(this.type==='BoozePowerUp'){this.Die(); g_Player.powerUp(Character.POWERUPS[g_Player.type].BOOZE); }
		if(this.type==='BikePowerUp'){this.Die(); /*g_Player.powerUp(Character.POWERUPS[g_Player.type].BIKE);*/ g_Level.setHouseLevel(Math.round(Math.random() * (60-40)+40)); }
		if(this.type==='SnowMobilePowerUp'){this.Die(); g_Player.powerUp(Character.POWERUPS[g_Player.type].SNOWMOBILE); }
	}

};
Powerup.prototype.Spawn=function(_oPositionX, _oPositionY){

	this.position.x = _oPositionX ? _oPositionX : (g_Level.viewport.x + (playWidth));
	this.position.y = _oPositionY ? (_oPositionY - this.size.y - 1) : scrollHeight-(Arena.TILESIZE*2);
	this.active = true;
	this.collision = true;

	for(var i = 0, len = g_Level.collisionChildren.length; i < len; i++){
		//if(!g_Level.collisionChildren[i].inView)continue;
		if(boundingBoxCollision(this,g_Level.collisionChildren[i],{x:this.position.x, y:this.position.y}, true)){
		
		if(g_Level.collisionChildren[i]!==this&&g_Level.collisionChildren[i].type==='BoozePowerUp' ||
		   g_Level.collisionChildren[i]!==this&&g_Level.collisionChildren[i].type==='BikePowerUp' || 
		   g_Level.collisionChildren[i]!==this&&g_Level.collisionChildren[i].type==='SnowMobilePowerUp' ||
		   g_Level.collisionChildren[i]!==this&&g_Level.collisionChildren[i].type==='BazookaPowerUp'){
			//this.position.x = g_Level.collisionChildren[i].position.x + g_Level.collisionChildren[i].size.x + 1;
			this.position.y = g_Level.collisionChildren[i].position.y - this.size.y - 1;
			continue;
		}

		if(g_Level.collisionChildren[i]===this || g_Level.collisionChildren[i].type==='Deer' || g_Level.collisionChildren[i].type==='Elf' || g_Level.collisionChildren[i].type==='CoinCollectable' )continue;
	
			this.position.y = g_Level.collisionChildren[i].position.y - this.size.y - 1;
			//break;
			continue;
		};

	};

};


