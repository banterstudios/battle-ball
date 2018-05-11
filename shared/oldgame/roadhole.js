function RoadHole(_opts){
	LevelObject.call(this,_opts);
	this.type = 'RoadHole';
	this.roadAmount = 3;

	this.dest = new Vector(320,320);
	this.dest1 = new Vector((320+32),320);
	this.dest2 = new Vector((320+(32+64)),320);
	
	this.blockStartSize = new Vector(32,47);
	this.blockMiddleSize = new Vector(64,47);
	this.blockEndSize = new Vector(32,47);

	this.offsetBoundingBox = new Vector(10,(this.size.y/2)+5);
};
RoadHole.prototype = Object.create(LevelObject.prototype);
RoadHole.prototype.constructor=RoadHole;
RoadHole.prototype.parent = LevelObject.prototype;


RoadHole.prototype.configureBoundingBoxAndSize=function(_gapSpace){
	this.roadAmount = _gapSpace;

	if(_gapSpace===2){
		this.size.x = 64;
		this.size.y = 47;
		this.bbox.x = 64;
		this.bbox.y = 47;
	}else
	if(_gapSpace===3){
		this.size.x = 128;
		this.size.y = 47;
		this.bbox.x = 128;
		this.bbox.y = 47;
	}

};

RoadHole.prototype.Spawn=function(_position, _gapSpace){
	
	this.configureBoundingBoxAndSize(_gapSpace);

	for(var i = 0, len = this.children.length; i<len;i++)this.children[i].Restart();
	this.position.x = _position;
	this.dead = false;
	this.collision = true;
	this.position.y = scrollHeight - (this.size.y) - 8;

	for(var i = 0, len = g_Level.collisionChildren.length; i < len; i++){
		//if(!this.collisionChildren[i].inView)continue;
		if(g_Level.collisionChildren[i]===this || g_Level.collisionChildren[i].type !=='Truck'&&g_Level.collisionChildren[i].type !=='Car'&&g_Level.collisionChildren[i].type !=='Suv'&&g_Level.collisionChildren[i].type !=='Bin')continue;

		if(boundingBoxCollision(this,g_Level.collisionChildren[i],{x:this.position.x, y:this.position.y})){
			this.position.x = g_Level.collisionChildren[i].position.x + g_Level.collisionChildren[i].size.x + Arena.TILESIZE;
			return true;	
		};
	};
};

RoadHole.prototype.Render=function(){

	if( !Arena.spriteSheets['objectsbad'].img || !Arena.spriteSheets['objectsgood'].img || !Arena.spriteSheets['objectsbad'].spritesLoaded || !Arena.spriteSheets['objectsgood'].spritesLoaded || this.dead  || !this.inView)return;

	if(debug&&this.collision){
		ctx.strokeStyle='#0000ff';
		ctx.strokeRect(this.position.x-g_Level.viewport.x,this.position.y-g_Level.viewport.y,this.size.x,this.size.y);
	}

	if(this.roadAmount===2){
		ctx.drawImage(Arena.spriteSheets['objectsgood'].img, this.dest.x, this.dest.y, this.blockStartSize.x,this.blockStartSize.y, (this.position.x - g_Level.viewport.x - g_Level.shakeViewport.x), this.position.y - g_Level.viewport.y - g_Level.shakeViewport.y, this.blockStartSize.x,this.blockStartSize.y);
		ctx.drawImage(Arena.spriteSheets['objectsgood'].img, this.dest2.x, this.dest2.y, this.blockEndSize.x,this.blockEndSize.y, ((this.position.x+this.blockStartSize.x) - g_Level.viewport.x - g_Level.shakeViewport.x), (this.position.y) - g_Level.viewport.y - g_Level.shakeViewport.y, this.blockEndSize.x,this.blockEndSize.y);
	}else
	if(this.roadAmount===3){
		ctx.drawImage(Arena.spriteSheets['objectsgood'].img, this.dest.x, this.dest.y, this.blockStartSize.x,this.blockStartSize.y, (this.position.x - g_Level.viewport.x - g_Level.shakeViewport.x), this.position.y - g_Level.viewport.y - g_Level.shakeViewport.y, this.blockStartSize.x,this.blockStartSize.y);
		ctx.drawImage(Arena.spriteSheets['objectsgood'].img, this.dest1.x, this.dest1.y, this.blockMiddleSize.x,this.blockMiddleSize.y, ((this.position.x+this.blockStartSize.x) - g_Level.viewport.x - g_Level.shakeViewport.x), (this.position.y) - g_Level.viewport.y - g_Level.shakeViewport.y, this.blockMiddleSize.x,this.blockMiddleSize.y);
		ctx.drawImage(Arena.spriteSheets['objectsgood'].img, this.dest2.x, this.dest2.y, this.blockEndSize.x,this.blockEndSize.y, ((this.position.x+(this.blockStartSize.x+this.blockMiddleSize.x)) - g_Level.viewport.x - g_Level.shakeViewport.x), (this.position.y) - g_Level.viewport.y - g_Level.shakeViewport.y, this.blockEndSize.x,this.blockEndSize.y);
	};
	

	for(var i = 0, len = this.lights.length; i < len; i++)this.lights[i].Render();
	//return;
};

