
function Character(_opts){
	var self = this;
	this._id = _opts.id || null;
	
	this.position = new Vector(_opts.x || 0,_opts.y || 0);
	this.size = new Vector(_opts.w || 0, _opts.h || 0);
	this.srcsize = new Vector(_opts.sw || 0, _opts.sh || 0);
	this.bbox = new Vector(_opts.bx || _opts.w, _opts.by || _opts.h);
	this.velocity = new Vector(_opts.velocity.x,_opts.velocity.y);
	this.initialVelocity = new Vector(_opts.velocity.x,_opts.velocity.y);
	this.evilPosition = new Vector(0,0);
	this.inView = true;
	this.collision = true;
	this.isJumping = false;
	this.isDoubleJump = false;

	this.isGrounded = false;
	this.isRunning=_opts.running || false;
	this.dead = false;
	this.active = false;

	//this.type = this.constructor.name;
	
	this.offset = _opts.offset || 0;
	this.frameDelay = 0;
	/*this.frameDelayAmount = 3;*/

	/*this.oldState = _opts.state;*/
	this.currentState = _opts.state;
	this.currentFrameX = this.currentState.start.x;
	this.currentFrameY = this.currentState.end.x;
	this.maxFrameX = this.currentState.start.y;
	this.maxFrameY = this.currentState.end.y;

	this.direction = Character.DIRECTIONS.RIGHT;
	this.health = 100;
	this.maxhealth = 100;
	this.speedBoost = false;

	this.accelleration = 0;
	
	
	this.layer = 1;
	this.isEvil = false;
	this.isHit = false;
	this.particles = [];

	this.tempW = this.size.x;
	this.tempSrcX = this.srcsize.x;

	this.srcImageWidth = 0;
	this.imageWidth = 0;

	this.items = [];

	this.lights = [];

	this.createParticles(_opts.type);
	//this.createLights();

	this.hitHole = false;
	this.dontCheckBottomRoad = false;

	this.isFalling = false;

	this.jumpTime = 0;

	//this.noHitAmount = 300;
	//this.noHitTimer = 0;

};
/*
==========
STATIC
==========
*/
Character.gravity = 0.2;
Character.offset = 8;
Character.states = {
	Player:{
		INITIAL:{start:{x:0, y:0}/*CURFRAMEX*/, end:{x:0,y:0}/*CURFRAMEY*/,bx:32,by:32,sw:32,sh:32,w:32,h:32,offset:{x:(/*32*4*/160),y:0}, name:'INITIAL', frameDelayAmount:3},
		IDLE:{start:{x:0, y:0}/*CURFRAMEX*/, end:{x:0,y:0}/*CURFRAMEY*/,bx:32,by:32,sw:32,sh:32,w:32,h:32,offset:{x:(/*32*4*/160),y:0}, name:'IDLE', frameDelayAmount:3},
		RUNNING:{start:{x:0, y:2}/*CURFRAMEX*/, end:{x:0,y:0}/*CURFRAMEY*/,bx:32,by:32,sw:39,sh:32,w:39,h:32,offset:{x:0,y:0}, name:'RUNNING', frameDelayAmount:5},
		
		RUNNINGBAZOOKA:{start:{x:0, y:2}/*CURFRAMEX*/, end:{x:0,y:0}/*CURFRAMEY*/,bx:32,by:32,sw:40,sh:32,w:40,h:32,offset:{x:78,y:0}, name:'RUNNING BAZOOKA', frameDelayAmount:3},
		
		JUMPING:{start:{x:0, y:0}/*CURFRAMEX*/, end:{x:0,y:0}/*CURFRAMEY*/,bx:32,by:32,sw:39,sh:32,w:39,h:32,offset:{x:(/*32*4*/0),y:0}, name:'JUMPING', frameDelayAmount:3},
		JUMPINGBAZOOKA:{start:{x:0, y:0}/*CURFRAMEX*/, end:{x:0,y:0}/*CURFRAMEY*/,bx:32,by:32,sw:40,sh:32,w:40,h:32,offset:{x:(78),y:0}, name:'JUMPINGBAZOOKA', frameDelayAmount:3},
		

		FALLING:{start:{x:0, y:0}/*CURFRAMEX*/, end:{x:0,y:0}/*CURFRAMEY*/,bx:32,by:32,sw:39,sh:32,w:39,h:32,offset:{x:(/*32*4*/39),y:0}, name:'FALLING', frameDelayAmount:3},
		FALLINGBAZOOKA:{start:{x:0, y:0}/*CURFRAMEX*/, end:{x:0,y:0}/*CURFRAMEY*/,bx:32,by:32,sw:40,sh:32,w:40,h:32,offset:{x:(118),y:0}, name:'FALLINGBAZOOKA', frameDelayAmount:3},
		

		DEAD:{start:{x:1, y:0}, end:{x:0,y:0},bx:32,by:32,sw:32,sh:32,w:32,h:32,offset:{x:0,y:0}, frameDelayAmount:3},
		SHOOT:{start:{x:1, y:0}, end:{x:0,y:0}, bx:32,by:32,sw:32,sh:32,w:32,h:32,offset:{x:32,y:0}, frameDelayAmount:3},
		BIKE:{start:{x:0, y:0}, end:{x:0,y:0}, bx:32,by:32,sw:54,sh:41,w:54,h:41,offset:{x:192,y:0}, frameDelayAmount:3},
		SNOWMOBILE:{start:{x:0, y:0}, end:{x:0,y:0}, bx:32,by:32,sw:56,sh:41,w:56,h:41,offset:{x:160,y:55}, frameDelayAmount:3}
	},
	Deer:{
		INITIAL:{start:{x:0, y:0}, end:{x:0,y:0},bx:45,by:43,sw:45,sh:43,w:45,h:43,offset:{x:0,y:34}, frameDelayAmount:3},
		IDLE:{start:{x:0, y:0}, end:{x:0,y:0},bx:45,by:43,sw:45,sh:43,w:45,h:43,offset:{x:0,y:34}, frameDelayAmount:3},
		RUNNING:{start:{x:0, y:2}, end:{x:0,y:0},bx:45,by:43,sw:45,sh:43,w:45,h:43,offset:{x:45,y:34}, frameDelayAmount:4,dimensions:{0:{bx:45,by:43,sw:45,sh:43,w:45,h:43},1:{bx:55,by:43,sw:55,sh:43,w:55,h:43}}},
		DEAD:{start:{x:0, y:0}, end:{x:0,y:0},bx:45,by:43,sw:45,sh:43,w:45,h:43,offset:{x:0,y:34}, frameDelayAmount:3},
		JUMPING:{start:{x:0, y:0}, end:{x:0,y:0},bx:45,by:43,sw:45,sh:43,w:45,h:43,offset:{x:45,y:34}, frameDelayAmount:3},
		FALLING:{start:{x:0, y:0}, end:{x:0,y:0},bx:45,by:43,sw:45,sh:43,w:45,h:43,offset:{x:45,y:34}, frameDelayAmount:3}
	},
	Elf:{
		INITIAL:{start:{x:0, y:0}, end:{x:0,y:0},bx:32,by:32,sw:32,sh:32,w:32,h:32,offset:{x:0,y:96}, frameDelayAmount:3},
		IDLE:{start:{x:0, y:0}, end:{x:0,y:0},bx:32,by:32,sw:32,sh:32,w:32,h:32,offset:{x:0,y:96}, frameDelayAmount:3},
		RUNNING:{start:{x:0, y:3}, end:{x:0,y:0},bx:32,by:32,sw:32,sh:32,w:32,h:32,offset:{x:32,y:96}, frameDelayAmount:3},
		DEAD:{start:{x:1, y:0}, end:{x:0,y:0},bx:32,by:32,sw:32,sh:32,w:32,h:32,offset:{x:0,y:96}, frameDelayAmount:3},
		JUMPING:{start:{x:0, y:0}, end:{x:0,y:0},bx:32,by:32,sw:32,sh:32,w:32,h:32,offset:{x:64,y:96}, frameDelayAmount:3},
		FALLING:{start:{x:0, y:0}, end:{x:0,y:0},bx:32,by:32,sw:32,sh:32,w:32,h:32,offset:{x:64,y:96}, frameDelayAmount:3}
	}
};


