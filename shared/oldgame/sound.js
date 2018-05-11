var sounds = {
	jump:{
		audio: new Howl({urls:['game/assets/sounds/Jump.mp3','game/assets/sounds/Jump.ogg', 'game/assets/sounds/Jump.wav'], volume:0.5}),//document.getElementById("jump"),
		play:function(){ if(!sfx)return false; sounds.jump.audio.pause(); /*sounds.jump.audio.currentTime=0; */sounds.jump.audio.play(); },
		stop:function(){ if(!sfx)return false; sounds.jump.audio.pause(); /*sounds.jump.audio.currentTime=0;*/ }
	},
	bazooka:{
		audio:new Howl({urls:['game/assets/sounds/bazooka.mp3','game/assets/sounds/bazooka.ogg', 'game/assets/sounds/bazooka.wav'], volume:0.5}),//new Audio('game/assets/sounds/bazooka.mp3'),//document.getElementById("bazooka"),
		play:function(){ if(!sfx)return false; sounds.bazooka.audio.pause(); /*sounds.bazooka.audio.currentTime=0;*/ sounds.bazooka.audio.play(); },
		stop:function(){ if(!sfx)return false; sounds.bazooka.audio.pause(); /*sounds.bazooka.audio.currentTime=0;*/ }
	},
	gun:{
		audio:new Howl({urls:['game/assets/sounds/gun.mp3','game/assets/sounds/gun.ogg', 'game/assets/sounds/gun.wav'], volume:0.5}),//new Audio('game/assets/sounds/gun.mp3'),//document.getElementById("gun"),
		play:function(){ if(!sfx)return false; sounds.gun.audio.pause(); /*sounds.gun.audio.currentTime=0;*/ sounds.gun.audio.play(); },
		stop:function(){ if(!sfx)return false; sounds.gun.audio.pause(); /*sounds.gun.audio.currentTime=0;*/ }
	},
	background:{
		audio:new Howl({urls:['game/assets/sounds/jinglebells.mp3','game/assets/sounds/jinglebells.ogg', 'game/assets/sounds/jinglebells.wav'], volume:0.2, loop:true}),//new Audio('game/assets/sounds/jinglebells.mp3'),//document.getElementById("bg"),
		play:function(){ if(!music)return false; sounds.background.audio.pause(); /*sounds.background.audio.currentTime=0;*/ sounds.background.audio.play(); },
		stop:function(){ if(!music)return false; sounds.background.audio.pause(); /*sounds.background.audio.currentTime=0;*/ }
	},
	menunavigate:{
		audio:new Howl({urls:['game/assets/sounds/menunavigate.mp3','game/assets/sounds/menunavigate.ogg', 'game/assets/sounds/menunavigate.wav'], volume:0.2}),//new Audio('game/assets/sounds/menunavigate.mp3'),//document.getElementById("menunavigate"),
		play:function(){ if(!sfx)return false; sounds.menunavigate.audio.pause(); /*sounds.menunavigate.audio.currentTime=0;*/ sounds.menunavigate.audio.play(); },
		stop:function(){ if(!sfx)return false; sounds.menunavigate.audio.pause(); /*sounds.menunavigate.audio.currentTime=0;*/ }
	},
	select:{
		audio:new Howl({urls:['game/assets/sounds/select.mp3','game/assets/sounds/select.ogg', 'game/assets/sounds/select.wav'], volume:0.2}),//new Audio('game/assets/sounds/select.mp3'),//document.getElementById("select"),
		play:function(){ if(!sfx)return false; sounds.select.audio.pause(); /*sounds.select.audio.currentTime=0;*/ sounds.select.audio.play(); },
		stop:function(){ if(!sfx)return false; sounds.select.audio.pause(); /*sounds.select.audio.currentTime=0;*/ }
	},
	explosion:{
	audio:new Howl({urls:['game/assets/sounds/explosion.mp3','game/assets/sounds/explosion.ogg', 'game/assets/sounds/explosion.wav'], volume:0.5}),//new Audio('game/assets/sounds/explosion.mp3'),//document.getElementById("explosion"),
		play:function(){ if(!sfx)return false; sounds.explosion.audio.pause(); /*sounds.explosion.audio.currentTime=0;*/ sounds.explosion.audio.play(); },
		stop:function(){ if(!sfx)return false; sounds.explosion.audio.pause(); /*sounds.explosion.audio.currentTime=0;*/ }
	}
};

/*sounds.jump.audio.volume = 0.5;
sounds.bazooka.audio.volume = 0.5;
sounds.gun.audio.volume = 0.5;
sounds.background.audio.volume = 0.2;
sounds.menunavigate.audio.volume = 0.3;
sounds.select.audio.volume = 0.3;
sounds.explosion.audio.volume = 0.5;

sounds.background.audio.loop = true;*/