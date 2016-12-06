function GunBullet(_opts){
	Bullet.call(this, _opts);
	this.type = 'GunBullet';
	this.strength = 50;
};
GunBullet.prototype = Object.create(Bullet.prototype);
GunBullet.prototype.constructor=GunBullet;
GunBullet.prototype.parent = Bullet.prototype;

