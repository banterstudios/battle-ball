function Bazooka(_opts){
	Gun.call(this, _opts);
	this.type = 'Bazooka';
};
Bazooka.prototype = Object.create(Gun.prototype);
Bazooka.prototype.constructor=Bazooka;
Bazooka.prototype.parent = Gun.prototype;

Bazooka.prototype.Render=function(){
	
	if(!Arena.spriteSheets['muzzles'].spritesLoaded || this.notinuse)return false;
	this.animate();
	ctx.drawImage(Arena.spriteSheets['muzzles'].img, ((this.currentState.size.x)*this.currentFrameX)+this.currentState.offset.x,((this.currentState.size.y)*this.currentFrameY)+this.currentState.offset.y,this.currentState.size.x,this.currentState.size.y, (Math.round(this.position.x)+this.size.x+this.currentState.moffset.x) - g_Level.viewport.x - g_Level.shakeViewport.x, (Math.round(this.position.y)+this.currentState.moffset.y) - g_Level.viewport.y - g_Level.shakeViewport.y, this.currentState.size.x,this.currentState.size.y);

	
	/*if(!Arena.spriteSheets['guns'].bazooka.spritesLoaded || this.notinuse)return false;

	this.parent.Render.call(this);
	
	this.inView = true;
	ctx.drawImage(Arena.spriteSheets['guns'].bazooka.img, Math.round(this.position.x - g_Level.viewport.x - g_Level.shakeViewport.x), Math.round(this.position.y - g_Level.viewport.y - g_Level.shakeViewport.y), this.size.x,this.size.y);
*/
}