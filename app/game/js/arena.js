function Arena(_opts){
	var self = this;
	this.viewport = new Vector(_opts.vx || 0, _opts.vy || 0);
	this.shakeViewport = new Vector(0,0);
	this.evilViewport = new Vector(138,0);
	this.type = 'Arena';//this.constructor.name;

	this.evilTimer = 0;

	this.levels = {};
	this.previousLevel = null;
	this.currentLevel = 0;
	this.randomIndex = 0;
	this.lastSpawnedObjectPositionAndWidth = 0;
	this.lastSpawnedHousePositionAndWidth = 0;
	this.lastSpawnedRoadHolePositionAndWidth = 0;
	this.pickupSpawnIndexs = [];
	//this.houseSpawnIndexs = [];
	//this.vehicleSpawnIndexs = [];
	this.pickUpSnowMobileIndex = null;
	this.trapSpawnIndexs = [];
	this.currentTrapIndex = 0;
	this.spawningTraps = false;
	this.spawningHouses = false;
	this.houseSpawnAmount = 0;
	this.triggerHouse = null;

	this.collisionChildren = [];
//	this.children = []; // holds all of the objects which user can interact with.
	this.ladyofthenights = []; //holds all of the 'ladyofthenights' for the bg scenes.
	this.traps = [];
	//this.powerups = [];
	this.lights = [];
	this.roadHoles = [];
	this.trucks = [];
	this.suvs = [];
	this.cars = [];
	this.bins = [];
	
	this.bikes = [];
	this.snowmobile = [];
	this.bazooka = [];
	this.booze = [];

	this.houses = [];


	

	
	this.shake = false;
	this.shakeObj={
		radius:30.0,
		randomAngle:Math.round(Math.random()%360),
		offset:( Math.sin(0) * 1 , Math.cos(0) * 1),
		Finish:function(){
			self.shake = false;
			self.shakeObj.radius = 30.0;
			self.shakeViewport.x = 0;
			self.shakeViewport.y = 0;
		},
		Restart:function(){ self.shakeObj.Finish(); }
	};
	

	this.randomEnemyIndex = 0;
	this.previousRandomEnemyIndex = 0;
	
	/*
	DIRECT CHARACTER - LEVEL OBJECTS
	*/
	//this.lObjectBadIndexs = [];
	//this.lObjectIndexs = [];


	this.minAlpha = 0.1;
	this.maxAlpha = 0.4;
	this.isMaxAlpha = false;
	this.isMinAlpha = true;
	this.currentAlpha = this.minAlpha;
	this.evilStrength = 1;
	this.amountofenemies = 3;

	this.pX = 0;
	this.pXLIGHT = 0;

	this.availableIndexs = [];

	this.isOnRoofTops = false;

	this.allowSpawnOfBazooka = true;

};

/*
==========
STATIC
==========
*/
Arena.TILESIZE = 32;
Arena.spriteSheets = {}; //dynamically filled.
Arena.MAXASSETS = 37;
Arena.CURRENTASSETS = 0;
/*
==========
FUNCS
==========
*/
Arena.prototype.loadLevels=function(){
	var self = this;
	
	self.loadBitmaps();
	self.createObjectsForLevel();
	self.createLadyOfTheNights();

	game.startElements();

	//for(var i = 0, len = self.children.length; i < len; i++){self.collisionChildren.push(self.children[i]);}

	for(var i = 0, len = self.trucks.length; i < len; i++){self.collisionChildren.push(self.trucks[i]);}
	for(var i = 0, len = self.suvs.length; i < len; i++){self.collisionChildren.push(self.suvs[i]);}
	for(var i = 0, len = self.cars.length; i < len; i++){self.collisionChildren.push(self.cars[i]);}
	for(var i = 0, len = self.bins.length; i < len; i++){self.collisionChildren.push(self.bins[i]);}
	

	for(var i = 0, len = self.roadHoles.length; i < len; i++){self.collisionChildren.push(self.roadHoles[i]);}
	for(var i = 0, len = self.houses.length; i < len; i++){self.collisionChildren.push(self.houses[i]);}
	for(var i = 0, len = self.bikes.length; i < len; i++){self.collisionChildren.push(self.bikes[i]);}
	for(var i = 0, len = self.snowmobile.length; i < len; i++){self.collisionChildren.push(self.snowmobile[i]);}
	for(var i = 0, len = self.bazooka.length; i < len; i++){self.collisionChildren.push(self.bazooka[i]);}
	for(var i = 0, len = self.booze.length; i < len; i++){self.collisionChildren.push(self.booze[i]);}

	//for(var i = 0, len = self.powerups.length; i < len; i++){ self.collisionChildren.push(self.powerups[i]); }
	
	for(var i = 0, len = self.traps.length; i < len; i++){ self.collisionChildren.push(self.traps[i]); }
	for(var i = 0, len = g_Enemies.length; i < len; i++){
		self.collisionChildren.push(g_Enemies[i]);

		for(var j = 0, len2 = g_Enemies[i].coins.length; j < len2; j++){
			self.collisionChildren.push(g_Enemies[i].coins[j]);
		};
	};
	
	self.collisionChildren.push(g_Player);
};

Arena.prototype.createLadyOfTheNights=function(){
	for(var i = 0; i < 2; i++){
		this.ladyofthenights.push( new LadyOfTheNight({ isFg:true, x:-1000, y:512 }) );
	}
};

Arena.prototype.createRandomHouse=function(){
	this.randomIndex = Math.round(Math.random() * (4));

	if(this.randomIndex===0)this.houses.push(new House({x:-1000, y:-1000, w:128, h:224, dx:0 , dy:0, layer:5, enemylayer:10 }));
	if(this.randomIndex===1)this.houses.push(new House({x:-1000, y:-1000, w:192, h:224, dx:128 , dy:0, layer:5, enemylayer:10 }));
	if(this.randomIndex===2)this.houses.push(new House({x:-1000, y:-1000, w:128, h:288, dx:320 , dy:0, layer:5, enemylayer:10 }));
	if(this.randomIndex===3)this.houses.push(new House({x:-1000, y:-1000, w:192, h:288, dx:448 , dy:0, layer:5, enemylayer:10 }));
	if(this.randomIndex===4)this.houses.push(new House({x:-1000, y:-1000, w:256, h:288, dx:640 , dy:0, layer:5, enemylayer:10 }));
};
Arena.prototype.createObjectsForLevel=function(){
	for(var i = 0, len = 3; i < len; i++){
		
		/*this.houses.push(new House({x:-1000, y:-1000, w:128, h:224, dx:0 , dy:0, layer:5, enemylayer:10 }));
		//this.houseSpawnIndexs.push(this.children.length-1);
		this.houses.push(new House({x:-1000, y:-1000, w:192, h:224, dx:128 , dy:0, layer:5, enemylayer:10 }));
		//this.houseSpawnIndexs.push(this.children.length-1);
		this.houses.push(new House({x:-1000, y:-1000, w:128, h:288, dx:320 , dy:0, layer:5, enemylayer:10 }));
		//this.houseSpawnIndexs.push(this.children.length-1);
		this.houses.push(new House({x:-1000, y:-1000, w:192, h:288, dx:448 , dy:0, layer:5, enemylayer:10 }));
		//this.houseSpawnIndexs.push(this.children.length-1);
		this.houses.push(new House({x:-1000, y:-1000, w:256, h:288, dx:640 , dy:0, layer:5, enemylayer:10 }));*/
		//this.houseSpawnIndexs.push(this.children.length-1);
		this.createRandomHouse();
	

		this.trucks.push(new Truck({x:-1000, y:-1000, w:288, h:96, dx:0 , dy:352, enemylayer:10 }));
		this.cars.push(new Car({x:-1000, y:-1000, w:96, h:32, dx:0 , dy:320, enemylayer:10 }));
		this.suvs.push(new Suv({x:-1000, y:-1000, w:96, h:63, dx:96 , dy:288, enemylayer:10 }));
		this.bins.push(new Bin({x:-1000, y:-1000, w:32, h:28, dx:0 , dy:448, enemylayer:10 }));

		/*if(i <= 1){
			this.children.push(new Truck({x:-1000, y:-1000, w:288, h:96, dx:0 , dy:352, enemylayer:10 }));
			this.vehicleSpawnIndexs.push(this.children.length-1);
		};

		this.children.push(new Car({x:-1000, y:-1000, w:96, h:32, dx:0 , dy:320, enemylayer:10 }));
		this.vehicleSpawnIndexs.push(this.children.length-1);

		this.children.push(new Suv({x:-1000, y:-1000, w:96, h:63, dx:96 , dy:288, enemylayer:10 }));
		this.vehicleSpawnIndexs.push(this.children.length-1);

		this.children.push(new Bin({x:-1000, y:-1000, w:32, h:28, dx:0 , dy:448, enemylayer:10 }));
		this.vehicleSpawnIndexs.push(this.children.length-1);*/
	};

	this.bikes.push(new BikePowerUp()); 
	this.bazooka.push(new BazookaPowerUp());
	this.snowmobile.push( new SnowMobilePowerUp());
	for(var i = 0; i < 5; i++){
		this.booze.push(new BoozePowerUp()); 
		//this.pickupSpawnIndexs.push(this.powerups.length-1);
	};
	/*this.powerups.push(new BazookaPowerUp()); 
	this.pickupSpawnIndexs.push(this.powerups.length-1);

	this.powerups.push(new SnowMobilePowerUp()); 
	this.pickUpSnowMobileIndex = this.powerups.length-1;
*/
	


	
	//this.pickupSpawnIndexs.push(this.powerups.length-1);


	for(var i = 0, len = 6; i < len; i++){
		this.traps.push( new Missile({ dx:64, dy:0, w:32, h:18 }));
		this.trapSpawnIndexs.push(this.traps.length-1);
	};

	for(var i = 0; i < 5; i++){
		this.roadHoles.push(new RoadHole({x:-1000, y:-1000, w:128, h:48, dx:0 , dy:0, layer:5, enemylayer:10 }));
	};

};