/*RUNNING:{
			start:{x:0, y:2}, 
			end:{x:0,y:0},
			dimensions:{0:{bx:45,by:43,sw:45,sh:43,w:45,h:43},1:{bx:55,by:43,sw:55,sh:43,w:55,h:43}}
			offset:{
				0:{x:45,y:32},
				1:{x:45,y:32}
			}
		},*/



Character.DIRECTIONS = {
	LEFT:0,
	RIGHT:1,
	UP:2,
	DOWN:3
};
Character.ENEMYLOGIC = {
	JUMP:0,
	INVULNERABLE:1
};

Character.GUNS = {
	machinegun:{obj:null,id:1},
	bazooka:{obj:null,id:2}
};

Character.POWERUPS = {
	Player:{
		BIKE:{
			id:1,
			ballistic:null,
			target:null,
			Action:function(obj){
				obj.switchState(Character.states[obj.type].BIKE);
				obj.speedBoost = true;
				obj.collision = false;
				obj.powerUpState = Character.POWERUPS.Player.BIKE;
				obj.initialVelocity.x = obj.velocity.x;
				obj.initialVelocity.y = 0;

				// this.characterNow = 0;
				// this.characterThen = 0;
				// this.characterDelta = 0; 

				//obj.velocity.x = 20;
				//obj.velocity.y = 11;
				Character.POWERUPS.Player.BIKE.ballistic = new Trajectory(g_Level.houses[0],obj);
				obj.lockViewportOnMove = true;
				//Character.POWERUPS.Player.BIKE.target = g_Level.houses[0];
				
			},
			Update:function(obj){

			/*	var _c = Character.POWERUPS.Player.BIKE.ballistic.Update(obj);
				if(_c){
					g_Level.viewport.y = 136;
					g_Level.shake = true;
					obj.collision = true;
					obj.switchState(Character.states[obj.type].RUNNING);
					obj.powerUpState = Character.POWERUPS.Player.INITIAL;
					obj.velocity.x = obj.initialVelocity.x; obj.velocity.y = 0;
					obj.speedBoost = false;
					obj.explosionFromVehicle.Spawn({x: obj.position.x + (obj.size.x/2), y:obj.position.y + (obj.size.y/2)}); sounds.explosion.play();

					return true;
				}*/

				if(!obj.speedBoost){
					g_Level.viewport.y = 136;
					g_Level.shake = true;
					obj.collision = true;
					obj.switchState(Character.states[obj.type].RUNNING);
					obj.powerUpState = Character.POWERUPS.Player.INITIAL;
					obj.velocity.x = obj.initialVelocity.x; obj.velocity.y = 0;

					obj.explosionFromVehicle.Spawn({x: obj.position.x + (obj.size.x/2), y:obj.position.y + (obj.size.y/2)}); sounds.explosion.play();

					return true;
				};
				if(obj.velocity.y <= 0){obj.collision = true;}

				//g_Level.UpdateViewport();
				//g_Level.lockUpdateViewport();
				g_Level.decreaseEvilViewport();
			}
		},
		SNOWMOBILE:{
			id:2,
			ballistic:null,
			target:{position:{x:0,y:0}},
			Action:function(obj){
				obj.switchState(Character.states[obj.type].SNOWMOBILE);
				obj.speedBoost = true;
				obj.collision = false;
				obj.powerUpState = Character.POWERUPS.Player.SNOWMOBILE;
				obj.initialVelocity.x = obj.velocity.x;
				obj.initialVelocity.y = 0;

				obj.velocity.x += 5;
				obj.velocity.y = obj.velocity.x;
				/*Character.POWERUPS.Player.SNOWMOBILE.target.position.x = g_Player.position.x + (playWidth/2);
				Character.POWERUPS.Player.SNOWMOBILE.target.position.y =  g_Player.position.y - (Arena.TILESIZE);
				Character.POWERUPS.Player.SNOWMOBILE.ballistic = new Trajectory(Character.POWERUPS.Player.SNOWMOBILE.target,obj);*/
				
				obj.lockViewportOnMove = true;
			},
			Update:function(obj){

				/*var _c = Character.POWERUPS.Player.SNOWMOBILE.ballistic.Update(obj);
				if(_c){
					g_Level.viewport.y = 335;
					g_Level.shake = true;
					obj.collision = true;
					obj.switchState(Character.states[obj.type].RUNNING);
					obj.powerUpState = Character.POWERUPS.Player.INITIAL;
					obj.velocity.x = obj.initialVelocity.x; obj.velocity.y = 0;
					obj.speedBoost = false;
					obj.explosionFromVehicle.Spawn({x: obj.position.x + (obj.size.x/2), y:obj.position.y + (obj.size.y/2)}); sounds.explosion.play();

					return true;
				}

				if(!obj.speedBoost){
					g_Level.viewport.y = 136;
					g_Level.shake = true;
					obj.collision = true;
					obj.switchState(Character.states[obj.type].RUNNING);
					obj.powerUpState = Character.POWERUPS.Player.INITIAL;
					obj.velocity.x = obj.initialVelocity.x; obj.velocity.y = 0;

					obj.explosionFromVehicle.Spawn({x: obj.position.x + (obj.size.x/2), y:obj.position.y + (obj.size.y/2)}); sounds.explosion.play();

					return true;
				};
				if(obj.velocity.y <= 0){obj.collision = true;}

				g_Level.UpdateViewport();
				g_Level.lockUpdateViewport();
				g_Level.decreaseEvilViewport();
				*/

				if(!obj.speedBoost){
					g_Level.viewport.y = 335;
					g_Level.shake = true;
					obj.collision = true;
					obj.switchState(Character.states[obj.type].RUNNING);
					obj.powerUpState = Character.POWERUPS.Player.INITIAL;
					obj.velocity.x = obj.initialVelocity.x; obj.velocity.y = 0;

					obj.explosionFromVehicle.Spawn({x: obj.position.x + (obj.size.x/2), y:obj.position.y + (obj.size.y/2)}); sounds.explosion.play();

					return true;
				};
				if(obj.velocity.y <= 0){obj.collision = true;}
				//g_Level.lockUpdateViewport();
				g_Level.decreaseEvilViewport();
			}
		},
		BAZOOKA:{
			Action:function(obj){
				obj.AddBazookaToInventory();
				//DONT NEED THIS AS IT DOESNT REQUIRE AN UPDATE!//obj.powerUpState = Character.POWERUPS.Player.BAZOOKA;
			}
		},
		BOOZE:{
			Action:function(obj){
				obj.increaseHealth(20);
			}
		},
		INITIAL:{
			id:0
		}
	},
	Deer:{
		INITIAL:{
			id:0
		}
	},
	Elf:{
		INITIAL:{
			id:0
		}
	}
};

