function BazookaPowerUp(_opts){
/*	var randomIndex = Math.round(Math.random() * g_Level.collectableSpawnPoints.length-1);
	var _sp = g_Level.collectableSpawnPoints[randomIndex];
*/
	Powerup.call(this,{
		x:-1000,
		y:-1000,
		w:Arena.TILESIZE,
		h:Arena.TILESIZE,
		dx:320,
		dy:480
	});

	this.type = 'BazookaPowerUp';

	this.createLights(3,0);
};
BazookaPowerUp.prototype = Object.create(Powerup.prototype);
BazookaPowerUp.prototype.constructor=BazookaPowerUp;
BazookaPowerUp.prototype.parent = Powerup.prototype;