Arena.prototype.spawnRoadHoles=function(_gapSpace){
	if(g_Player.speedBoost || this.spawningHouses)return false;

	var _offset = 0;
	for(var i = 0, len = this.roadHoles.length; i < len; i++){
		if(this.roadHoles[i].inView || !this.roadHoles[i].dead)continue;
		_offset = (this.viewport.x + (playWidth)) < this.lastSpawnedRoadHolePositionAndWidth ? (this.lastSpawnedRoadHolePositionAndWidth+(Arena.TILESIZE*3)) : ((this.viewport.x + (playWidth)) + (Arena.TILESIZE*3));
		this.roadHoles[i].Spawn(_offset, _gapSpace);
		this.lastSpawnedRoadHolePositionAndWidth = this.roadHoles[i].position.x + this.roadHoles[i].size.x;
		
		return true;
	}

	this.roadHoles.push(new RoadHole({x:-1000, y:-1000, w:128, h:48, dx:0 , dy:0, layer:5, enemylayer:10 })); // insert new roadhole! since there is none active
	this.collisionChildren.push(this.roadHoles[this.roadHoles.length-1]);

	_offset = (this.viewport.x + (playWidth)) < this.lastSpawnedRoadHolePositionAndWidth ? (this.lastSpawnedRoadHolePositionAndWidth+(Arena.TILESIZE*3)) : ((this.viewport.x + (playWidth)) + (Arena.TILESIZE*3));
	this.roadHoles[this.roadHoles.length-1].Spawn(_offset, _gapSpace);
	this.lastSpawnedRoadHolePositionAndWidth = this.roadHoles[this.roadHoles.length-1].position.x + this.roadHoles[this.roadHoles.length-1].size.x;

	return true;

};	

//this.houses.housesAmount,this.gaps.buildings,this.houses.gapFrequency
Arena.prototype.spawnHousesForLevel=function(_amount, _gaps, _gapsFrequency, _gapamount){
	if( _amount <= 0 ) return false;
	var i = 0,
		offset = 0,
		gaps=_gaps,
		gapdone=false;

	this.availableIndexs.length = 0;

	for(i = 0, len = this.houses.length; i < len; i++){
		if(this.houses[i].inView || !this.houses[i].dead)continue;
		this.availableIndexs.push(i);
	};

	if(this.availableIndexs.length < _amount){
		for(i = 0, len = (_amount-this.availableIndexs.length); i < len; i++){
			this.createRandomHouse();
			this.availableIndexs.push(this.houses.length-1);
			this.collisionChildren.push(this.houses[this.houses.length-1]);
		}
	};

	var trigger = false;
	var twostephouse = 0,
		twostephousecount = 1;

	for(i = 0; i < _amount; i++){
		if(i==(_amount-1)){trigger=true; this.triggerHouse = this.availableIndexs[i];}
		if(_gaps&&!gapdone){ gaps = Math.round((Math.random() * (_gapsFrequency))); };
		_offset = ((this.viewport.x + (playWidth)) < this.lastSpawnedHousePositionAndWidth ? this.lastSpawnedHousePositionAndWidth : (this.viewport.x + (playWidth)))
		this.houses[this.availableIndexs[i]].Spawn(_offset, trigger );
		this.lastSpawnedHousePositionAndWidth = this.houses[this.availableIndexs[i]].position.x + this.houses[this.availableIndexs[i]].size.x;
		if(i==(_amount-1)){ this.spawnSnowMobile((_offset + (this.houses[this.availableIndexs[i]].size.x - this.snowmobile[0].size.x)), this.houses[this.availableIndexs[i]].position.y ); } 
		if(twostephouse){
			if(twostephousecount-- <= 0){gapdone=true; twostephouse = false;}
		}else{ gapdone = false; }
		if(gaps===0&&i>3){this.lastSpawnedHousePositionAndWidth+= (Arena.TILESIZE * (Math.round(Math.random() * (_gapamount-2)+2))); gapdone=true; if(g_Utilities.currentState==='_3'){twostephousecount=1; twostephouse = true;} gaps=1; }
	}

	this.spawningHouses = false;
	this.isOnRoofTops = true;

	return true;

	//if(this.houseSpawnAmount <= 0){return false;};
	//var trigger = this.houseSpawnAmount <= 1 ? true : false;


	/*var gap = (Math.random() * (4)) | 0;
	var _offset = 0;
	for(var i = 0, len = this.houseSpawnIndexs.length; i < len ; i ++){
		if(this.children[this.houseSpawnIndexs[i]].inView || !this.children[this.houseSpawnIndexs[i]].dead)continue;
		
		_offset = (this.viewport.x + (playWidth)) < this.lastSpawnedHousePositionAndWidth ? this.lastSpawnedHousePositionAndWidth :(this.viewport.x + (playWidth));
		this.children[this.houseSpawnIndexs[i]].Spawn(_offset,trigger);
		this.lastSpawnedHousePositionAndWidth = this.children[this.houseSpawnIndexs[i]].position.x + this.children[this.houseSpawnIndexs[i]].size.x;
		if(!gap){this.lastSpawnedHousePositionAndWidth+= (Arena.TILESIZE * (Math.round(Math.random() * (3-2)+2)))}
		this.houseSpawnAmount --;
		
		if(trigger){
			this.powerups[this.pickUpSnowMobileIndex].Spawn(_offset + (this.children[this.houseSpawnIndexs[i]].size.x - this.powerups[this.pickUpSnowMobileIndex].size.x) );
		}

		return true;
	};

	return false;*/
};
Arena.prototype.setHouseLevel=function(_amount){
	this.houseSpawnAmount = _amount;
	this.spawningHouses = true;
};

