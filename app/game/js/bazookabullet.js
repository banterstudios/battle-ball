function BazookaBullet(_opts){
	Bullet.call(this, _opts);
	this.type = 'BazookaBullet';
	this.strength = 80;
};
BazookaBullet.prototype = Object.create(Bullet.prototype);
BazookaBullet.prototype.constructor=BazookaBullet;
BazookaBullet.prototype.parent = Bullet.prototype;