Character.RandomEnemy=function(){
	return (Math.round(Math.random() * (1))) === 0 ? new Deer({x:-1000,y:-1000}) : new Elf({x:-1000,y:-1000});
}

/*
==========
VARIABLES
==========
*/


/*
========
FUNCS
========
*/
Character.prototype.Restart=function(){
	this.accelleration = 0;
	this.jumpTime = 0;
	this.isFalling = false;
	this.isJumping = false;
	this.isDoubleJump = false;
	this.isGrounded = false;
	this.direction = Character.DIRECTIONS.RIGHT;
	this.dead = false;
	this.health = 100;
	this.active = false;
	this.speedBoost = false;
	this.powerUpState = Character.POWERUPS[this.type].INITIAL;
	this.collision = true;
	this.hitHole = false;
	this.dontCheckBottomRoad = false;
	for(var i=0, len = this.particles.length;i<len;i++){this.particles[i].Restart();}
}

Character.prototype.switchState=function(_e,_override){
	if(!_override&&this.currentState === _e || !_override&&this.currentState===Character.states[this.type].DEAD)return;
	// this.oldState = this.currentState;
	this.currentState = _e;
	this.currentFrameX = this.currentState.start.x;
	this.currentFrameY = this.currentState.end.x;
	this.maxFrameX = this.currentState.start.y;
	this.maxFrameY = this.currentState.end.y;

	this.bbox.x = this.currentState.bx;
	this.bbox.y = this.currentState.bx;
	this.srcsize.x = this.currentState.sw;
	this.srcsize.y = this.currentState.sh;
	this.size.x = this.currentState.w;
	this.size.y = this.currentState.h;
	this.frameDelay = 0;
};	
Character.prototype.animate=function(){
	if(this.frameDelay++ > /*this.frameDelayAmount*/this.currentState.frameDelayAmount)
	{
		this.frameDelay = 0;
		this.currentFrameX++;
		if(this.currentFrameX >= this.maxFrameX)
		{	
			this.currentFrameX = this.currentState.start.x;
		}
	}
}
Character.prototype.checkCollision=function(_cp){
	
	//this.items = g_QuadTree.retrieve(this);

	for(var i = 0, len = g_Level.collisionChildren.length; i < len; i++){
		if(!g_Level.collisionChildren[i].inView)continue;
		if(this.type==='Deer'&&g_Level.collisionChildren[i].enemylayer!==10 || this.type==='Elf'&&g_Level.collisionChildren[i].enemylayer!==10)continue;
		
		if(boundingBoxCollision(this,g_Level.collisionChildren[i],_cp)){

			if(_cp.side===Character.DIRECTIONS.DOWN && this.isFalling && this.type==='Player'&&!this.speedBoost&&g_Level.collisionChildren[i].type==='Deer'&&((this.position.y+this.bbox.y)<=(g_Level.collisionChildren[i].position.y)) ||
				_cp.side===Character.DIRECTIONS.DOWN && this.isFalling && this.type==='Player'&&!this.speedBoost&&g_Level.collisionChildren[i].type==='Elf'&&((this.position.y+this.bbox.y)<=(g_Level.collisionChildren[i].position.y))){g_Level.collisionChildren[i].collision = false; g_Level.collisionChildren[i].health = 0; g_Level.collisionChildren[i].Trigger(g_Level.collisionChildren[i]); continue; }

			if(this.type==='Player'&&!this.speedBoost || this.type==='Elf' || this.type==='Deer'){ g_Level.collisionChildren[i].Trigger(this,{direction:_cp.side}); }
			if(g_Level.collisionChildren[i].type!=='Deer'&&g_Level.collisionChildren[i].type!=='Elf'&&this.type==='Player'&&g_Level.collisionChildren[i].layer!==12 || this.type!=='Player')return (g_Level.collisionChildren[i]);
		}
	};
	return false;
};
Character.prototype.Jump=function(){
	if(this.dead || !this.isJumping || this.isJumping&&!this.isGrounded  ||  this.speedBoost)return;
	this.velocity.y = 3;
	this.isGrounded =false;
	this.jumpTime = 12;
	this.accelleration = -0.4;
	sounds.jump.play();
};
Character.prototype.stopJump=function(){
	this.isJumping = false;
	this.accelleration = 0;
	this.jumpTime = 0;
};
Character.prototype.preventJump=function(){ 
	this.accelleration = 0;
	this.jumpTime = 0;
}

