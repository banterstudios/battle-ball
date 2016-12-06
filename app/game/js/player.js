function Player(){
	Character.call(this, {
		id:Math.random(),
		x:32,
		y:scrollHeight-(Arena.TILESIZE*2),
		w:32,
		h:32,
		bx:32,
		by:32,
		sw:32,
		sh:32,
		offset:0,
		velocity:new Vector(1.5,0),
		state:Character.states['Player'].INITIAL,
		running:true,
		type:'Player'
	});
	this.type = 'Player';
	this.powerUpState = Character.POWERUPS['Player'].INITIAL;
	this.maxVelocity = new Vector(3.5,0);
	this.maxhealth = 100;
	this.gunbullets = [];
	this.bazookabullets = [];
	this.children = [];
	this.hasBazooka = false;
	this.currentGunBulletIndex = -1;
	this.currentBazookaBulletIndex = -1;
	this.createGuns();
	this.createBullets();

	this.changeWeapon(true);

	this.score = 0;
	this.currentDistance = 0;
	this.distance = 0;
	

	//x = coins , y: objects, z: enemies
	this.stepOffset = {x:300, y:1200, z:300};//new Vector(100,2000);

	this.checkstep = {x:this.position.x+this.stepOffset.x, y:this.position.x+this.stepOffset.y, z:this.position.x+this.stepOffset.z};

	this.canShoot = false;

	this.currentShootTimer = 0;
	this.currentShootAmount = 0.2;

	this.currentBikeTarget = {};

	this.explosionFromVehicle = new Explosion({ maxFrameX:5, dx:32, dy:0, w:32, h:32, sw:32, sh:32, minSize:32, maxSize:64 });
	//g_Level.centerView(this.position.x,this.position.y);
	this.lockViewportOnMove = false;

	this.enemyCounter = 0;
	

};

Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor=Player;
Player.prototype.parent = Character.prototype;

Player.gameoverText = 'Tap to play again!';
Player.gameoverOpacity = 0;

Player.prototype.createGuns=function(){
	this.children.push(new MachineGun({
		id:Math.random(),
		x:this.position.x+12,
		y:this.position.y+(this.size.y/2),
		w:32,
		h:17,
		velocity:{x:0,y:0},
		notinuse:false,
		offset:{x:8,y:(this.size.y/2)},
		mw:8,
		mh:15,
		type:'MachineGun'
	}));
	Character.GUNS['machinegun'].obj = this.children[this.children.length-1];

	this.children.push(new Bazooka({
		id:Math.random(),
		x:this.position.x,
		y:this.position.y,
		w:32,
		h:17,
		velocity:{x:0,y:1},
		notinuse:true,
		offset:{x:3,y:0},
		mw:8,
		mh:15,
		type:'Bazooka'
	}));
	Character.GUNS['bazooka'].obj = this.children[this.children.length-1];

	this.currentGun = Character.GUNS['machinegun'];
	return true;
};
Player.prototype.createBullets=function(){
	for(var i = 0; i < 100; i++){
		this.gunbullets.push(new GunBullet({
			id:Math.random(),
			x:-1000,
			y:-1000,
			w:10,
			h:10,
			bx:10,
			by:10,
			velocity:{x:8,y:0}
		}));
		this.children.push(this.gunbullets[this.gunbullets.length-1]);
	}
	for(var i = 0; i < 5; i++){
		this.bazookabullets.push(new BazookaBullet({
			id:Math.random(),
			x:-1000,
			y:-1000,
			w:17,
			h:15,
			bx:17,
			by:15,
			velocity:{x:8,y:0}
		}));

		this.children.push(this.bazookabullets[this.bazookabullets.length-1]);
	}
};