Arena.prototype.spawnTruck=function(_amount,max,min){
	var i = 0,
	j = 0;
	//offset = 0;
	this.availableIndexs.length = 0;

	for(i = 0, len = this.trucks.length; i < len; i++){
		if(this.trucks[i].inView || !this.trucks[i].dead)continue;
		this.availableIndexs.push(i);
	};

	if(this.availableIndexs.length < _amount){
		for(i = 0, len = (_amount-this.availableIndexs.length); i < len; i++){
			this.trucks.push( new Truck({x:-1000, y:-1000, w:288, h:96, dx:0 , dy:352, enemylayer:10 }) );
			this.availableIndexs.push(this.trucks.length-1);
			this.collisionChildren.push(this.trucks[this.trucks.length-1]);
		}
	};

	var _pos = 0;
	for(j = 0; j < _amount; j++){
		_pos = (this.viewport.x + (playWidth)) >= this.lastSpawnedObjectPositionAndWidth ? (this.viewport.x + (playWidth) ) : this.lastSpawnedObjectPositionAndWidth;
		if(max){ _pos += (Arena.TILESIZE * (Math.round(Math.random() * (max-min)+min)))};

		this.trucks[this.availableIndexs[j]].Spawn(_pos);


			for(var i = 0, len = this.collisionChildren.length; i < len; i++){
			if(this.collisionChildren[i]===this.trucks[this.availableIndexs[j]] || this.collisionChildren[i].type==='Deer' || this.collisionChildren[i].type==='Elf'||
				this.collisionChildren[i].type==='House')continue;

			if(boundingBoxCollision(this.trucks[this.availableIndexs[j]],this.collisionChildren[i],{x:this.trucks[this.availableIndexs[j]].position.x, y:this.trucks[this.availableIndexs[j]].position.y}, true)){
				if(this.collisionChildren[i].type==='RoadHole'){
					this.collisionChildren[i].position.x = this.trucks[this.availableIndexs[j]].position.x + this.trucks[this.availableIndexs[j]].size.x + (Arena.TILESIZE*2);
					continue;
				}
				this.collisionChildren[i].position.y = this.trucks[this.availableIndexs[j]].position.y - this.collisionChildren[i].size.y - 1;	
			};
		};


		this.lastSpawnedObjectPositionAndWidth = this.trucks[this.availableIndexs[j]].position.x + this.trucks[this.availableIndexs[j]].size.x;	
	};
};
Arena.prototype.spawnSuv=function(_amount,max,min){
	var i = 0,
	j = 0;
	//offset = 0;
	this.availableIndexs.length = 0;

	for(i = 0, len = this.suvs.length; i < len; i++){
		if(this.suvs[i].inView || !this.suvs[i].dead)continue;
		this.availableIndexs.push(i);
	};

	if(this.availableIndexs.length < _amount){
		for(i = 0, len = (_amount-this.availableIndexs.length); i < len; i++){
			this.suvs.push(new Suv({x:-1000, y:-1000, w:96, h:63, dx:96 , dy:288, enemylayer:10 }));
			this.availableIndexs.push(this.suvs.length-1);
			this.collisionChildren.push(this.suvs[this.suvs.length-1]);
		}
	};

	var _pos = 0;
	for(j = 0; j < _amount; j++){
		_pos = (this.viewport.x + (playWidth)) >= this.lastSpawnedObjectPositionAndWidth ? (this.viewport.x + (playWidth) ) : this.lastSpawnedObjectPositionAndWidth;
		if(max){ _pos += (Arena.TILESIZE * (Math.round(Math.random() * (max-min)+min)))};

		this.suvs[this.availableIndexs[j]].Spawn(_pos);


			for(var i = 0, len = this.collisionChildren.length; i < len; i++){
			if(this.collisionChildren[i]===this.suvs[this.availableIndexs[j]] || this.collisionChildren[i].type==='Deer' || this.collisionChildren[i].type==='Elf'||
				this.collisionChildren[i].type==='House')continue;

			if(boundingBoxCollision(this.suvs[this.availableIndexs[j]],this.collisionChildren[i],{x:this.suvs[this.availableIndexs[j]].position.x, y:this.suvs[this.availableIndexs[j]].position.y}, true)){
				if(this.collisionChildren[i].type==='RoadHole'){
					this.collisionChildren[i].position.x = this.suvs[this.availableIndexs[j]].position.x + this.suvs[this.availableIndexs[j]].size.x + (Arena.TILESIZE*2);
					continue;
				}
				this.collisionChildren[i].position.y = this.suvs[this.availableIndexs[j]].position.y - this.collisionChildren[i].size.y - 1;	
			};
		};


		this.lastSpawnedObjectPositionAndWidth = this.suvs[this.availableIndexs[j]].position.x + this.suvs[this.availableIndexs[j]].size.x;	
	};
};
Arena.prototype.spawnCar=function(_amount,max,min){
	var i = 0,
	j = 0;
	//offset = 0;
	this.availableIndexs.length = 0;

	for(i = 0, len = this.cars.length; i < len; i++){
		if(this.cars[i].inView || !this.cars[i].dead)continue;
		this.availableIndexs.push(i);
	};

	if(this.availableIndexs.length < _amount){
		for(i = 0, len = (_amount-this.availableIndexs.length); i < len; i++){
			this.cars.push(new Car({x:-1000, y:-1000, w:96, h:32, dx:0 , dy:320, enemylayer:10 }));
			this.availableIndexs.push(this.cars.length-1);
			this.collisionChildren.push(this.cars[this.cars.length-1]);
		}
	};

	var _pos = 0;
	for(j = 0; j < _amount; j++){
		_pos = (this.viewport.x + (playWidth)) >= this.lastSpawnedObjectPositionAndWidth ? (this.viewport.x + (playWidth) ) : this.lastSpawnedObjectPositionAndWidth;
		if(max){ _pos += (Arena.TILESIZE * (Math.round(Math.random() * (max-min)+min)))};
		
		this.cars[this.availableIndexs[j]].Spawn(_pos);


			for(var i = 0, len = this.collisionChildren.length; i < len; i++){
			if(this.collisionChildren[i]===this.cars[this.availableIndexs[j]] || this.collisionChildren[i].type==='Deer' || this.collisionChildren[i].type==='Elf'||
				this.collisionChildren[i].type==='House')continue;

			if(boundingBoxCollision(this.cars[this.availableIndexs[j]],this.collisionChildren[i],{x:this.cars[this.availableIndexs[j]].position.x, y:this.cars[this.availableIndexs[j]].position.y}, true)){
				if(this.collisionChildren[i].type==='RoadHole'){
					this.collisionChildren[i].position.x = this.cars[this.availableIndexs[j]].position.x + this.cars[this.availableIndexs[j]].size.x + (Arena.TILESIZE*2);
					continue;
				}
				this.collisionChildren[i].position.y = this.cars[this.availableIndexs[j]].position.y - this.collisionChildren[i].size.y - 1;	
			};
		};


		this.lastSpawnedObjectPositionAndWidth = this.cars[this.availableIndexs[j]].position.x + this.cars[this.availableIndexs[j]].size.x;	
	};
};
Arena.prototype.spawnBin=function(_amount,max,min){
	var i = 0,
	j = 0;
	//offset = 0;
	this.availableIndexs.length = 0;

	for(i = 0, len = this.bins.length; i < len; i++){
		if(this.bins[i].inView || !this.bins[i].dead)continue;
		this.availableIndexs.push(i);
	};

	if(this.availableIndexs.length < _amount){
		for(i = 0, len = (_amount-this.availableIndexs.length); i < len; i++){
			this.bins.push(new Bin({x:-1000, y:-1000, w:32, h:28, dx:0 , dy:448, enemylayer:10 }));
			this.availableIndexs.push(this.bins.length-1);
			this.collisionChildren.push(this.bins[this.bins.length-1]);
		}
	};

	var _pos = 0;
	for(j = 0; j < _amount; j++){
		_pos = (this.viewport.x + (playWidth)) >= this.lastSpawnedObjectPositionAndWidth ? (this.viewport.x + (playWidth) ) : this.lastSpawnedObjectPositionAndWidth;
		if(max){ _pos += (Arena.TILESIZE * (Math.round(Math.random() * (max-min)+min)))};

		this.bins[this.availableIndexs[j]].Spawn(_pos);


			for(var i = 0, len = this.collisionChildren.length; i < len; i++){
			if(this.collisionChildren[i]===this.bins[this.availableIndexs[j]] || this.collisionChildren[i].type==='Deer' || this.collisionChildren[i].type==='Elf'||
				this.collisionChildren[i].type==='House')continue;

			if(boundingBoxCollision(this.bins[this.availableIndexs[j]],this.collisionChildren[i],{x:this.bins[this.availableIndexs[j]].position.x, y:this.bins[this.availableIndexs[j]].position.y}, true)){
				if(this.collisionChildren[i].type==='RoadHole'){
					this.collisionChildren[i].position.x = this.bins[this.availableIndexs[j]].position.x + this.bins[this.availableIndexs[j]].size.x + (Arena.TILESIZE*2);
					continue;
				}
				this.collisionChildren[i].position.y = this.bins[this.availableIndexs[j]].position.y - this.collisionChildren[i].size.y - 1;	
			};
		};


		this.lastSpawnedObjectPositionAndWidth = this.bins[this.availableIndexs[j]].position.x + this.bins[this.availableIndexs[j]].size.x;	
	};
};

