function BoozePowerUp(_opts){
	/*var randomIndex = Math.round(Math.random() * g_Level.collectableSpawnPoints.length-1);
	var _sp = g_Level.collectableSpawnPoints[randomIndex];*/

	Powerup.call(this,{
		x:-1000,
		y:-1000,
		w:Arena.TILESIZE,
		h:Arena.TILESIZE,
		dx:64,
		dy:512
	});

	this.type = 'BoozePowerUp';

	this.createLights(2,1);

};
BoozePowerUp.prototype = Object.create(Powerup.prototype);
BoozePowerUp.prototype.constructor=BoozePowerUp;
BoozePowerUp.prototype.parent = Powerup.prototype;