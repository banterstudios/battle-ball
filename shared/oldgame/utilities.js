function Utilities(){
	this.now = null;
	this.delta = null;
	this.then = null;
	this.start = Date.now();
	this.accumulator = 0.0;
	this.fixedDelta = 0.01;
	this.secondDelta = 0;
	this.FPS = 1000/60;
	this.type = 'Utilities';
	this.frameDivider = 1000;
	
	/*
	CHARACTER SPECIFIC
	*/
	this.characterNow = 0;
	this.characterThen = 0;
	this.characterDelta = 0; 


	/*ENEMIES*/
	/*this.oldd = 0;
	this.randomEnemyAmount = 2;*/

	/* PLAYER */
	this.olddp = 0;
	this.randomPlayerAmount = 5;

	/* ARENA */
	this.oldde = 0;
	this.randomEvilAmount = 1;

	/* TRAPS */
	this.olddt = 0;
	this.randomTrapAmount = 40;
	this.spawnAmount = 0;

	/*LADY OF THE NIGHT*/
	this.olddlotn = 0;
	this.randomlotnAmount = 5;

	/* SPAWN ENEMY */
	this.olddenemy = 0;
	this.randomEnemySpawnAmount = 60;

	this.oldddead = 0;
	this.deadamount = 2;
	this.deadstart = 0;
	this.deadnow = 0;
	this.deaddelta = 0;
	this.deadonce = false;

	var self = this;

	this.states = {

		_1:{
			finishTime:30,
			player:{  increaseSpeedTime:5, olddelta:0},
			powerups:{random:false, bike:false},
			bike:{spawnedBike:false, bikeSpawnTime:20 },
			objects:{random:false, objectsSpawnStartTime:15, objectsSpawnTime:10, olddelta:0, startedSpawning:false},
			gaps:{road:false, buildings:true},
			houses:{ gapFrequency:4, housesAmount:20, gapSpace:2 },
			enemies:{spawnEnemiesStartTime:5, random:true, spawnEnemies:true, spawnEnemiesAmount:2, spawnEnemiesTime:3, olddelta:0, startedSpawning:false, playerStepRelease:false },
			missiles:{ spawnMissiles:false, spawnMissilesAmount:0, spawnMissilesTime:-1},
			bazooka:{ spawnedBazooka:false, bazookaSpawnTime:3},
			Update:function(delta){

				if(delta % self.states['_1'].player.increaseSpeedTime === 0 && delta !== 0 && delta!==self.states['_1'].player.olddelta){
					self.states['_1'].player.olddelta = delta;
					g_Player.increaseSpeed();
				}

				if(delta % self.states['_1'].bike.bikeSpawnTime === 0 && delta !== 0 && !self.states['_1'].bike.spawnedBike){
					self.states['_1'].bike.spawnedBike = true;
					g_Level.spawnBike();

					self.states['_1'].powerups.random=true;
					self.states['_1'].powerups.bike = true;
				};

				if(delta >= self.states['_1'].enemies.spawnEnemiesStartTime || self.states['_1'].enemies.startedSpawning){
					self.states['_1'].enemies.startedSpawning = true;
					if(delta % self.states['_1'].enemies.spawnEnemiesTime === 0 && delta !== 0 && delta!==self.states['_1'].enemies.olddelta){
						
						self.states['_1'].enemies.olddelta = delta;
						g_Level.releaseTheHounds(self.states['_1'].enemies.spawnEnemiesAmount, self.states['_1'].enemies.random);
					}
				}

				if(delta % self.states['_1'].bazooka.bazookaSpawnTime === 0 && delta !== 0 && !self.states['_1'].bazooka.spawnedBazooka){
					
					self.states['_1'].bazooka.spawnedBazooka = true;
					g_Level.spawnBazooka(1);
				}

				if(delta >= self.states['_1'].objects.objectsSpawnStartTime || self.states['_1'].objects.startedSpawning){
					self.states['_1'].objects.startedSpawning = true
					if(delta % self.states['_1'].objects.objectsSpawnTime === 0 && delta !== 0 && delta!==self.states['_1'].objects.olddelta){
						self.states['_1'].objects.olddelta = delta;
						g_Level.spawnObjectForLevel();
					}
				}

				if(g_Level.spawningHouses){  
					g_Level.spawnHousesForLevel(self.states['_1'].houses.housesAmount,self.states['_1'].gaps.buildings,self.states['_1'].houses.gapFrequency,self.states['_1'].houses.gapSpace);
					g_Player.powerUp(Character.POWERUPS[g_Player.type].BIKE);
				}
			
				if(delta % self.states['_1'].finishTime === 0 && delta !== 0){
					self.changeState('_2');
				};
			},
			finish:function(){
				
				self.start = Date.now();
			}
		},
		_2:{
			finishTime:30,
			player:{  increaseSpeedTime:3, olddelta:0},
			powerups:{random:true, bike:true},
			bike:{spawnedBike:false, bikeSpawnTime:10},
			objects:{random:true, objectsSpawnStartTime:15, objectsSpawnTime:10, olddelta:0, startedSpawning:false},
			gaps:{road:true, buildings:true},
			houses:{ gapFrequency:4, housesAmount:25, gapSpace:2 },
			enemies:{random:true, spawnEnemies:true, spawnEnemiesAmount:2, spawnEnemiesTime:2, olddelta:0, playerStepRelease:true },
			missiles:{ spawnMissiles:false, spawnMissilesAmount:0, spawnMissilesTime:-1},
			roadHoles:{ spawnedRoadHole:false, spawnedRoadHoleAmount:1, spawnRoadHoleTime:2, gapSpace:3, olddelta:0},
			Update:function(delta){

				if(delta % self.states['_2'].player.increaseSpeedTime === 0 && delta !== 0 && delta!==self.states['_2'].player.olddelta){
					self.states['_2'].player.olddelta = delta;
					g_Player.increaseSpeed();
				}

				
				
				if(delta % self.states['_2'].enemies.spawnEnemiesTime === 0 && delta !== 0 && delta!==self.states['_2'].enemies.olddelta){
					self.states['_2'].enemies.spawnEnemiesTime = Math.round(Math.random() * (3-2)+2);
					//if(self.states['_2'].enemies.spawnEnemiesTime === 1){ self.states['_2'].enemies.spawnEnemiesAmount = 1; }
					if(self.states['_2'].enemies.spawnEnemiesTime === 2){ self.states['_2'].enemies.spawnEnemiesAmount = 1; }
					if(self.states['_2'].enemies.spawnEnemiesTime === 3){ self.states['_2'].enemies.spawnEnemiesAmount = 2; }

					self.states['_2'].enemies.olddelta = delta;
					g_Level.releaseTheHounds(self.states['_2'].enemies.spawnEnemiesAmount, self.states['_2'].enemies.random);
				}
				
				if(delta % self.states['_2'].bike.bikeSpawnTime === 0 && delta !== 0 && delta!==self.states['_2'].bike.olddelta){
					self.states['_2'].bike.olddelta = delta;
					self.states['_2'].bike.bikeSpawnTime = Math.round(Math.random() * (35-25)+25);
					g_Level.spawnBike();
				};

				if(delta % self.states['_2'].objects.objectsSpawnTime === 0 && delta !== 0 && delta!==self.states['_2'].objects.olddelta){
					self.states['_2'].objects.olddelta = delta;
					self.states['_2'].objects.objectsSpawnTime = Math.round(Math.random() * (30-20)+20);
					
					g_Level.spawnObjectForLevel(Math.round(Math.random() * (4-2)+2),Math.round(Math.random() * ( 4 )));

				};


				if(g_Level.spawningHouses){  
					g_Level.spawnHousesForLevel(self.states['_2'].houses.housesAmount,self.states['_2'].gaps.buildings,self.states['_2'].houses.gapFrequency,self.states['_2'].houses.gapSpace);
					g_Player.powerUp(Character.POWERUPS[g_Player.type].BIKE);
				}

				if(g_Player.velocity.x >= 2.8){
					self.changeState('_3');
				}
				

			},
			finish:function(){ self.start = Date.now(); this.allowSpawnOfBazooka = false;  }
		},
		_3:{
			finishTime:30,
			player:{  increaseSpeedTime:3, olddelta:0},
			powerups:{random:true, bike:true, bazookaTimeSpawn:10, olddelta:0},
			bike:{spawnedBike:false, bikeSpawnTime:10},
			objects:{random:true, objectsSpawnStartTime:15, objectsSpawnTime:10, olddelta:0, startedSpawning:false},
			gaps:{road:true, buildings:true},
			houses:{ gapFrequency:4, housesAmount:40, gapSpace:3 },
			enemies:{random:true, spawnEnemies:true, spawnEnemiesAmount:2, spawnEnemiesTime:2, olddelta:0,playerStepRelease:true },
			missiles:{ spawnMissiles:true, spawnMissilesAmount:1, spawnMissilesTime:60, olddelta:0, speed:3},
			roadHoles:{ spawnedRoadHole:false, spawnedRoadHoleAmount:1, spawnRoadHoleTime:2, gapSpace:3, olddelta:0},
			Update:function(delta){

				if(delta % self.states['_3'].player.increaseSpeedTime === 0 && delta !== 0 && delta!==self.states['_3'].player.olddelta){
					self.states['_3'].player.olddelta = delta;
					g_Player.increaseSpeed();
				}

				
				if(delta % self.states['_3'].powerups.bazookaTimeSpawn === 0 && delta !== 0 && delta!==self.states['_3'].powerups.olddelta){
					self.states['_3'].powerups.olddelta = delta;
					self.states['_3'].powerups.bazookaTimeSpawn = Math.round(Math.random() * (60-40)+40);
					if(!g_Player.hasBazooka){g_Level.allowSpawnOfBazooka = true;}else{g_Level.allowSpawnOfBazooka = false;}
				}

				if(delta % self.states['_3'].objects.objectsSpawnTime === 0 && delta !== 0 && delta!==self.states['_3'].objects.olddelta){
					self.states['_3'].objects.olddelta = delta;
					self.states['_3'].objects.objectsSpawnTime = Math.round(Math.random() * (10-5)+5);
					
					if(self.states['_3'].objects.objectsSpawnTime <= 5){
						for(var i = 0, len = Math.round(Math.random() * (2-1)+1); i < len; i++){
							g_Level.spawnObjectForLevel(Math.round(Math.random() * (2-1)+1),Math.round(Math.random() * ( 4 )), 0,0,4,2);
						}
					}else
					if(self.states['_3'].objects.objectsSpawnTime <= 8){
						for(var i = 0, len = Math.round(Math.random() * (3-1)+1); i < len; i++){
							g_Level.spawnObjectForLevel(Math.round(Math.random() * (3-2)+2),Math.round(Math.random() * ( 4 )), 0,0,5,2);
						}
					}else{
						for(var i = 0, len = Math.round(Math.random() * (4-2)+2); i < len; i++){
							g_Level.spawnObjectForLevel(Math.round(Math.random() * (3-2)+2),Math.round(Math.random() * ( 4 )), 0,0,5,2);
						}
					}
					

				};

				if(delta % self.states['_3'].missiles.spawnMissilesTime === 0 && delta !== 0 && delta !== self.states['_3'].missiles.olddelta){
					self.states['_3'].missiles.olddelta = delta;
					self.states['_3'].missiles.spawnMissilesTime = Math.round(Math.random() * (50-20)+20);
					if(delta % 60 === 0&&self.states['_3'].missiles.spawnMissilesAmount<4){self.states['_3'].missiles.spawnMissilesAmount++; self.states['_3'].missiles.speed++; }
					//this.spawnAmount = g_Player.velocity.x <= (g_Player.maxVelocity.x * 0.25) ? 1 : g_Player.velocity.x <= (g_Player.maxVelocity.x * 0.8) ? Math.round(Math.random() * (2-1)+1) : g_Player.velocity.x <= (g_Player.maxVelocity.x * 0.9) ? Math.round(Math.random() * (3-2)+2) : Math.round(Math.random() * (4-2)+2);  
					g_Level.spawnTrap(self.states['_3'].missiles.spawnMissilesAmount,self.states['_3'].missiles.speed);

				};

				if(delta % self.states['_3'].bike.bikeSpawnTime === 0 && delta !== 0 && delta!==self.states['_3'].bike.olddelta){
					self.states['_3'].bike.olddelta = delta;
					self.states['_3'].bike.bikeSpawnTime = Math.round(Math.random() * (35-25)+25);
					g_Level.spawnBike();
				};

				if(delta % self.states['_3'].enemies.spawnEnemiesTime === 0 && delta !== 0 && delta!==self.states['_3'].enemies.olddelta){
					self.states['_3'].enemies.spawnEnemiesTime = Math.round(Math.random() * (2-1)+1);
					if(self.states['_3'].enemies.spawnEnemiesTime === 1){ self.states['_3'].enemies.spawnEnemiesAmount = Math.round(Math.random() * (3-2)+2); }
					if(self.states['_3'].enemies.spawnEnemiesTime === 2){ self.states['_3'].enemies.spawnEnemiesAmount = Math.round(Math.random() * (4-2)+2); }
					
					self.states['_3'].enemies.olddelta = delta;
					g_Level.releaseTheHounds(self.states['_3'].enemies.spawnEnemiesAmount, self.states['_3'].enemies.random);
				}




				if(g_Level.spawningHouses){
					 self.states['_3'].houses.gapFrequency = Math.round(Math.random() * (1));//Math.round(Math.random() * (3-1)+1);
					 self.states['_3'].houses.gapSpace = Math.round(Math.random() * (4-2)+2);
					 if(g_Player.velocity.x >= g_Player.maxVelocity.x){ self.states['_3'].houses.gapSpace = Math.round(Math.random() * (4-3)+3); };
					g_Level.spawnHousesForLevel(self.states['_3'].houses.housesAmount,self.states['_3'].gaps.buildings,self.states['_3'].houses.gapFrequency,self.states['_3'].houses.gapSpace);
					g_Player.powerUp(Character.POWERUPS[g_Player.type].BIKE);
				}

			},
			finish:function(){ self.start = Date.now();  }
		},

	};

	this.currentState = '_1';

};
Utilities.prototype.changeState=function(_state){
	this.states[this.currentState].finish();
	this.currentState = _state;
}
Utilities.prototype.Update=function(){

	if(g_Player.dead){
		if(!this.deadonce){  this.deadstart = Date.now(); this.deadonce = true;}
		this.deadnow = Date.now();
		this.deaddelta = this.deadnow - this.deadstart;
		this.deaddelta /= 1000;
		this.deaddelta = Math.round(this.deaddelta);
		
		if(this.deaddelta % this.deadamount === 0 && this.deaddelta !== 0 && this.deaddelta !== this.oldddead){
			sounds.background.stop(); 
			game.gameState = game.STATES.MENU; 
			PixelationImageMenu('gameover');
		}
	};

	if(debug || g_Player.dead)return false;

	//this.delta
	this.secondDelta = this.now - this.start;
	this.secondDelta /= 1000;
	this.secondDelta = Math.round(this.secondDelta);


	this.states[this.currentState].Update(this.secondDelta);

	if(this.secondDelta % this.randomlotnAmount === 0 && this.secondDelta !== 0 && this.secondDelta !== this.olddlotn){
		this.olddlotn = this.secondDelta;
		this.randomlotnAmount = Math.round(Math.random() * (3-2)+2);
		g_Level.ladyofthenights[Math.round(Math.random() * (g_Level.ladyofthenights.length-1))].startSmoking();	
	};






	/*if(this.secondDelta % this.randomPlayerAmount === 0 && this.secondDelta !== 0 && this.secondDelta !== this.olddp){
		this.olddp = this.secondDelta;
		this.randomPlayerAmount = 5;
		// do something
		g_Player.increaseSpeed();
	}

	if(this.secondDelta % this.randomEvilAmount === 0 && this.secondDelta !== 0 && this.secondDelta !== this.oldde){
		this.oldde = this.secondDelta;
		this.randomEvilAmount = 1;
		// do something
		//pick a random enemy logic
		g_Level.evilWorld();
	}


	if(this.secondDelta % this.randomTrapAmount === 0 && this.secondDelta !== 0 && this.secondDelta !== this.olddt){
		this.olddt = this.secondDelta;
		this.randomTrapAmount = Math.round(Math.random() * (60-50)+50);
		this.spawnAmount = g_Player.velocity.x <= (g_Player.maxVelocity.x * 0.25) ? 1 : g_Player.velocity.x <= (g_Player.maxVelocity.x * 0.8) ? Math.round(Math.random() * (2-1)+1) : g_Player.velocity.x <= (g_Player.maxVelocity.x * 0.9) ? Math.round(Math.random() * (3-2)+2) : Math.round(Math.random() * (4-2)+2);  
		g_Level.spawnTrap(this.spawnAmount);

	};


	if(this.secondDelta % this.randomlotnAmount === 0 && this.secondDelta !== 0 && this.secondDelta !== this.olddlotn){
		this.olddlotn = this.secondDelta;
		this.randomlotnAmount = Math.round(Math.random() * (3-2)+2);
		g_Level.ladyofthenights[Math.round(Math.random() * (g_Level.ladyofthenights.length-1))].startSmoking();	
	};

	if(this.secondDelta % this.randomEnemySpawnAmount === 0 && this.secondDelta !== 0 && this.secondDelta !== this.olddenemy){
		this.olddenemy = this.secondDelta;
		g_Level.amountofenemies = g_Level.amountofenemies >= 6 ? 6 : g_Level.amountofenemies+1;
	};
*/

};