Arena.prototype.spawnObjectForLevel=function(_amount, type,max,min,breakmax,breakmin){

	if(g_Player.speedBoost || this.spawningTraps || this.spawningHouses || g_Level.isOnRoofTops)return false;

	if(type===0){ this.spawnTruck(_amount,max,min); }else
	if(type===1){ this.spawnSuv(_amount,max,min); }else
	if(type===2){ this.spawnCar(_amount,max,min); }else
	if(type===3){ this.spawnBin(_amount,max,min); };

	if(breakmax){ this.lastSpawnedObjectPositionAndWidth += Arena.TILESIZE * (Math.round(Math.random() * (breakmax-breakmin)+breakmin)); }

	return true;

	/*if(g_Player.speedBoost || this.spawningTraps || this.spawningHouses || g_Level.isOnRoofTops)return false;

	for(var i = 0; i < _amount; i++){
		this.randomIndex = this.vehicleSpawnIndexs[Math.abs(Math.round(Math.random() * (this.vehicleSpawnIndexs.length-1)))];

		if(this.children[this.randomIndex].inView || !this.children[this.randomIndex].dead) return false;

		var _pos = (this.viewport.x + (playWidth)) >= this.lastSpawnedObjectPositionAndWidth ? (this.viewport.x + (playWidth) ) : this.lastSpawnedObjectPositionAndWidth;
		
		this.children[this.randomIndex].Spawn(_pos);

		for(var i = 0, len = this.collisionChildren.length; i < len; i++){
			if(this.collisionChildren[i]===this.children[this.randomIndex] || this.collisionChildren[i].type==='Deer' || this.collisionChildren[i].type==='Elf'||
				this.collisionChildren[i].type==='House')continue;

			if(boundingBoxCollision(this.children[this.randomIndex],this.collisionChildren[i],{x:this.children[this.randomIndex].position.x, y:this.children[this.randomIndex].position.y})){
				if(this.collisionChildren[i].type==='RoadHole' || this.collisionChildren[i].type==='BikePowerUp'){
					this.collisionChildren[i].position.x = this.children[this.randomIndex].position.x + this.children[this.randomIndex].size.x + (Arena.TILESIZE*2);
					if(this.collisionChildren[i].type==='RoadHole'){console.log('levelobject change position: '); console.log(this.collisionChildren[i].position.x)}
					continue;
				}
				this.collisionChildren[i].position.y = this.children[this.randomIndex].position.y - this.collisionChildren[i].size.y - 1;	
			};
		};
		this.lastSpawnedObjectPositionAndWidth = this.children[this.randomIndex].position.x + this.children[this.randomIndex].size.x;
	};
*/

};

Arena.prototype.spawnBike=function(){
	if(g_Player.speedBoost || this.spawningHouses || this.isOnRoofTops || this.bikes[0].active)return false;
	this.bikes[0].Spawn();
};
Arena.prototype.spawnSnowMobile=function(_offsetx,_offsety){
	this.snowmobile[0].Spawn(_offsetx,_offsety);
};
Arena.prototype.spawnBazooka=function(_amount){

	var i = 0;
		//offset = 0;
	this.availableIndexs.length = 0;

	for(i = 0, len = this.bazooka.length; i < len; i++){
		if(this.bazooka[i].active)continue;
		this.availableIndexs.push(i);
	};

	if(this.availableIndexs.length < _amount){
		for(i = 0, len = (_amount-this.availableIndexs.length); i < len; i++){
			this.bazooka.push( new BazookaPowerUp() );
			this.availableIndexs.push(this.bazooka.length-1);
			this.collisionChildren.push(this.bazooka[this.bazooka.length-1]);
		}
	};

	for(i = 0; i < _amount; i++){
		this.bazooka[this.availableIndexs[i]].Spawn();	
	};

	return true;
};

Arena.prototype.spawnBooze=function(_amount){

	var i = 0;
		//offset = 0;
	this.availableIndexs.length = 0;

	for(i = 0, len = this.booze.length; i < len; i++){
		if(this.booze[i].active)continue;
		this.availableIndexs.push(i);
	};

	if(this.availableIndexs.length < _amount){
		for(i = 0, len = (_amount-this.availableIndexs.length); i < len; i++){
			this.booze.push( new BoozePowerUp() );
			this.availableIndexs.push(this.booze.length-1);
			this.collisionChildren.push(this.booze[this.booze.length-1]);
		}
	};

	for(i = 0; i < _amount; i++){
		this.booze[this.availableIndexs[i]].Spawn();	
	};

	return true;
};


Arena.prototype.spawnPowerUp=function(){
	var _ra = g_Player.health <= (g_Player.maxhealth*0.25) ? Math.round(Math.random() * (2)) : g_Player.health <= (g_Player.maxhealth*0.5) ? Math.round(Math.random() * (5)) : Math.round(Math.random() * (6));
	if(!_ra)this.spawnBooze(1);
	

	if(!g_Player.hasBazooka){
		var _ra = g_Player.health <= (g_Player.maxhealth*0.25) ? Math.floor(Math.random() * (10)) : g_Player.health <= (g_Player.maxhealth*0.5) ? Math.floor(Math.random() * (100)) : Math.floor(Math.random() * (120));
		if(_ra){
			if(this.allowSpawnOfBazooka){ if(g_Utilities.currentState==='_3'){this.allowSpawnOfBazooka=false;} this.spawnBazooka(1);}
		}
	}
	
};

/*Arena.prototype.spawnCollectableOrPowerUp=function(){
	if(g_Player.speedBoost)return false;
	var _index = this.pickupSpawnIndexs[Math.abs(Math.round(Math.random() * this.pickupSpawnIndexs.length-1))];
	if(this.powerups[_index].active)return false;

	if(this.powerups[_index].type==='BazookaPowerUp'){if(g_Player.hasBazooka){return false;}else{if(Math.round(Math.random() * 2)!== 0)return false;}}
	//if(this.powerups[_index].type==='BikePowerUp'){if(!this.spawningHouses){if(Math.round(Math.random() * 5)!== 0)return false;}else{return false;}}
	if(this.powerups[_index].type==='BoozePowerUp'){if(g_Player.health > (g_Player.maxhealth/2)){return false;}else{if(Math.round(Math.random() * 3)!== 0)return false;} }

	this.powerups[_index].Spawn();
};*/
Arena.prototype.spawnTrap=function(_amount, speed){
	if(g_Player.speedBoost || this.spawningTraps)return false;
	
	var offset = 0;
	for(var i = 0, len = _amount; i < _amount; i++){
		offset = i===0 ? -9 : i===1 ? 9 : i===2 ? -27 : 27;
		this.traps[this.trapSpawnIndexs[this.currentTrapIndex]].Spawn((100*i)+100, offset, speed);
		this.currentTrapIndex++;
		if(this.currentTrapIndex >= this.trapSpawnIndexs.length){this.currentTrapIndex = 0;};
	};
	this.spawningTraps = true;
};


