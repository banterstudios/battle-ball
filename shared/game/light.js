function Light(_opts){

	this.position = new Vector(_opts&&_opts.x || -1000, _opts&&_opts.y || -1000);
	this.staticPosition = new Vector(_opts&&_opts.x || -1000, _opts&&_opts.y || -1000);
	this.size = new Vector(_opts&&_opts.w || 0, _opts&&_opts.h || 0);
	this.dest = new Vector(_opts&&_opts.dx || 0, _opts&&_opts.dy || 0);
	this.srcsize = new Vector(_opts&&_opts.sw || this.size.x, _opts&&_opts.sh || this.size.y);
	this.offset = new Vector(_opts&&_opts.ox || 0, _opts&&_opts.oy || 0);
	this.inView = false;
	//this.type = this.constructor.name;
	this.type = 'Light';
	this.flicker = _opts&&_opts.flicker || Light.FLICKER.RANDOM;
	this.name = _opts&&_opts.name || 'default';
	this.compositeOperation = _opts&&_opts.compositeOperation || 'color-dodge';
	this.imageName = _opts&&_opts.imageName || 'lights';
	this.rotate = _opts&&_opts.rotate || false;
	this.rotation = 1;
	this.lightoffset = new Vector(_opts&&_opts.lox || 0, _opts&&_opts.loy || 0);
};

Light.FLICKER = {
	RANDOM:{
		Render:function(){
			if(Math.round(Math.random() * (4))===0) ctx.globalAlpha = Math.random() * (1);
		},
		Finish:function(){
			ctx.globalAlpha = 1;
		},
		name:'RANDOM'
	},
	INITIAL:{
		Render:function(){
			
		},
		Finish:function(){
			
		},
		name:'INITIAL'
	},
	LINEAR:{
		currentTimer:0,
		isOff:false,
		currentOffset:120,
		Render:function(){
			if(this.isOff){
				ctx.globalAlpha = 0.5;
			}else{
				ctx.globalAlpha = 1;
			}

			if(this.currentTimer++ >= this.currentOffset){
				this.currentTimer = 0;
				this.currentOffset = Math.round(Math.random() * (120-90)+90);
				this.isOff = !this.isOff;
			}
		},
		Finish:function(){
			ctx.globalAlpha = 1;
		},
		name:'LINEAR'
	}
};

Light.prototype.Restart=function(){
	this.position.x = this.staticPosition.x;
	this.position.y = this.staticPosition.y;
	this.rotation = 1;
};
Light.prototype.Render=function(_offset){

	if(_offset)this.position.x = this.staticPosition.x + _offset;


	if(!Arena.spriteSheets[this.imageName] || !Arena.spriteSheets[this.imageName].img || !Arena.spriteSheets[this.imageName].spritesLoaded)return false;
	if((this.position.x-g_Level.viewport.x) > playWidth || (this.position.x+this.size.x)-g_Level.viewport.x <= 0 || (this.position.y+this.size.y)<= 0 || (this.position.y >= playHeight+g_Level.viewport.y)){this.inView=false; return false;}

	this.flicker.Render();
	ctx.globalCompositeOperation = this.compositeOperation;

	if(this.rotate){
	
		ctx.save();
			ctx.translate(((this.position.x-this.offset.x)+(this.size.x/2)) - g_Level.viewport.x, ((this.position.y-this.offset.y)+(this.size.y/2)) - g_Level.viewport.y);
			this.rotation +=1;
			ctx.rotate(this.rotation * Math.PI / 180);
			ctx.translate(-(((this.position.x-this.offset.x)+(this.size.x/2)) - g_Level.viewport.x), -(((this.position.y-this.offset.y)+(this.size.y/2)) - g_Level.viewport.y));	
			ctx.drawImage(Arena.spriteSheets[this.imageName].img, this.dest.x, this.dest.y, this.srcsize.x, this.srcsize.y, (this.position.x-this.offset.x) - g_Level.viewport.x - g_Level.shakeViewport.x, (this.position.y-this.offset.y) - g_Level.viewport.y - g_Level.shakeViewport.y, this.size.x, this.size.y);
		ctx.restore();

	}else{
		ctx.drawImage(Arena.spriteSheets[this.imageName].img, this.dest.x, this.dest.y, this.srcsize.x, this.srcsize.y, (this.position.x-this.offset.x) - g_Level.viewport.x - g_Level.shakeViewport.x, (this.position.y-this.offset.y) - g_Level.viewport.y - g_Level.shakeViewport.y, this.size.x, this.size.y);
	}

	ctx.globalCompositeOperation = 'source-over';
	this.flicker.Finish();
	
};


Light.prototype.Update=function(x,y,w,h){
	this.position.x = x - ((w)/2) + this.lightoffset.x;
	this.position.y = y - ((h)/2) + this.lightoffset.y;
};


