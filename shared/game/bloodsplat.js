function BloodSplat(_opts){
	Particle.call(this,_opts);

	this.type = 'BloodSplat';

};
BloodSplat.prototype = Object.create(Particle.prototype);
BloodSplat.prototype.constructor=BloodSplat;
BloodSplat.prototype.parent = Particle.prototype;

BloodSplat.prototype.Render=function(){
	if(!this.parent.Render.call(this))return false;
		ctx.globalAlpha = this.alpha;
		ctx.drawImage(Arena.spriteSheets['particlesgood'].img, this.dest.x, this.dest.y, this.srcsize.x,this.srcsize.y, this.position.x - g_Level.viewport.x - g_Level.shakeViewport.x, this.position.y - g_Level.viewport.y - g_Level.shakeViewport.y, this.size.x,this.size.y);
		ctx.globalAlpha = 1;
	/*this.alpha -= 0.04;
	this.size.x += 0.5;
	this.size.y += 0.5;*/
	if(this.alpha <= 0){ this.Die(); return true;}
};

BloodSplat.prototype.Update=function(){
	if(!this.parent.Update.call(this) || this.finished)return false;
	
	this.active=true;
};