Arena.prototype.loadBitmaps=function(){
	/*
	MENUS
	*/
	Arena.spriteSheets['menu'] = { img:null, spritesLoaded:false };
	loadSprites('game/assets/menu/menubg.png',function(sprite){
		Arena.spriteSheets['menu'].img=sprite;
		Arena.spriteSheets['menu'].spritesLoaded = true;
		Arena.CURRENTASSETS ++;
	});

	Arena.spriteSheets['menuassets'] = { img:null, spritesLoaded:false };
	loadSprites('game/assets/menu/menuassets.png',function(sprite){
		Arena.spriteSheets['menuassets'].img=sprite;
		Arena.spriteSheets['menuassets'].spritesLoaded = true;
		Arena.CURRENTASSETS ++;
	});

	Arena.spriteSheets['mobileoverlayassets'] = { img:null, spritesLoaded:false };
	loadSprites('game/assets/menu/mobileoverlayassets.png',function(sprite){
		Arena.spriteSheets['mobileoverlayassets'].img=sprite;
		Arena.spriteSheets['mobileoverlayassets'].spritesLoaded = true;
		Arena.CURRENTASSETS ++;
	});


	/*BG*/
	Arena.spriteSheets['goodbackground'] = { img:null, spritesLoaded:false };
	loadSprites('game/assets/tiled/bg2.png',function(sprite){
		Arena.spriteSheets['goodbackground'].img=sprite;
		Arena.spriteSheets['goodbackground'].spritesLoaded = true;
		Arena.CURRENTASSETS ++;
	});


	Arena.spriteSheets['testlevel1'] = { img:null, spritesLoaded:false };
	loadSprites('game/assets/tiled/testlevel1.png',function(sprite){
		Arena.spriteSheets['testlevel1'].img=sprite;
		Arena.spriteSheets['testlevel1'].spritesLoaded = true;
		Arena.CURRENTASSETS ++;
	});

	Arena.spriteSheets['testlevel1bad'] = { img:null, spritesLoaded:false };
	loadSprites('game/assets/tiled/testlevel1bad.png',function(sprite){
		Arena.spriteSheets['testlevel1bad'].img=sprite;
		Arena.spriteSheets['testlevel1bad'].spritesLoaded = true;
		Arena.CURRENTASSETS ++;
	});

	Arena.spriteSheets['testlevel2'] = { img:null, spritesLoaded:false };
	loadSprites('game/assets/tiled/level1backtest.png',function(sprite){
		Arena.spriteSheets['testlevel2'].img=sprite;
		Arena.spriteSheets['testlevel2'].spritesLoaded = true;
		Arena.CURRENTASSETS ++;
	});

	Arena.spriteSheets['testlevel2bad'] = { img:null, spritesLoaded:false };
	loadSprites('game/assets/tiled/level1backtestbad.png',function(sprite){
		Arena.spriteSheets['testlevel2bad'].img=sprite;
		Arena.spriteSheets['testlevel2bad'].spritesLoaded = true;
		Arena.CURRENTASSETS ++;
	});

	//
	Arena.spriteSheets['testlevel1light'] = { img:null, spritesLoaded:false };
	loadSprites('game/assets/tiled/level1testlight.png',function(sprite){
		Arena.spriteSheets['testlevel1light'].img=sprite;
		Arena.spriteSheets['testlevel1light'].spritesLoaded = true;
		Arena.CURRENTASSETS ++;
	});

	//level1testlightdodge.png
	Arena.spriteSheets['testlevel1lightdodge'] = { img:null, spritesLoaded:false };
	loadSprites('game/assets/tiled/level1testlightdodge.png',function(sprite){
		Arena.spriteSheets['testlevel1lightdodge'].img=sprite;
		Arena.spriteSheets['testlevel1lightdodge'].spritesLoaded = true;
		Arena.CURRENTASSETS ++;
	});

	Arena.spriteSheets['badbackground'] = { img:null, spritesLoaded:false };
	loadSprites('game/assets/badsky.png',function(sprite){
		Arena.spriteSheets['badbackground'].img=sprite;
		Arena.spriteSheets['badbackground'].spritesLoaded = true;
		Arena.CURRENTASSETS ++;
	});

	Arena.spriteSheets['hitredrectangle'] = { img:null, spritesLoaded:false };
	loadSprites('game/assets/hitredrectangle.png',function(sprite){
		Arena.spriteSheets['hitredrectangle'].img=sprite;
		Arena.spriteSheets['hitredrectangle'].spritesLoaded = true;
		Arena.CURRENTASSETS ++;
	});

	/*OBJECTS*/

	Arena.spriteSheets['traps'] = { img:null, spritesLoaded:false };
	loadSprites('game/assets/traps.png',function(sprite){
		Arena.spriteSheets['traps'].img=sprite;
		Arena.spriteSheets['traps'].spritesLoaded = true;
		Arena.CURRENTASSETS ++;
	});

	Arena.spriteSheets['objectsgood'] = { img:null, spritesLoaded:false };
	loadSprites('game/assets/objects/objectsgood.png',function(sprite){
		Arena.spriteSheets['objectsgood'].img=sprite;
		Arena.spriteSheets['objectsgood'].spritesLoaded = true;
		Arena.CURRENTASSETS ++;
	});
	Arena.spriteSheets['objectsbad'] = { img:null, spritesLoaded:false };
	loadSprites('game/assets/objects/objectsbad.png',function(sprite){
		Arena.spriteSheets['objectsbad'].img=sprite;
		Arena.spriteSheets['objectsbad'].spritesLoaded = true;
		Arena.CURRENTASSETS ++;
	});

	/*TILES*/
	Arena.spriteSheets['goodtiles'] = { img:null, spritesLoaded:false };
	loadSprites('game/assets/tiled/testsprite.png',function(sprite){
		Arena.spriteSheets['goodtiles'].img=sprite;
		Arena.spriteSheets['goodtiles'].spritesLoaded = true;
		Arena.CURRENTASSETS ++;
	});

	Arena.spriteSheets['eviltiles'] = { img:null, spritesLoaded:false };
	loadSprites('game/assets/tiled/testspriteevil.png',function(sprite){
		Arena.spriteSheets['eviltiles'].img=sprite;
		Arena.spriteSheets['eviltiles'].spritesLoaded = true;
		Arena.CURRENTASSETS ++;
	});

	Arena.spriteSheets['coins'] = { img:null, spritesLoaded:false };
	loadSprites('game/assets/coin.png',function(sprite){
		Arena.spriteSheets['coins'].img=sprite;
		Arena.spriteSheets['coins'].spritesLoaded = true;
		Arena.CURRENTASSETS ++;
	});

	Arena.spriteSheets['bullets'] = { 
		BazookaBullet:{
			img:null,
			spritesLoaded:false
		},
		GunBullet:{
			img:null, 
			spritesLoaded:false 
		}
	};

	loadSprites('game/assets/bullet.png',function(sprite){
		Arena.spriteSheets['bullets']['GunBullet'].img=sprite;
		Arena.spriteSheets['bullets']['GunBullet'].spritesLoaded = true;
		Arena.CURRENTASSETS ++;
	});

	loadSprites('game/assets/bulletbazooka.png',function(sprite){
		Arena.spriteSheets['bullets']['BazookaBullet'].img=sprite;
		Arena.spriteSheets['bullets']['BazookaBullet'].spritesLoaded = true;
		Arena.CURRENTASSETS ++;
	});

	Arena.spriteSheets['particlesgood'] = { img:null, spritesLoaded:false };
	loadSprites('game/assets/particles.png',function(sprite){
		Arena.spriteSheets['particlesgood'].img=sprite;
		Arena.spriteSheets['particlesgood'].spritesLoaded = true;
		Arena.CURRENTASSETS ++;
	});

	Arena.spriteSheets['particlesbad'] = { img:null, spritesLoaded:false };
	loadSprites('game/assets/particles.png',function(sprite){
		Arena.spriteSheets['particlesbad'].img=sprite;
		Arena.spriteSheets['particlesbad'].spritesLoaded = true;
		Arena.CURRENTASSETS ++;
	});

	Arena.spriteSheets['guns'] = { 
		machinegun:{img:null, spritesLoaded:false },
		bazooka:{img:null, spritesLoaded:false }
	};
	loadSprites('game/assets/machinegun.png',function(sprite){
		Arena.spriteSheets['guns'].machinegun.img=sprite;
		Arena.spriteSheets['guns'].machinegun.spritesLoaded = true;
		Arena.CURRENTASSETS ++;
	});
	loadSprites('game/assets/bazooka.png',function(sprite){
		Arena.spriteSheets['guns'].bazooka.img=sprite;
		Arena.spriteSheets['guns'].bazooka.spritesLoaded = true;
		Arena.CURRENTASSETS ++;
	});

	Arena.spriteSheets['muzzles'] = { img:null, spritesLoaded:false };
	loadSprites('game/assets/muzzle.png',function(sprite){
		Arena.spriteSheets['muzzles'].img=sprite;
		Arena.spriteSheets['muzzles'].spritesLoaded = true;
		Arena.CURRENTASSETS ++;
	});

	Arena.spriteSheets['snow'] = { img:null, spritesLoaded:false };
	loadSprites('game/assets/snow.png',function(sprite){
		Arena.spriteSheets['snow'].img=sprite;
		Arena.spriteSheets['snow'].spritesLoaded = true;
		Arena.CURRENTASSETS ++;
	});

	Arena.spriteSheets['topfade'] = { img:null, spritesLoaded:false };
	loadSprites('game/assets/topfade.png',function(sprite){
		Arena.spriteSheets['topfade'].img=sprite;
		Arena.spriteSheets['topfade'].spritesLoaded = true;
		Arena.CURRENTASSETS ++;
	});

	Arena.spriteSheets['badfilter'] = { img:null, spritesLoaded:false };
	loadSprites('game/assets/badfilter.png',function(sprite){
		Arena.spriteSheets['badfilter'].img=sprite;
		Arena.spriteSheets['badfilter'].spritesLoaded = true;
		Arena.CURRENTASSETS ++;
	});

	Arena.spriteSheets['badfilteroverlay'] = { img:null, spritesLoaded:false };
	loadSprites('game/assets/badfilteroverlay.png',function(sprite){
		Arena.spriteSheets['badfilteroverlay'].img=sprite;
		Arena.spriteSheets['badfilteroverlay'].spritesLoaded = true;
		Arena.CURRENTASSETS ++;
	});

	/*ENEMIES + PLAYER*/
	Arena.spriteSheets['charactergood'] = { img:null, spritesLoaded:false };
	loadSprites('game/assets/charactergood.png',function(sprite){
		Arena.spriteSheets['charactergood'].img=sprite;
		Arena.spriteSheets['charactergood'].spritesLoaded = true;
		Arena.CURRENTASSETS ++;
	});

	Arena.spriteSheets['characterbad'] = { img:null, spritesLoaded:false };
	loadSprites('game/assets/characterbad.png',function(sprite){
		Arena.spriteSheets['characterbad'].img=sprite;
		Arena.spriteSheets['characterbad'].spritesLoaded = true;
		Arena.CURRENTASSETS ++;
	});


	Arena.spriteSheets['lightingbackground'] = { img:null, spritesLoaded:false };
	loadSprites('game/assets/lighting/backgrounddark.png',function(sprite){
		Arena.spriteSheets['lightingbackground'].img=sprite;
		Arena.spriteSheets['lightingbackground'].spritesLoaded = true;
		Arena.CURRENTASSETS ++;
	});

	Arena.spriteSheets['lightingbackgroundlight'] = { img:null, spritesLoaded:false };
	loadSprites('game/assets/lighting/backgroundlight.png',function(sprite){
		Arena.spriteSheets['lightingbackgroundlight'].img=sprite;
		Arena.spriteSheets['lightingbackgroundlight'].spritesLoaded = true;
		Arena.CURRENTASSETS ++;
	});

	Arena.spriteSheets['lights'] = { img:null, spritesLoaded:false };
	loadSprites('game/assets/lighting/lights.png',function(sprite){
		Arena.spriteSheets['lights'].img=sprite;
		Arena.spriteSheets['lights'].spritesLoaded = true;
		Arena.CURRENTASSETS ++;
	});

	Arena.spriteSheets['playerlight'] = { img:null, spritesLoaded:false };
	loadSprites('game/assets/lighting/playerlight.png',function(sprite){
		Arena.spriteSheets['playerlight'].img=sprite;
		Arena.spriteSheets['playerlight'].spritesLoaded = true;
		Arena.CURRENTASSETS ++;
	});

	Arena.spriteSheets['mesh'] = { img:null, spritesLoaded:false };
	loadSprites('game/assets/maskSheet.png',function(sprite){
		Arena.spriteSheets['mesh'].img=sprite;
		Arena.spriteSheets['mesh'].spritesLoaded = true;
		Arena.CURRENTASSETS ++;
	});

	Arena.spriteSheets['meshoverlay'] = { img:null, spritesLoaded:false };
	loadSprites('game/assets/maskSheetOverlay.png',function(sprite){
		Arena.spriteSheets['meshoverlay'].img=sprite;
		Arena.spriteSheets['meshoverlay'].spritesLoaded = true;
		Arena.CURRENTASSETS ++;
	});

	Arena.spriteSheets['explosion'] = { img:null, spritesLoaded:false };
	loadSprites('game/assets/explosions.png',function(sprite){
		Arena.spriteSheets['explosion'].img=sprite;
		Arena.spriteSheets['explosion'].spritesLoaded = true;
		Arena.CURRENTASSETS ++;
	});

};