Player.prototype.Shoot=function(){
	if(!this.canShoot || this.speedBoost)return false;

	this.canShoot = false;

	switch(this.currentGun){
		case Character.GUNS['machinegun']:
			if(this.currentGunBulletIndex++ >= this.gunbullets.length-1)this.currentGunBulletIndex=0;
			this.gunbullets[this.currentGunBulletIndex].Alive({x:((this.position.x)+(this.bbox.x/2)), y:((this.position.y)+(this.bbox.y/4)+10) });
			sounds.gun.play();
			this.currentGun.obj.switchMuzzle(Gun.MUZZLES[this.currentGun.obj.type].FIRE);
			this.currentGun.obj.Shoot();
		break;

		case Character.GUNS['bazooka']:
			if(mobile)$('article.overlays > section.mobile > div.b > span').text(((this.bazookabullets.length-1)-this.currentBazookaBulletIndex));
			if(this.currentBazookaBulletIndex++ >= this.bazookabullets.length-1){this.RemoveBazookaFromInventory();}
			this.bazookabullets[this.currentBazookaBulletIndex].Alive({x:((this.position.x)+(this.bbox.x/2)), y:((this.position.y)+(this.bbox.y/4)-6) });
			sounds.bazooka.play();
			this.currentGun.obj.switchMuzzle(Gun.MUZZLES[this.currentGun.obj.type].FIRE);
			this.currentGun.obj.Shoot();
			g_Level.shake = true;
		break;
	}
};
Player.prototype.StopShoot=function(){
	this.currentGun.obj.switchMuzzle(Gun.MUZZLES[this.currentGun.obj.type].IDLE);
};

Player.prototype.RemoveBazookaFromInventory=function(){
	if(mobile)$('article.overlays > section.mobile > div.b > span').text('0');
	this.currentBazookaBulletIndex=0;
	this.hasBazooka = false;
	this.changeWeapon(true);
};
Player.prototype.AddBazookaToInventory=function(){
	if(mobile)$('article.overlays > section.mobile > div.b > span').text('5');
	this.hasBazooka = true;
	this.currentBazookaBulletIndex = 0;
};
Player.prototype.changeWeapon=function(_arg){
	if(_arg&&typeof(_arg)==='string'){
		_arg = _arg==='bazooka' ? this.hasBazooka ? 'bazooka' : 'machinegun' : 'machinegun';
		this.currentGun.obj.notinuse = true;
		this.currentGun = Character.GUNS[_arg];
		this.currentGun.obj.notinuse = false;
		return;
	

	}else
	if(_arg&&typeof(_arg)==='boolean'){
		this.currentGun.obj.notinuse = true;
		this.currentGun = this.currentGun === Character.GUNS['machinegun'] ? this.hasBazooka ? Character.GUNS['bazooka'] : Character.GUNS['machinegun'] : Character.GUNS['machinegun'];
		this.currentGun.obj.notinuse = false;
		return;
	}
};

Player.prototype.Restart=function(){
	this.position.x = 32;
	this.position.y = scrollHeight-(Arena.TILESIZE*2);
	this.velocity.x = 1.5;
	this.enemyCounter = 0;
	this.velocity.y = 0;
	this.isRunning = true;
	/*this.oldState = Character.states['Player'].INITIAL;*/
	this.switchState(Character.states['Player'].INITIAL,true);
	this.score = 0;
	this.distance = 0;
	this.currentDistance = 0;
	this.currentGunBulletIndex = 0;
	this.currentBazookaBulletIndex = 0;
	this.hasBazooka = false;
	this.checkstep.x = this.position.x+this.stepOffset.x; this.checkstep.y = this.position.x+this.stepOffset.y; this.checkstep.z = this.position.x + this.stepOffset.z;
	this.currentShootTimer = 0;
	Player.gameoverOpacity = 0;
	for(var i=0, len = this.children.length;i<len;i++){this.children[i].Restart();}
	g_Level.centerView(this.position.x,this.position.y);
	
	this.changeWeapon(true);
	this.currentGun.obj.Update(0);
	this.lockViewportOnMove = false;
	this.canShoot = false;

	this.parent.Restart.call(this);

	this.Render();
}