Character.prototype.Fall=function(){
	this.isFalling = true;
	if(!this.speedBoost)if(this.type==='Player'&&this.currentGun.obj.type==='Bazooka'){ this.switchState(Character.states[this.type].FALLINGBAZOOKA);}else{ this.switchState(Character.states[this.type].FALLING); }
}
Character.prototype.Update=function(){
	
	if(this.type==='Player')this.Jump();

	if((((this.position.x+this.size.x)-g_Level.viewport.x) <= 0)){this.active = false; this.inView=false; return false;}
	if(((this.position.x)-g_Level.viewport.x) >= (playWidth+this.size.x) ){this.inView=false; return false;}
	
	if(this.dead)return false;

	if(!this.inView)this.inView = true;
	if(!this.active)this.active=true;
	//if(!this.collision)this.collision=true;
	
	this.Gravity();

	if(this.lights.length){ 
		this.lights[0].position.x = (this.position.x+(this.size.x/2)) - (this.lights[0].size.x/2);
		this.lights[0].position.y = (this.position.y+(this.size.y/2)) - (this.lights[0].size.y/2);
	};
};
Character.prototype.Dead=function(){
	this.collision = false;
	
	this.dead=true;
	//this.active = false;

	this.isJumping=false;
	this.velocity.y = 0;
	/*for(var i = 0, len = this.particles.length; i < len; i++){
		this.particles[i].Alive({x:(this.position.x+(this.size.x/2)), y:(this.position.y+(this.size.y/2))});
	};*/
	this.spawnBloodParticles();

	/*if(this.type!=='Player')this.position.x = -1000;*/
};
Character.prototype.spawnBloodParticles=function(){
	for(var i = 0, len = this.particles.length; i < len; i++){
		this.particles[i].Alive({x:(this.position.x+(this.size.x/2)), y:(this.position.y+(this.size.y/2))});
	};
};
Character.prototype.Gravity=function(){
	/*this.velocity.y -= Character.gravity;*/
	
	if(this.isJumping){ this.jumpTime--;}
	if(this.jumpTime <= 0){this.preventJump();}
	this.velocity.y -= Character.gravity + this.accelleration;
	if(!this.speedBoost&&this.velocity.y >= 6)this.velocity.y = 6;

	if(this.velocity.y <= 0){
		if(!this.isGrounded)this.Fall();
		this.Down(this.velocity.y*-1);
	}else{
		this.Up(this.velocity.y);
	}
	return;
};	
Character.prototype.Up=function(_vel,no_update_position){

	var _c = this.checkCollision({x:this.position.x,y:(this.position.y-_vel), side:Character.DIRECTIONS.UP});
		if(_c){
			if(_c.layer!==12&&this.type==='Player'&&_c.type!=='Deer'&&_c.type!=='Elf' || this.type==='Deer' || this.type==='Elf'){
				this.velocity.y = 0; 
				if(this.lockViewportOnMove)this.lockViewportOnMove=false;
				return true;
			}
		}

		if(this.type==='Player'){ if(this.lockViewportOnMove){g_Level.lockUpdateViewport();} g_Level.UpdateViewport(); }
		if(!no_update_position)this.position.y -= _vel;

	/*var speed = Math.ceil(_vel);

	for(var i = 0; i < speed; i++){
		var _c = this.checkCollision({x:this.position.x,y:(this.position.y-1), side:Character.DIRECTIONS.UP});
		if(_c){
			if(_c.layer!==12&&this.type==='Player'&&_c.type!=='Deer'&&_c.type!=='Elf' || this.type==='Deer' || this.type==='Elf'){
				this.velocity.y = 0; 
				if(this.lockViewportOnMove)this.lockViewportOnMove=false;
				break;
			}
		}

		if(this.type==='Player'){ if(this.lockViewportOnMove){g_Level.lockUpdateViewport();} g_Level.UpdateViewport(); }
		this.position.y --;
	}	*/
};
Character.prototype.Down=function(_vel, no_update_position){
		if(this.position.y-g_Level.viewport.y >= playHeight){ this.health = 0; this.Trigger(this); return true; }
		
		var _c = this.checkCollision({x:this.position.x,y:(this.position.y+_vel), side:Character.DIRECTIONS.DOWN});
		if(_c){		
			
			if( _c.layer!==12&&this.type==='Player'&&_c.type!=='Deer'&&_c.type!=='Elf' || this.type==='Deer' || this.type==='Elf'){
				this.isFalling = false;
				if(this.speedBoost)this.speedBoost = false; this.isGrounded=true; if(this.type!=='Player')this.isJumping = false;  this.velocity.y = 0;
				if(this.lockViewportOnMove){ this.lockViewportOnMove=false; g_Level.viewport.y = 335; }
				return true;
			}
		}
		if(((this.position.y+_vel)) >= (scrollHeight-(Arena.TILESIZE*2))){ if(this.lockViewportOnMove){this.lockViewportOnMove=false;  g_Level.viewport.y = 335;} if(this.speedBoost)this.speedBoost = false; this.isGrounded=true; if(this.type!=='Player')this.isJumping = false; this.velocity.y = 0; this.isFalling = false; return true; }
		//if(this.hitHole){ if(this.lockViewportOnMove){this.lockViewportOnMove = false;}}
		this.isGrounded = false;
		if(this.type==='Player'){if(this.lockViewportOnMove){g_Level.lockUpdateViewport(); } g_Level.UpdateViewport();  }
		if(!no_update_position)this.position.y += _vel;

	/*var speed = Math.ceil(_vel);

	for(var i = 0; i < speed; i++){
		if(this.hitHole&&((this.position.y+this.size.y)>=scrollHeight)||this.position.y-g_Level.viewport.y >= playHeight){ this.health = 0; this.Trigger(this); return true; }
		var _c = this.checkCollision({x:this.position.x,y:(this.position.y+1), side:Character.DIRECTIONS.DOWN});
		if(_c){		
			
			if(!this.hitHole && _c.layer!==12&&this.type==='Player'&&_c.type!=='Deer'&&_c.type!=='Elf' || this.type==='Deer' || this.type==='Elf'){
				if(this.speedBoost)this.speedBoost = false; this.isGrounded=true; this.isJumping = false; this.isDoubleJump = false; this.velocity.y = 0;
				if(this.lockViewportOnMove){ this.lockViewportOnMove=false; }
				break;
			}
		}
		if(!this.hitHole && !this.dontCheckBottomRoad && ((this.position.y+1)) >= (scrollHeight-(Arena.TILESIZE*2))){ if(this.lockViewportOnMove)this.lockViewportOnMove=false; if(this.speedBoost)this.speedBoost = false; this.isGrounded=true; this.isJumping = false; this.isDoubleJump=false; this.velocity.y = 0; break; }
		if(this.hitHole){ if(this.lockViewportOnMove){this.lockViewportOnMove = false;}}
		this.isGrounded = false;
		if(this.type==='Player'){if(this.lockViewportOnMove){g_Level.lockUpdateViewport();} g_Level.UpdateViewport();  }
		this.position.y ++;
	}	*/
};
Character.prototype.Render=function(){
	if(!Arena.spriteSheets['charactergood'] || !Arena.spriteSheets['charactergood'].img || !Arena.spriteSheets['charactergood'].spritesLoaded || !this.inView || this.dead){return false;}
	
	this.animate();

	this.tempW = this.currentState.dimensions ? this.currentState.dimensions[this.currentFrameX].sw : this.size.x;
	this.tempSrcX = this.currentState.dimensions ? this.currentState.dimensions[this.currentFrameX].w : this.srcsize.x;


	if(!this.isEvil || this.type==='Player'){ 
		ctx.drawImage(Arena.spriteSheets['charactergood'].img,((this.srcsize.x)*this.currentFrameX)+this.currentState.offset.x,((this.srcsize.y)*this.currentFrameY)+this.currentState.offset.y,this.tempSrcX,this.srcsize.y, ((this.position.x - g_Level.viewport.x)) - g_Level.shakeViewport.x, ((this.position.y - g_Level.viewport.y)) - g_Level.shakeViewport.y, this.tempW, this.size.y); 
		return; 
	}

	if(!Arena.spriteSheets['characterbad'] || !Arena.spriteSheets['characterbad'].img || !Arena.spriteSheets['characterbad'].spritesLoaded){return false;}

	this.evilPosition.x = (((g_Level.evilViewport.x)) - ((this.position.x) - g_Level.viewport.x));

	if(this.evilPosition.x >= this.tempW)this.evilPosition.x = this.tempW;
	if(this.evilPosition.x <= 0)this.evilPosition.x = 0.1;
	

	this.srcImageWidth = (this.tempSrcX-this.evilPosition.x);
	this.imageWidth = (this.tempW-this.evilPosition.x);
	
	if(this.imageWidth&&this.srcImageWidth)ctx.drawImage(Arena.spriteSheets['charactergood'].img,(((this.srcsize.x)*this.currentFrameX)+this.currentState.offset.x)+this.evilPosition.x,((this.srcsize.y)*this.currentFrameY)+this.currentState.offset.y,this.srcImageWidth,this.srcsize.y, (((this.position.x+this.evilPosition.x) - g_Level.viewport.x) - g_Level.shakeViewport.x), ((this.position.y - g_Level.viewport.y) - g_Level.shakeViewport.y), this.imageWidth, this.size.y);	
	if(this.evilPosition.x)ctx.drawImage(Arena.spriteSheets['characterbad'].img, ((this.srcsize.x)*this.currentFrameX)+this.currentState.offset.x , ((this.srcsize.y)*this.currentFrameY)+this.currentState.offset.y , this.evilPosition.x ,this.size.y, ((this.position.x - g_Level.viewport.x) - g_Level.shakeViewport.x), ((this.position.y - g_Level.viewport.y) - g_Level.shakeViewport.y), this.evilPosition.x,this.size.y);
	
};