Utilities.prototype.Restart=function(){
	this.now = null;
	this.delta = null;
	this.then = null;
	this.accumulator = 0.0;
	this.secondDelta = 0;
	this.start = Date.now();

	this.characterNow = 0;
	this.characterThen = 0;
	this.characterDelta = 0; 

	this.currentState = '_1';

	/*ENEMIES*/
	/*this.oldd = 0;
	this.randomEnemyAmount = 2;*/

	/* PLAYER */
	this.olddp = 0;
	this.randomPlayerAmount = 5;

	/* ARENA */
	this.oldde = 0;
	this.randomEvilAmount = 1;

	/* TRAPS */
	this.olddt = 0;
	this.randomTrapAmount = 40;
	this.spawnAmount = 0;

	this.olddlotn = 0;
	this.randomlotnAmount = 5;


	/* SPAWN ENEMY */
	this.olddenemy = 0;
	this.randomEnemySpawnAmount = 60;

	this.oldddead = 0;
	this.deadamount = 2;
	this.deadstart = 0;
	this.deadnow = 0;
	this.deaddelta = 0;
	this.deadonce = false;

	this.states['_1'].bike.spawnedBike = false;
	this.states['_1'].bazooka.spawnedBazooka = false;
	this.states['_1'].powerups.random=false;
	this.states['_1'].powerups.bike = false;
	this.states['_1'].enemies.startedSpawning = false;
	this.states['_1'].objects.startedSpawning = false;
	this.states['_1'].bazooka.spawnedBazooka = false;
	this.states['_1'].objects.startedSpawning = false;


	this.states['_2'].roadHoles.spawnedRoadHole = false;
	this.states['_2'].powerups.bike = true;
	this.states['_2'].enemies.spawnEnemiesTime = 2;
	this.states['_2'].enemies.spawnEnemiesAmount = 2;
	this.states['_2'].bike.bikeSpawnTime = 10;
	this.states['_2'].objects.objectsSpawnTime = 10;



	this.states['_3'].roadHoles.spawnedRoadHole = false;
	this.states['_3'].powerups.bike = true;
	this.states['_3'].missiles.spawnMissilesTime = 60;
	this.states['_3'].missiles.spawnMissilesAmount = 1;
	this.states['_3'].missiles.speed = 1;
	this.states['_3'].enemies.spawnEnemiesTime = 2;
	this.states['_3'].enemies.spawnEnemiesAmount = 2;
	this.states['_3'].bike.bikeSpawnTime = 10;
	this.states['_3'].objects.objectsSpawnTime = 10;
	this.states['_3'].houses.gapFrequency = 4;
	this.states['_3'].houses.gapSpace = 3;
	this.states['_3'].powerups.bazookaTimeSpawn = 10;





};