Player.prototype.checkSteps=function(){

	
	if(this.position.x >= this.checkstep.x){
		this.checkstep.x = this.position.x + Math.round(Math.random() * (850-800)+800);//this.stepOffset.x;
		if(g_Utilities.states[g_Utilities.currentState].powerups.random)g_Level.spawnPowerUp();
	};

	if(this.position.x >= this.checkstep.y){
		var _randomInterval = Math.round(Math.random() * (1000-800)+800);//this.velocity.x <= (this.maxVelocity.x * 0.25) ? Math.round(Math.random() * (1000-800)+800) : this.velocity.x <= (this.maxVelocity.x * 0.5) ? Math.round(Math.random() * (1000-800)+800) : this.velocity.x <= (this.maxVelocity.x * 0.75) ? Math.round(Math.random() * (900-700)+700) : Math.round(Math.random() * (900-600)+600);
		this.checkstep.y = this.position.x + _randomInterval;
		var _a = g_Utilities.currentState==='_1' ? 1 : g_Utilities.currentState==='_2' ? Math.round(Math.random() * (3-1)+1) : Math.round(Math.random() * (5-1)+1);
		if(g_Utilities.states[g_Utilities.currentState].objects.random)g_Level.spawnObjectForLevel(_a);
	};

/*	if(this.position.x >= this.checkstep.z){
		var _randomInterval = this.velocity.x <= (this.maxVelocity.x * 0.25) ? Math.round(Math.random() * (1000-800)+800) : this.velocity.x <= (this.maxVelocity.x * 0.5) ? Math.round(Math.random() * (900-750)+750) : this.velocity.x <= (this.maxVelocity.x * 0.75) ? Math.round(Math.random() * (800-650)+650) : Math.round(Math.random() * (700-650)+650);  
		this.checkstep.z = this.position.x + _randomInterval;//this.stepOffset.z;
		this.enemyCounter = g_Utilities.currentState==='_1' ? 1 : g_Utilities.currentState==='_2' ? Math.round(Math.random() * (3-2)+2) : this.enemyCounter+1;

		if(g_Utilities.states[g_Utilities.currentState].enemies.playerStepRelease)g_Level.releaseTheHounds(this.enemyCounter, true);
	};*/

};

Player.prototype.Update=function(){
		
	this.evilWorld();
 
    this.explosionFromVehicle.Update();

	for(var i = 0, len = this.particles.length; i < len; i++){
		if(!this.dead&&this.particles[i].type==='CharacterParticle')continue;
		this.particles[i].Update();
	};
	if(this.dead===true){
		if(this.isGrounded){this.switchState(Character.states[this.type].DEAD);} 
		/*for(var i = 0, len = this.particles.length; i < len; i++){
			this.particles[i].Update();
		}*/
		return;
	}

	if(!debug)this.parent.Update.call(this);

	//if(this.noHitTimer++ >= this.noHitAmount){ g_Level.decreaseEvilViewport(); }


	if(!this.canShoot){ this.currentShootTimer += 1 * g_Utilities.delta; if(this.currentShootTimer >= this.currentShootAmount){this.canShoot=true; this.currentShootTimer=0;} }

	if(!debug)this.powerUpUpdate();

		
	if(debug===true){
		var speed =  Math.ceil((this.velocity.x));
		if(leftkey===true){

			for(var i = 0; i < speed; i++){
				if(!this.checkCollision({x:(this.position.x - 1),y:this.position.y,side:Character.DIRECTIONS.LEFT})){
					if(this.type==='Player'){ g_Level.UpdateViewport(); }
					this.position.x -= 0.2;
				}
			}	

			
		} if(rightkey===true){

			for(var i = 0; i < speed; i++){
				var _c = this.checkCollision({x:(this.position.x + 1),y:this.position.y,side:Character.DIRECTIONS.RIGHT});
				if(!_c){
					if(this.type==='Player'){ g_Level.UpdateViewport(); }
					this.position.x += 0.2;
				}else{
						
						break;
					}
			}
			
		} if(upkey===true){
			
			for(var i = 0; i < speed; i++){

				if(this.checkCollision({x:this.position.x,y:(this.position.y-1), side:Character.DIRECTIONS.UP})){
					this.velocity.y = 0; return; 
				}
				if(this.type==='Player'){ g_Level.UpdateViewport(); }
				this.position.y -= 0.2;
				
			}	

		
		} if(downkey===true){
			
			for(var i = 0; i < speed; i++){

				if(this.checkCollision({x:this.position.x,y:(this.position.y+1), side:Character.DIRECTIONS.DOWN})){
					this.isGrounded=true; this.velocity.y = 0; return; 
				}
				if(this.type==='Player'){ g_Level.UpdateViewport(); }
				this.position.y += 0.2;
				
			}

		}
		return;
	}

		
		for(var i = 0, len = this.children.length; i < len; i++){
			this.children[i].Update();
		}

		//if(this.speedBoost)return true;
		
			var _c = this.checkCollision({x:(this.position.x + this.velocity.x),y:this.position.y,side:Character.DIRECTIONS.RIGHT});
			if(_c){
				/*_c.Trigger(this,{direction:Character.DIRECTIONS.RIGHT});*/
				if(_c.type!=='RoadHole' &&_c.type!=='Deer'&&_c.type!=='Elf'&&_c.layer!==12){ if(this.lockViewportOnMove)this.lockViewportOnMove=false; if(this.isGrounded){ if(!this.speedBoost){this.switchState(Character.states[this.type].IDLE);  this.isHit=true;} }  return true;/*break;*/ }
			};

			this.isHit=false;
			if(this.isGrounded&&!this.isHit&&!this.speedBoost){ if(this.currentGun===Character.GUNS['bazooka']){this.switchState(Character.states[this.type].RUNNINGBAZOOKA);}else{this.switchState(Character.states[this.type].RUNNING);} }
			/*if(g_Level.isXCenter(this.position.x >> 0))g_Level.incX();*/
			g_Level.UpdateViewport();
			this.position.x += this.velocity.x;
			this.incDistance(this.velocity.x);
			this.checkSteps();
				
};