Character.prototype.createLights=function(){
	g_Level.lights.push(new Light({imageName:'playerlight', compositeOperation:'overlay' , flicker:Light.FLICKER.INITIAL, w:210, h:210,name:'Characterlight'}));				
	this.lights.push(g_Level.lights[g_Level.lights.length-1]);
};

Character.prototype.Trigger=function(obj){
	if(obj.type==='GunBullet'){
		this.health -= obj.strength;
		g_Level.decreaseEvilViewport(1);
	}else
	if(obj.type==='BazookaBullet'){
		this.health -= obj.strength;
		g_Level.decreaseEvilViewport(1);
	}else
	if(obj.type==='Deer'){
		//this.noHitTimer = 0;
		g_Level.catchPlayer(20);
		this.health -= obj.strength;
	}else
	if(obj.type==='Elf'){
		//this.noHitTimer = 0;
		g_Level.catchPlayer(20);
		this.health -= obj.strength;
	}else
	if(obj.type==='Missile'){
		//this.noHitTimer = 0;
		g_Level.catchPlayer(30);
		this.health -= obj.strength;
	}else
	if(obj.type==='Bin'||obj.type==='Car'||obj.type==='Suv'||obj.type==='Truck'||obj.type==='House'){
		g_Level.catchPlayer(10);
	}

};
Character.prototype.evilWorld=function(){
	this.isEvil = ((g_Level.evilViewport.x)) < ((this.position.x) - g_Level.viewport.x) ? false : ((this.position.x-g_Level.viewport.x) > playWidth || (this.position.x+this.size.x)-g_Level.viewport.x <= 0 || (this.position.y+this.size.y)-g_Level.viewport.y<= 0 || (this.position.y-g_Level.viewport.y >= playHeight+g_Level.viewport.y)) ? false : true;
};