Arena.prototype.Restart=function(){
	this.allowSpawnOfBazooka = true;
	this.triggerHouse = null;
	this.randomEnemyIndex = 0;
	this.previousRandomEnemyIndex = 0;
	this.isOnRoofTops = false;
	this.lastSpawnedObjectPositionAndWidth = 0;
	this.lastSpawnedHousePositionAndWidth = 0;
	this.lastSpawnedRoadHolePositionAndWidth = 0;
	/*this.lObjectBadIndexs.length = 0;
	this.lObjectIndexs.length = 0;*/
	this.availableIndexs.length = 0;
	this.viewport.x = 0;
	this.viewport.y = scrollHeight - playHeight;
	this.evilViewport.x = 138;
	this.shakeObj.Restart();
	this.shake = false;
	this.hitOverlay = false;
	this.currentAlpha = 1;
	this.spawningTraps = false;
	this.spawningHouses = false;
	this.houseSpawnAmount = 0;

	for(var i = 0, len = this.ladyofthenights.length; i < len; i++){
		this.ladyofthenights[i].Restart();
	};
	/*for(var i = 0, len = this.children.length; i < len; i++){
		this.children[i].Restart();
	};*/

			/*
	this.trucks = [];
	this.suvs = [];
	this.cars = [];
	this.bins = [];
*/

	for(var i = 0, len = this.trucks.length; i < len; i++){this.trucks[i].Restart()};
	for(var i = 0, len = this.suvs.length; i < len; i++){this.suvs[i].Restart()};
	for(var i = 0, len = this.cars.length; i < len; i++){this.cars[i].Restart()};
	for(var i = 0, len = this.bins.length; i < len; i++){this.bins[i].Restart()};

	for(var i = 0, len = this.houses.length; i < len; i++){this.houses[i].Restart();}
	for(var i = 0, len = this.traps.length; i < len; i++){this.traps[i].Restart();};
	for(var i = 0, len = this.bikes.length; i < len; i++){this.bikes[i].Restart();};

	for(var i = 0, len = this.snowmobile.length; i < len; i++){this.snowmobile[i].Restart();}
	for(var i = 0, len = this.bazooka.length; i < len; i++){this.bazooka[i].Restart();}
	for(var i = 0, len = this.booze.length; i < len; i++){this.booze[i].Restart();}


	//for(var i = 0, len = this.powerups.length; i < len; i++){this.powerups[i].Restart();};
	for(var i = 0, len = this.roadHoles.length; i < len; i++){this.roadHoles[i].Restart();};
	for(var i = 0, len = this.lights.length; i < len; i++){this.lights[i].Restart();};
	this.evilTimer = 0;
	this.Update();
}

Arena.prototype.Update=function(){
	
	//if(this.spawningHouses)this.spawnHousesForLevel();

	if(this.shake){this.doShake();}

	/*this.lObjectBadIndexs.length = 0;
	this.lObjectIndexs.length = 0;
	for(var i = 0, len = this.children.length; i < len; i++){
		this.children[i].Update();
		if(this.children[i].inView){
			this.lObjectIndexs.push(i); 
			if(this.children[i].isEvil)this.lObjectBadIndexs.push(i);
			continue;
		};
	};*/

	for(var i = 0, len = this.trucks.length; i < len; i++){this.trucks[i].Update()};
	for(var i = 0, len = this.suvs.length; i < len; i++){this.suvs[i].Update()};
	for(var i = 0, len = this.cars.length; i < len; i++){this.cars[i].Update()};
	for(var i = 0, len = this.bins.length; i < len; i++){this.bins[i].Update()};



	for(var i = 0, len = this.houses.length; i < len; i++){this.houses[i].Update();}
	for(var i = 0, len = this.bikes.length; i < len; i++){this.bikes[i].Update();};
	for(var i = 0, len = this.snowmobile.length; i < len; i++){this.snowmobile[i].Update();}
	for(var i = 0, len = this.bazooka.length; i < len; i++){this.bazooka[i].Update();}
	for(var i = 0, len = this.booze.length; i < len; i++){this.booze[i].Update();}

	for(var i = 0, len = this.roadHoles.length; i < len; i++){this.roadHoles[i].Update(); }
	for(var i = 0, len = this.traps.length; i < len; i++){ this.traps[i].Update(); }
	//for(var i = 0, len = this.powerups.length; i < len; i++){ this.powerups[i].Update(); }
	for(var i = 0, len = this.ladyofthenights.length; i < len; i++){ this.ladyofthenights[i].Update(); }
	
};



Arena.prototype.evilWorld=function(){
	if(!g_Player.isEvil || g_Player.dead)return false;
	//g_Player.Trigger(this);
};
Arena.prototype.catchPlayer=function(_amount){
	if(!_amount)_amount = 1;
	if(this.evilViewport.x +_amount >= playWidth){this.evilViewport.x = playWidth; g_Player.health = 0; g_Player.Trigger(g_Player);   return false;}
	this.evilViewport.x += _amount;
};