Player.prototype.incDistance=function(_amount){
	this.currentDistance += _amount;
	this.distance = Math.round(this.currentDistance/10);
};

Player.prototype.Render=function(){

	this.parent.Render.call(this);

	if(debug){
		ctx.strokeStyle='#ff0000';
		ctx.strokeRect(this.position.x-g_Level.viewport.x,this.position.y-g_Level.viewport.y,this.size.x,this.size.y);

		/*var aa = g_QuadTree.retrieve(this);
		for(var i = 0, len = aa.length; i < len; i++){
			ctx.strokeStyle='#00ff00';
			ctx.strokeRect(aa[i].position.x - g_Level.viewport.x, aa[i].position.y - g_Level.viewport.y, aa[i].size.x, aa[i].size.y);
		}	*/	

	}

	if(!this.dead){
		for(var i = 0, len = this.children.length; i < len; i++){
			this.children[i].Render();
		}
	}

	//if(!this.dead)return false;

	this.explosionFromVehicle.Render();

	for(var i = 0, len = this.particles.length; i < len; i++){
		if(!this.dead&&this.particles[i].type==='CharacterParticle')continue;
		this.particles[i].Render();
	}

};

Player.prototype.Dead=function(){
	if(this.dead)return;
	this.parent.Dead.call(this);
	/*POST THERE SCORE*/
	MainMenu.createScoreOnScreen(g_Player.distance);
	GAME_HANDLER.PostScore();
	
};
Player.prototype.evilWorld=function(){
	this.parent.evilWorld.call(this);
};
Player.prototype.Trigger=function(obj){
	this.parent.Trigger.call(this, obj);

	g_Level.setHitRedRectangle();
	this.spawnBloodParticles();
	
	//if(obj.type!=='Arena'){g_Level.catchPlayer(10);}

	if(this.health <= 0){ this.health = 0; this.Dead();}
};
Player.prototype.powerUp=function(type){
	switch(type.id){
		case Character.POWERUPS.Player.BIKE.id:
			type.Action(this);
		break;
		case Character.POWERUPS.Player.BAZOOKA.id:
			type.Action(this);
		break;
		case Character.POWERUPS.Player.SNOWMOBILE.id:
			type.Action(this);
		break;
	};
};
Player.prototype.powerUpUpdate=function(){
	switch(this.powerUpState.id){
		case Character.POWERUPS.Player.BIKE.id:
			this.powerUpState.Update(this);
		break;
		case Character.POWERUPS.Player.SNOWMOBILE.id:
			this.powerUpState.Update(this);
		break;
	};
}
Player.prototype.increaseSpeed=function(_override){
	if(this.speedBoost)return true;
	if(_override){this.velocity.x = _override; return true;}
	if(this.velocity.x >= this.maxVelocity.x){this.velocity.x = this.maxVelocity.x; return false; }
	this.velocity.x += 0.1;
};