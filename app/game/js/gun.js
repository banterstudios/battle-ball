function Gun(_opts){
	var self = this;
	this._id = _opts.id || null;
	this.position = new Vector(_opts.x || 0,_opts.y || 0);
	this.size = new Vector(_opts.w || 0, _opts.h || 0);
	this.velocity = new Vector(_opts.velocity.x,_opts.velocity.y);
	this.inView = true;
	this.collision = false;
	//this.type = this.constructor.name;
	this.layer = -1;
	this.notinuse = _opts.notinuse || true;
	this.offset = _opts.offset || {x:0,y:0};
	this.image = null;

	this.currentState = Gun.MUZZLES[_opts.type].IDLE;

	this.frameDelay = 0;
	this.frameDelayAmount = 1;
	this.currentFrameX = this.currentState.start.x;
	this.currentFrameY = this.currentState.end.x;
	this.maxFrameY = this.currentState.end.y;
	this.maxFrameX = this.currentState.start.y;

	this.particles = [];
	this.createParticles();
};
Gun.MUZZLES = {
	MachineGun:{
		IDLE:{start:{x:0, y:0}, end:{x:0,y:0},size:{x:32,y:32},moffset:{x:0,y:0},offset:{x:96,y:0}, name:'MachineGunIdle'},
		FIRE:{start:{x:0, y:3}, end:{x:0,y:0},size:{x:32,y:32},moffset:{x:-2,y:3},offset:{x:0,y:0}, name:'MachineGunFire'},
	},
	Bazooka:{
		IDLE:{start:{x:0, y:0}, end:{x:0,y:0},size:{x:32,y:32},moffset:{x:0,y:0},offset:{x:96,y:0}, name:'BazookaIdle'},
		FIRE:{start:{x:0, y:3}, end:{x:0,y:0},size:{x:32,y:32},moffset:{x:-3,y:10},offset:{x:0,y:0}, name:'BazookeFire'},
	},
};

Gun.prototype.Shoot=function(){
	//for(var i = 0; i < this.particles.length; i++){
		this.particles[Math.round(Math.random() * (this.particles.length-1))].Alive({x:(this.position.x), y:(this.position.y)});
	//}
};
Gun.prototype.createParticles=function(){
	var ii = 0;
	for(var i = 0; i < 20; i++){
		var _angle = (Math.random() * (360)) >> 0;
		this.particles.push(new GunParticle({
			id:Math.random(),
			x:-1000,
			y:-1000,
			w:32,
			h:32,
			sw:32,
			sh:32,
			velocity:{x:(Math.random()*(2-1)+1),y:((4))},
			angle:_angle,
			dx:(ii*32),
			dy:128,
			delay:i === 0 ? 0 : Math.round(i/20)
		}));

		ii++;
		if(ii >= 4)ii=0;
	};
};


Gun.prototype.switchMuzzle=function(_e,_override){
	if(!_override&&this.currentState === _e)return;

	this.currentState = _e;
	this.currentFrameX = this.currentState.start.x;
	this.currentFrameY = this.currentState.end.x;
	this.maxFrameX = this.currentState.start.y;
	this.maxFrameY = this.currentState.end.y;
	this.frameDelay = 0;
};	

Gun.prototype.animate=function(){
	if(this.frameDelay++ > this.frameDelayAmount)
	{
		this.frameDelay = 0;
		this.currentFrameX++;
		if(this.currentFrameX >= this.maxFrameX)
		{	
			this.currentFrameX = this.currentState.start.x;
		}
	}
}

Gun.prototype.Restart=function(){
	this.notinuse=true;
	this.switchMuzzle(Gun.MUZZLES[this.type].IDLE);
	for(var i=0, len = this.particles.length;i<len;i++){this.particles[i].Restart();}
};
Gun.prototype.Update=function(){
	this.position.x = g_Player.position.x+this.offset.x;
	this.position.y = g_Player.position.y+this.offset.y;

	for(var i = 0, len = this.particles.length; i < len; i++){
			this.particles[i].Update();
		}

};
Gun.prototype.Render=function(){
	for(var i = 0, len = this.particles.length; i < len; i++){
		this.particles[i].Render();
	}
};