RoadHole.prototype.RenderEvil=function(){
		
	if(!Arena.spriteSheets['objectsbad'].img || !Arena.spriteSheets['objectsbad'].spritesLoaded || !this.isEvil || this.dead || !this.inView)return false;
	//this.evilPosition.x = (((g_Level.evilViewport.x)) - ((this.position.x) - g_Level.viewport.x));
	//this.evilPosition.y = this.size.y;
	//if(this.evilPosition.x >= this.size.x){this.evilPosition.x = this.size.x;}
	
	if(this.roadAmount===2){
		oCtx.drawImage(Arena.spriteSheets['objectsgood'].img, this.dest.x, this.dest.y, this.blockStartSize.x,this.blockStartSize.y, (this.position.x - g_Level.viewport.x - g_Level.shakeViewport.x), this.position.y - g_Level.viewport.y - g_Level.shakeViewport.y, this.blockStartSize.x,this.blockStartSize.y);
		oCtx.drawImage(Arena.spriteSheets['objectsgood'].img, this.dest2.x, this.dest2.y, this.blockEndSize.x,this.blockEndSize.y, ((this.position.x+this.blockStartSize.x) - g_Level.viewport.x - g_Level.shakeViewport.x), (this.position.y) - g_Level.viewport.y - g_Level.shakeViewport.y, this.blockEndSize.x,this.blockEndSize.y);
	}else
	if(this.roadAmount===3){
		oCtx.drawImage(Arena.spriteSheets['objectsbad'].img, this.dest.x, this.dest.y, this.blockStartSize.x,this.blockStartSize.y, (this.position.x - g_Level.viewport.x - g_Level.shakeViewport.x), this.position.y - g_Level.viewport.y - g_Level.shakeViewport.y, this.blockStartSize.x,this.blockStartSize.y);
		oCtx.drawImage(Arena.spriteSheets['objectsbad'].img, this.dest1.x, this.dest1.y, this.blockMiddleSize.x,this.blockMiddleSize.y, ((this.position.x+this.blockStartSize.x) - g_Level.viewport.x - g_Level.shakeViewport.x), (this.position.y) - g_Level.viewport.y - g_Level.shakeViewport.y, this.blockMiddleSize.x,this.blockMiddleSize.y);
		oCtx.drawImage(Arena.spriteSheets['objectsbad'].img, this.dest2.x, this.dest2.y, this.blockEndSize.x,this.blockEndSize.y, ((this.position.x+(this.blockStartSize.x+this.blockMiddleSize.x)) - g_Level.viewport.x - g_Level.shakeViewport.x), (this.position.y) - g_Level.viewport.y - g_Level.shakeViewport.y, this.blockEndSize.x,this.blockEndSize.y);
	};

	//if(this.evilPosition.x)oCtx.drawImage(Arena.spriteSheets['objectsbad'].img, (this.dest.x) , (this.dest.y) , this.evilPosition.x ,this.size.y, (this.position.x - g_Level.viewport.x - g_Level.shakeViewport.x), this.position.y - g_Level.viewport.y - g_Level.shakeViewport.y, this.evilPosition.x,this.size.y);

};
