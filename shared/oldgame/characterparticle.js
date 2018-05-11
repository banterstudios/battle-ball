function CharacterParticle(_opts){
	Particle.call(this,_opts);
	this.type = 'CharacterParticle';
	this.finished = false;
};
CharacterParticle.prototype = Object.create(Particle.prototype);
CharacterParticle.prototype.constructor=CharacterParticle;
CharacterParticle.prototype.parent = Particle.prototype;

CharacterParticle.prototype.Render=function(){
	if(!this.parent.Render.call(this))return false;
	ctx.drawImage(Arena.spriteSheets['particlesgood'].img, this.dest.x, this.dest.y, this.srcsize.x,this.srcsize.y, this.position.x - g_Level.viewport.x - g_Level.shakeViewport.x, this.position.y - g_Level.viewport.y - g_Level.shakeViewport.y, this.size.x,this.size.y);
};

CharacterParticle.prototype.Alive=function(_cp){
	this.finished = false;
	this.parent.Alive.call(this,_cp);
	var speed = Math.cos(Math.random() * Math.PI / 2) * 5;
	this.velocity.x = Math.cos(this.angle) * speed;
	this.velocity.y = Math.sin(this.angle) * speed;
}
CharacterParticle.prototype.Update=function(){
	if(!this.parent.Update.call(this) || this.finished)return false;
	
	this.active=true;
	
	this.velocity.y += Character.gravity;
	this.position.x += this.velocity.x;
	this.position.y += this.velocity.y;

	/*this.position.x += (Math.cos(this.angle) * this.velocity.x);

	this.velocity.y -= Character.gravity;
	if(this.velocity.y <= 0){
		this.position.y += (this.velocity.y*-1);
	}else{
		this.position.y -= (this.velocity.y);
	}*/
	
	if(this.position.y >= ((scrollHeight-Arena.TILESIZE))){ this.finished = true; return true; }



};
/*CharacterParticle.prototype.Alive=function(_cp){
	this.finished = false;
	this.parent.Alive.call(this,_cp);
};*/