Character.prototype.Spawn=function(_positionX){
	
	this.dead = false;
	this.collision = true;
	this.active=true;
	this.health = this.maxhealth;
	this.hitPlayer = false;

	this.position.x = _positionX;
	this.position.y = scrollHeight-(Arena.TILESIZE*2);//(g_Level.levels[g_Level.currentLevel].scrollHeight - (Arena.TILESIZE*2)) - 96 - (this.size.y);

	//this.items = g_QuadTree.retrieve(this);
	
	for(var i = 0, len = g_Level.collisionChildren.length; i < len; i++){
		if(g_Level.collisionChildren[i].enemylayer!==10 || g_Level.collisionChildren[i]===this || g_Level.collisionChildren[i].type==='Deer' || g_Level.collisionChildren[i].type==='Elf')continue;
			if(boundingBoxCollision(this,g_Level.collisionChildren[i],{x:this.position.x, y:this.position.y}, true)){
			this.position.y = g_Level.collisionChildren[i].position.y - this.size.y - 1;
		};
	};

	//this.velocity.x = Math.random() * ((g_Player.velocity.x/2)-(g_Player.velocity.x/4))+(g_Player.velocity.x/4) >> 0;
	//if(this.velocity.x < 5)this.velocity.x = 5;
	if(g_Utilities.currentState === '_1'){this.velocity.x = Math.round(Math.random() * (4-3)+3);}
	if(g_Utilities.currentState === '_2'){this.velocity.x = Math.round(Math.random() * (5-3)+3);}
	if(g_Utilities.currentState === '_3'){this.velocity.x = Math.round(Math.random() * (6-5)+5);}
};