Arena.prototype.releaseTheHounds=function(_amount,random){
	if(g_Player.speedBoost || _amount <= 0)return false;
	if(g_Enemies.length <= 0)return false;
	if(random){ _amount = Math.round(Math.random() * (_amount-1)+1); }
	var prevSize = 0; 
	var i = 0;
	this.availableIndexs.length = 0;

	for(i = 0, len = g_Enemies.length; i < len; i++){
		if(g_Enemies[i].active || g_Enemies[i].inView){continue;}
		this.availableIndexs.push(i);
	};

	if(this.availableIndexs.length < _amount){
		for(i = 0, len = (_amount-this.availableIndexs.length); i < len; i++){
			g_Enemies.push( Character.RandomEnemy() );
			this.availableIndexs.push(g_Enemies.length-1);
			this.collisionChildren.push(g_Enemies[g_Enemies.length-1]);
		}
	};

	var gapsize = 0;
	for(i = 0; i < _amount; i++){ 
		g_Enemies[this.availableIndexs[i]].Spawn((g_Level.viewport.x + (playWidth)) + prevSize);
		gapsize = g_Utilities.currentState==='_1' ?  (Arena.TILESIZE * 3) : g_Utilities.currentState==='_2' ? (Arena.TILESIZE * Math.round(Math.random() * (3-2)+2)) : (Arena.TILESIZE * Math.round(Math.random() * (2-1)+1));
		prevSize += g_Enemies[this.availableIndexs[i]].size.x + gapsize;
	}

	return true;
	/*for(var i = 0, len = ; i < len; i++){
		this.randomEnemyIndex = Math.round(Math.random() * (g_Enemies.length-1));
		if(g_Enemies[this.randomEnemyIndex].active || g_Enemies[this.randomEnemyIndex].inView){continue;}
	
		g_Enemies[this.randomEnemyIndex].Spawn((g_Level.viewport.x + (playWidth)) + prevSize);
		prevSize += g_Enemies[this.randomEnemyIndex].size.x + (Arena.TILESIZE * Math.round(Math.random() * (3-1)+1));
	}*/
};
Arena.prototype.Render=function(){

	ctx.drawImage(Arena.spriteSheets['badbackground'].img,0,0,playWidth,playHeight);

	if(Arena.spriteSheets['testlevel2']&&Arena.spriteSheets['testlevel2'].img&&Arena.spriteSheets['testlevel2'].spritesLoaded){
		this.pX = Math.round((this.viewport.x % (Arena.spriteSheets['testlevel2'].img.width / 0.75)) * 0.75);
		for(var x = 0; x < (Arena.spriteSheets['testlevel2'].img.width/Arena.spriteSheets['testlevel2'].img.width) + 1; x++){
			ctx.drawImage(Arena.spriteSheets['testlevel2'].img,0,0,Arena.spriteSheets['testlevel2'].img.width,Arena.spriteSheets['testlevel2'].img.height,(x*Arena.spriteSheets['testlevel2'].img.width) - this.pX - this.shakeViewport.x, 0 - this.viewport.y - this.shakeViewport.y,Arena.spriteSheets['testlevel2'].img.width,Arena.spriteSheets['testlevel2'].img.height);
		};
	};

	if(Arena.spriteSheets['testlevel1']&&Arena.spriteSheets['testlevel1'].img&&Arena.spriteSheets['testlevel1'].spritesLoaded){
		this.pX = Math.round((this.viewport.x % (Arena.spriteSheets['testlevel1'].img.width / 1)) * 1);
		for(var x = 0; x < (Arena.spriteSheets['testlevel1'].img.width/Arena.spriteSheets['testlevel1'].img.width) + 1; x++){
			ctx.drawImage(Arena.spriteSheets['testlevel1'].img,0,0,Arena.spriteSheets['testlevel1'].img.width,Arena.spriteSheets['testlevel1'].img.height,(x*Arena.spriteSheets['testlevel1'].img.width) - this.pX - this.shakeViewport.x, 0 - this.viewport.y - this.shakeViewport.y,Arena.spriteSheets['testlevel1'].img.width,Arena.spriteSheets['testlevel1'].img.height);
		};
	};


	/*FOR LIGHTS */
	this.pXLIGHT = Math.round((this.viewport.x % (Arena.spriteSheets['testlevel1light'].img.width / 1)) * 1);


	/*MASK*/
	oCtx.clearRect(0,0,playWidth,playHeight);
	oCtx.globalCompositeOperation = 'source-over';
	
	if(Arena.spriteSheets['testlevel2bad']&&Arena.spriteSheets['testlevel2bad'].img&&Arena.spriteSheets['testlevel2bad'].spritesLoaded){
		this.pX = Math.round((this.viewport.x % (Arena.spriteSheets['testlevel2bad'].img.width / 0.75)) * 0.75);
		for(var x = 0; x < (Arena.spriteSheets['testlevel2bad'].img.width/Arena.spriteSheets['testlevel2bad'].img.width) + 1; x++){
			oCtx.drawImage(Arena.spriteSheets['testlevel2bad'].img,0,0,Arena.spriteSheets['testlevel2bad'].img.width,Arena.spriteSheets['testlevel2bad'].img.height,(x*Arena.spriteSheets['testlevel2bad'].img.width) - this.pX - this.shakeViewport.x, 0 - this.viewport.y - this.shakeViewport.y,Arena.spriteSheets['testlevel2bad'].img.width,Arena.spriteSheets['testlevel2bad'].img.height);
		};
	};

	if(Arena.spriteSheets['testlevel1bad']&&Arena.spriteSheets['testlevel1bad'].img&&Arena.spriteSheets['testlevel1bad'].spritesLoaded){
		this.pX = Math.round((this.viewport.x % (Arena.spriteSheets['testlevel1bad'].img.width / 1)) * 1);
		for(var x = 0; x < (Arena.spriteSheets['testlevel1bad'].img.width/Arena.spriteSheets['testlevel1bad'].img.width) + 1; x++){
			oCtx.drawImage(Arena.spriteSheets['testlevel1bad'].img,0,0,Arena.spriteSheets['testlevel1bad'].img.width,Arena.spriteSheets['testlevel1bad'].img.height,(x*Arena.spriteSheets['testlevel1bad'].img.width) - this.pX - this.shakeViewport.x, 0 - this.viewport.y - this.shakeViewport.y,Arena.spriteSheets['testlevel1bad'].img.width,Arena.spriteSheets['testlevel1bad'].img.height);
		};
	};

	if(!mobile){
		oCtx.globalCompositeOperation='overlay';
		if(Arena.spriteSheets['testlevel1light']&&Arena.spriteSheets['testlevel1light'].img&&Arena.spriteSheets['testlevel1light'].spritesLoaded){
			for(var x = 0; x < (Arena.spriteSheets['testlevel1light'].img.width/Arena.spriteSheets['testlevel1light'].img.width) + 1; x++){
				oCtx.drawImage(Arena.spriteSheets['testlevel1light'].img,0,0,Arena.spriteSheets['testlevel1light'].img.width,Arena.spriteSheets['testlevel1light'].img.height,(x*Arena.spriteSheets['testlevel1light'].img.width) - this.pXLIGHT - this.shakeViewport.x, 0 - this.viewport.y - this.shakeViewport.y ,Arena.spriteSheets['testlevel1light'].img.width,Arena.spriteSheets['testlevel1light'].img.height);
			};
		};
		oCtx.globalCompositeOperation = 'source-over';
	}

	for(var i = 0, len = this.roadHoles.length; i < len; i++){if(this.roadHoles[i].RenderEvil)this.roadHoles[i].RenderEvil(); }

	for(var i = 0, len = this.ladyofthenights.length; i < len; i++){ if(this.ladyofthenights[i].RenderEvil)this.ladyofthenights[i].RenderEvil(); }

	//for(var i = 0, len = this.lObjectBadIndexs.length; i < len; i++){  if(this.children[this.lObjectBadIndexs[i]].RenderEvil)this.children[this.lObjectBadIndexs[i]].RenderEvil();}
	
	for(var i = 0, len = this.trucks.length; i < len; i++){if(this.trucks[i].RenderEvil)this.trucks[i].RenderEvil()};
	for(var i = 0, len = this.suvs.length; i < len; i++){if(this.suvs[i].RenderEvil)this.suvs[i].RenderEvil()};
	for(var i = 0, len = this.cars.length; i < len; i++){if(this.cars[i].RenderEvil)this.cars[i].RenderEvil()};
	for(var i = 0, len = this.bins.length; i < len; i++){if(this.bins[i].RenderEvil)this.bins[i].RenderEvil()};

	for(var i = 0, len = this.houses.length; i < len; i++){if(this.houses[i].RenderEvil)this.houses[i].RenderEvil();}

	if(Arena.spriteSheets['lightingbackgroundlight']&&Arena.spriteSheets['lightingbackgroundlight'].img&&Arena.spriteSheets['lightingbackgroundlight'].spritesLoaded){
		oCtx.drawImage(Arena.spriteSheets['lightingbackgroundlight'].img, 0 , 0 , playWidth ,playHeight, 0,0 , playWidth,playHeight);
	};
	oCtx.globalCompositeOperation = 'destination-in';
	g_LevelMask.Render();
	/*ENDOFMASK*/


	for(var i = 0, len = this.roadHoles.length; i < len; i++){this.roadHoles[i].Render(); }

	if(Arena.spriteSheets['lightingbackground']&&Arena.spriteSheets['lightingbackground'].img&&Arena.spriteSheets['lightingbackground'].spritesLoaded){
		ctx.drawImage(Arena.spriteSheets['lightingbackground'].img, 0 , 0 , playWidth ,playHeight, 0,0 , playWidth,playHeight);
	};


	
	ctx.globalCompositeOperation='overlay';
	if(Arena.spriteSheets['testlevel1light']&&Arena.spriteSheets['testlevel1light'].img&&Arena.spriteSheets['testlevel1light'].spritesLoaded){
		for(var x = 0; x < (Arena.spriteSheets['testlevel1light'].img.width/Arena.spriteSheets['testlevel1light'].img.width) + 1; x++){
			ctx.drawImage(Arena.spriteSheets['testlevel1light'].img,0,0,Arena.spriteSheets['testlevel1light'].img.width,Arena.spriteSheets['testlevel1light'].img.height,(x*Arena.spriteSheets['testlevel1light'].img.width) - this.pXLIGHT - this.shakeViewport.x, 0 - this.viewport.y - this.shakeViewport.y ,Arena.spriteSheets['testlevel1light'].img.width,Arena.spriteSheets['testlevel1light'].img.height);
		};
	};

	ctx.globalCompositeOperation='color-dodge';
	if(Arena.spriteSheets['testlevel1lightdodge']&&Arena.spriteSheets['testlevel1lightdodge'].img&&Arena.spriteSheets['testlevel1lightdodge'].spritesLoaded){
		//var pX = Math.round((this.viewport.x % (Arena.spriteSheets['testlevel1lightdodge'].img.width / 1)) * 1);
		for(var x = 0; x < (Arena.spriteSheets['testlevel1lightdodge'].img.width/Arena.spriteSheets['testlevel1lightdodge'].img.width) + 1; x++){
			ctx.drawImage(Arena.spriteSheets['testlevel1lightdodge'].img,0,0,Arena.spriteSheets['testlevel1lightdodge'].img.width,Arena.spriteSheets['testlevel1lightdodge'].img.height,(x*Arena.spriteSheets['testlevel1lightdodge'].img.width) - this.pXLIGHT - this.shakeViewport.x, 0 - this.viewport.y - this.shakeViewport.y,Arena.spriteSheets['testlevel1lightdodge'].img.width,Arena.spriteSheets['testlevel1lightdodge'].img.height);
		};
	};


	ctx.globalCompositeOperation='source-over';

	for(var i = 0, len = this.ladyofthenights.length; i < len; i++){ this.ladyofthenights[i].Render(); }

	//for(var i = 0, len = this.lObjectIndexs.length; i < len; i++){ this.children[this.lObjectIndexs[i]].Render();}
	
	for(var i = 0, len = this.trucks.length; i < len; i++){this.trucks[i].Render()};
	for(var i = 0, len = this.suvs.length; i < len; i++){this.suvs[i].Render()};
	for(var i = 0, len = this.cars.length; i < len; i++){this.cars[i].Render()};
	for(var i = 0, len = this.bins.length; i < len; i++){this.bins[i].Render()};

	for(var i = 0, len = this.houses.length; i < len; i++){this.houses[i].Render();}

	if(this.evilViewport.x){ctx.drawImage(oCanvas,0,0,this.evilViewport.x,playHeight, 0, 0, this.evilViewport.x, playHeight);}
	
	//TRAPS AND POWER UPS
	for(var i = 0, len = this.bikes.length; i < len; i++){this.bikes[i].Render();};
	for(var i = 0, len = this.snowmobile.length; i < len; i++){this.snowmobile[i].Render();}
	for(var i = 0, len = this.bazooka.length; i < len; i++){this.bazooka[i].Render();}
	for(var i = 0, len = this.booze.length; i < len; i++){this.booze[i].Render();}

	//for(var i = 0, len = this.powerups.length; i < len; i++){ this.powerups[i].Render(); }
	for(var i = 0, len = this.traps.length; i < len; i++){ this.traps[i].Render(); }
	for(var i = 0, len = g_Enemies.length; i < len; i++)g_Enemies[i].Render();
	
	g_Player.Render();

	if(this.hitOverlay)this.playerHitRedRectangle();

	this.renderUI();

};

