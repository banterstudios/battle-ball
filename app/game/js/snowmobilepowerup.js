function SnowMobilePowerUp(_opts){
/*	var randomIndex = Math.round(Math.random() * g_Level.collectableSpawnPoints.length-1);
	var _sp = g_Level.collectableSpawnPoints[randomIndex];
*/
	Powerup.call(this,{
		x:-1000,
		y:-1000, 
		w:55,
		h:26,
		dx:161,
		dy:517
	});

	this.type = 'SnowMobilePowerUp';

	this.createLights((this.size.x/2),0);
};
SnowMobilePowerUp.prototype = Object.create(Powerup.prototype);
SnowMobilePowerUp.prototype.constructor=SnowMobilePowerUp;
SnowMobilePowerUp.prototype.parent = Powerup.prototype;

