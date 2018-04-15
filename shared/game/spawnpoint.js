function SpawnPoint(_opts){

	this.position = new Vector(_opts&&_opts.x || -1000, _opts&&_opts.y || -1000);
	this.size = new Vector(_opts&&_opts.w || 32, _opts&&_opts.h || 32);
	this.bbox = this.size;
	this.type = 'SpawnPoint';

};