Arena.prototype.playerHitRedRectangle=function(){
	if(Arena.spriteSheets['hitredrectangle']&&Arena.spriteSheets['hitredrectangle'].img&&Arena.spriteSheets['hitredrectangle'].spritesLoaded){
		ctx.globalAlpha = this.currentAlpha;
		ctx.drawImage(Arena.spriteSheets['hitredrectangle'].img, 0 , 0 , playWidth ,playHeight, 0,0 , playWidth,playHeight);
		this.currentAlpha -= 0.05;
		ctx.globalAlpha = 1;
	}
	if(this.currentAlpha <= 0)this.hitOverlay = false;
};
Arena.prototype.setHitRedRectangle=function(){
	this.currentAlpha = 1;
	this.hitOverlay = true;
};

Arena.prototype.renderUI=function(){


	if(Arena.spriteSheets['badfilteroverlay']&&Arena.spriteSheets['badfilteroverlay'].img&&Arena.spriteSheets['badfilteroverlay'].spritesLoaded){
		ctx.drawImage(Arena.spriteSheets['badfilteroverlay'].img,0,0,Arena.spriteSheets['badfilteroverlay'].img.width,Arena.spriteSheets['badfilteroverlay'].img.height);
	}

	if(Arena.spriteSheets['topfade']&&Arena.spriteSheets['topfade'].img&&Arena.spriteSheets['topfade'].spritesLoaded){
		ctx.drawImage(Arena.spriteSheets['topfade'].img,0,0,Arena.spriteSheets['topfade'].img.width,Arena.spriteSheets['topfade'].img.height);
	}

};


Arena.prototype.incX=function(){
	if(this.viewport.x+playWidth > (scrollWidth))return false;
	this.viewport.x ++;
};
Arena.prototype.incY=function(){
	if(this.viewport.y+playHeight > (scrollHeight))return false;
	this.viewport.y ++;
};
Arena.prototype.decX=function(){
	if(this.viewport.x <= 0)return false;
	this.viewport.x --;
};
Arena.prototype.decY=function(){
	if(this.viewport.y <= 0)return false;
	this.viewport.y --;	
};
Arena.prototype.incAX=function(_val){
	this.viewport.x += _val;
};
Arena.prototype.incAY=function(_val){
	this.viewport.y += _val;
};
Arena.prototype.adjX=function(_val){
	this.viewport.x = _val;
};
Arena.prototype.adjY=function(_val){
	this.viewport.y = _val;
};


Arena.prototype.UpdateViewport=function(){
	this.viewport.x = g_Player.position.x - (playWidth/4);
	if(this.viewport.x <= 0) { this.viewport.x = 0; }
};

Arena.prototype.lerp=function(t,a,b){
	return (1-t)*a + t*b;
};


Arena.prototype.lockUpdateViewport=function(){
	this.viewport.y = this.lerp(0.2, this.viewport.y, (g_Player.position.y - (playHeight/2)) );
	if(this.viewport.y+playHeight >= (scrollHeight)){ this.viewport.y = (scrollHeight-playHeight); }
};

Arena.prototype.decreaseEvilViewport=function(_amount){
	if(!_amount)_amount = 2;
	if(this.evilViewport.x-_amount <= 138){this.evilViewport.x = 138; return;}
	this.evilViewport.x -= _amount;
};


Arena.prototype.doShake=function(){
	
	this.shakeObj.radius *=0.9; //diminish radius each frame
    this.shakeObj.randomAngle += (150 + Math.round(Math.random()%60)); //pick new angle 
    this.shakeObj.offset = {x:(( Math.sin(this.shakeObj.randomAngle) * this.shakeObj.radius) | 0), y:((Math.cos(this.shakeObj.randomAngle) * this.shakeObj.radius) | 0)}; //create offset 2d vector
   	
   	this.shakeViewport.x = this.shakeObj.offset.x;
   	this.shakeViewport.y = (this.viewport.y+playHeight)+this.shakeObj.offset.y >= /*this.levels[this.currentLevel].scrollHeight*/scrollHeight ? 0 : this.shakeObj.offset.y;

   	if(this.shakeObj.radius <= 1)this.shakeObj.Finish();
};

Arena.prototype.centerView=function(x,y){
	/*this.viewport.x = x - (playWidth / 4); 
	this.viewport.y = y - (playHeight / 2);
	
	if(this.viewport.x < 0) 
	{
		this.viewport.x = 0; 
	}
	if(this.viewport.x > scrollWidth - 1)
	{
		this.viewport.x = scrollWidth - 1; 
	}
	if(this.viewport.y < 0) 
	{
		this.viewport.y = 0; 
	}
	if(this.viewport.y > (scrollHeight-(playHeight/2)) - 1) 
	{
		this.viewport.y = (scrollHeight-(playHeight/2)) - 1; 
	}*/
};
Arena.prototype.isXCenter=function(x){
	return Math.abs((x == this.viewport.x +  (playWidth / 4))) || Math.abs(x == this.viewport.x - (playWidth / 4)) ? true : false; 
};
Arena.prototype.isYCenter=function(y){
	return (y == this.viewport.y +  (playHeight / 2) || y == this.viewport.y - (playHeight / 2)) ? true : false;
};