Character.prototype.createParticles=function(_type){

	this.particles.push(new BloodSplat({
		id:Math.random(),
		x:-1000,
		y:-1000,
		w:32,
		h:32,
		sw:32,
		sh:32,
		velocity:{x:0,y:0},
		angle:0,
		dx:Math.round(Math.random() * (3-1)+1 ) * 32,
		dy:192,
		delay:0
	}));


	for(var i = 0, len = isMobile() ? 5 : 150; i < len; i++){
		var _angle = (Math.random() * (360)) >> 0;
		var rSize = Math.round(Math.random() * (10-5)+5);
		this.particles.push(new BloodParticle({
			id:Math.random(),
			x:-1000,
			y:-1000,
			w:rSize,
			h:rSize,
			sw:32,
			sh:32,
			velocity:{x:(Math.random()*(3-1)+1),y:(Math.random()*(3-1)+1)},
			angle:_angle,
			dx:((Math.random()*32) | 0),
			dy:192 + ((Math.random()*32) | 0),
			delay:0
		}));
	}
	for(var i = 0; i < 8; i++){
		var _angle = (Math.random() * (360)) >> 0;
		this.particles.push(new CharacterParticle({
			id:Math.random(),
			x:-1000,
			y:-1000,
			w:32,
			h:32,
			sw:32,
			sh:32,
			velocity:{x:(Math.random()*(5-2)+2),y:((5))},
			angle:_angle,
			dx:(i*32),
			dy:_type==='Deer' ? 96 : _type==='Elf' ? 64 : 32 ,
			delay:i === 0 ? 0 : Math.round(i/8)
		}));
	};
};

Character.prototype.increaseHealth=function(_amount){
	this.health += _amount;
	if(this.health >= this.maxhealth)this.health = this.maxhealth;
};

Character.prototype.generateCoins=function(_amount){
	for(var i = 0; i < _amount; i++){
		this.coins.push(new CoinCollectable());
	};
};


