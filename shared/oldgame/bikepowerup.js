function BikePowerUp(_opts){
/*	var randomIndex = Math.round(Math.random() * g_Level.collectableSpawnPoints.length-1);
	var _sp = g_Level.collectableSpawnPoints[randomIndex];
*/
	Powerup.call(this,{
		x:-1000,
		y:-1000,
		w:54,
		h:23,
		dx:96,
		dy:522
	});

	this.type = 'BikePowerUp';
	this.createLights((this.size.x/2),-(this.size.y/4));
};
BikePowerUp.prototype = Object.create(Powerup.prototype);
BikePowerUp.prototype.constructor=BikePowerUp;
BikePowerUp.prototype.parent = Powerup.prototype;

BikePowerUp.prototype.Spawn=function(_oPositionX){

	this.position.x = _oPositionX ? _oPositionX : (g_Level.viewport.x + (playWidth));
	this.position.y = scrollHeight-(Arena.TILESIZE*2);
	this.active = true;
	this.collision = true;

	for(var i = 0, len = g_Level.collisionChildren.length; i < len; i++){
		//if(!g_Level.collisionChildren[i].inView)continue;
		if(boundingBoxCollision(this,g_Level.collisionChildren[i],{x:this.position.x, y:this.position.y}, true)){
		
		if(g_Level.collisionChildren[i]!==this&&g_Level.collisionChildren[i].type==='BoozePowerUp' ||
		   g_Level.collisionChildren[i]!==this&&g_Level.collisionChildren[i].type==='BikePowerUp' || 
		   g_Level.collisionChildren[i]!==this&&g_Level.collisionChildren[i].type==='SnowMobilePowerUp' ||
		   g_Level.collisionChildren[i]!==this&&g_Level.collisionChildren[i].type==='BazookaPowerUp'||
		   g_Level.collisionChildren[i].type==='Bin' ||
		   g_Level.collisionChildren[i].type==='Truck' || 
		   g_Level.collisionChildren[i].type==='Suv' || 
		   g_Level.collisionChildren[i].type==='Car'){
		   	
			this.position.y = g_Level.collisionChildren[i].position.y - this.size.y - 1;
			//this.position.x = g_Level.collisionChildren[i].position.x + g_Level.collisionChildren[i].size.x + 1;
			continue;
		}

		if(g_Level.collisionChildren[i]===this || g_Level.collisionChildren[i].type==='Deer' || g_Level.collisionChildren[i].type==='Elf' || g_Level.collisionChildren[i].type==='CoinCollectable' )continue;
	
			this.position.y = g_Level.collisionChildren[i].position.y - this.size.y - 1;
			break;
		};

	};

};
