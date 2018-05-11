function House(_opts){
	LevelObject.call(this,_opts);
	this.type = 'House';
};
House.prototype = Object.create(LevelObject.prototype);
House.prototype.constructor=House;
House.prototype.parent = LevelObject.prototype;


House.prototype.Spawn=function(_position, trigger){
	for(var i = 0, len = this.children.length; i<len;i++)this.children[i].Restart();
	this.position.x = _position;
	this.trigger = trigger;
	//if(_offsetwidth)this.position.x += _offsetwidth;
	this.dead = false;
	this.collision = this.startCollision;
	this.position.y = scrollHeight - (this.size.y);
};
