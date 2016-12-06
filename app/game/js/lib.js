/*
========
GLOBAL
========
*/

var g_Player = null;
var g_Level = null;
var g_Utilities = null;
var g_Enemies = [];
var g_Menus = {};
var g_OverlayMenus = {};
var g_MobileMenu = {};
var g_Snow = [];
//var g_QuadTree = null;
var g_LevelMask = null;

var game = {
	_render:null,
	/*STATES*/
	STATES:{
		PLAY:0,
		MENU:1,
		END:2,
		LOADER:3
	},
	gameState:null,
	previousMenu:null,
	currentMenu:null,
	chainedMenus:[],
	currentOverlay:null,
	previousMobileMenu:null,
	currentMobileMenu:null,

	/*loaderColors*/
	lColor1:'#f3f3f3',
	lColor2:'#e6e6e6',
	lColor3:'#ff7c7c',
	lColor4:'#f25454',
	loadedonce:false,

	loadGameUpdate:function(){
		if(Arena.CURRENTASSETS >= Arena.MAXASSETS && !game.loadedonce){
			ctx.clearRect(0,0,playWidth,playHeight); // remove all assets ready for the game!
			/*SHIFT SKULL UP TO SHOW HOME MENU*/
			game.shiftLoaderMenuToHomeMenu();
			game.loadedonce = true;
		};
	},
	shiftLoaderMenuToHomeMenu:function(){
		$('.gangsterclaus').addClass('moveup');
		$('.skull').removeClass('heartbeat').addClass('fadeup').one('webkitAnimationEnd oanimationend msAnimationEnd animationend',game.showHomeMenu);
	},
	showHomeMenu:function(){
		$('.skull').off('webkitAnimationEnd oanimationend msAnimationEnd animationend');
		$('.loader').removeClass('active');
		game.gameState = game.STATES.MENU;
		game.login();
	},
	login:function(){

		if(isMobile())game.currentMobileMenu.On();
		
		//check to see if the user has logged in. if false, then take them to the login screen else take them to the main menu.
		if(window.localStorage){
			if(window.localStorage.getItem('token')){ isLoggedIn = true; }
		}

		g_Menus['home'].On();

		
	},
/*	loadGameRender:function(){

		
		var amount = (Arena.CURRENTASSETS/Arena.MAXASSETS);
		amount *= 240;

		
		ctx.fillStyle = game.lColor1;
		ctx.fillRect(((playWidth/2)-120),((playHeight/2)-16),240,16);
		ctx.fillStyle = game.lColor2;
		ctx.fillRect(((playWidth/2)-120),((playHeight/2)),240,16);


		ctx.fillStyle = game.lColor3;
		ctx.fillRect(((playWidth/2)-120),((playHeight/2)-16),amount,16);
		ctx.fillStyle = game.lColor4;
		ctx.fillRect(((playWidth/2)-120),((playHeight/2)),amount,16);

	},*/
	initialise:function(){
		game.bindEvents();
	},
	bindEvents:function(){
		window.addEventListener("load", game.start, false);
		user.events();
	},
	restart:function(){
		resetPixelationImageMenu();
		pixelActive = false;

		if(mobile)$('article.overlays > section.mobile > div.b > span').text('0');
		
		ctx.mozImageSmoothingEnabled = false;
		ctx.webkitImageSmoothingEnabled = false;
		ctx.imageSmoothingEnabled = false;
		
		g_Level.Restart();
		g_Player.Restart();
		for(var i = 0, len = g_Enemies.length; i < len; i++)g_Enemies[i].Restart();
		g_Utilities.Restart();
		g_Utilities.start = Date.now();
		g_Utilities.then = Date.now(); // GET THE BALL ROLLING!!! BAAYBEEE
		cancelAnimationFrame(game._render);
		game.Loop();
	},
	resume:function(){
		resetPixelationImageMenu();
		pixelActive = false;
		cancelAnimationFrame(game._render);
		g_Utilities.then = Date.now();
		g_Utilities.start = Date.now();
		game.Loop();
	},
	start:function(){
		if(mobile)$('#qrcode').css('display','none');
		resetPixelationImageMenu();
		pixelActive = false;
		g_Level = new Arena({vx:0,vy:0});
		g_Level.loadLevels();
		game.buildMenus();
	},
	startElements:function(){
		g_Player = new Player();
		g_Utilities = new Utilities();
		
		for(var i = 0; i < 50; i++){g_Enemies.push(Character.RandomEnemy());}

		g_Snow.push(new Snow({dx:0, dy:0, delay:0.20}));

		g_LevelMask = new Mask();

		game.Begin();
	},
	Begin:function(){
		g_Utilities.start = Date.now();
		g_Utilities.then = Date.now(); // GET THE BALL ROLLING!!! BAAYBEEE
		game.Loop();
	},
	Loop:function(){

		//Make the loop go around again ASAP
		game._render = requestAnimationFrame(game.Loop);

		g_Utilities.now = Date.now();
		g_Utilities.delta = (g_Utilities.now - g_Utilities.then)/g_Utilities.frameDivider;
		g_Utilities.then = g_Utilities.now;

		if (g_Utilities.delta>0.25)
			g_Utilities.delta = 0.25;

		g_Utilities.accumulator += g_Utilities.delta;
		
		while( g_Utilities.accumulator >= g_Utilities.fixedDelta){
			game.Update();
			g_Utilities.accumulator -= g_Utilities.fixedDelta;
		};
		game.Render();
			
	},
	Update:function(){
		switch(game.gameState){
			case game.STATES.PLAY:
				//g_QuadTree.Update();
				g_Player.Update();
				for(var i = 0, len = g_Enemies.length; i < len; i++)g_Enemies[i].Update();
				g_Level.Update();
				g_Utilities.Update();
			break;

			case game.STATES.MENU:
				g_Utilities.start = Date.now();
				g_Utilities.then = Date.now(); // keep resetting this as we dont want anything to be too large!
				updatePixelationImageMenu();
			break;

			case game.STATES.END:
			break;

			case game.STATES.LOADER:
				game.loadGameUpdate();
			break;
		};
	},
	Render:function(){
		switch(game.gameState){
			case game.STATES.PLAY:
				g_Level.Render();
				if(game.currentOverlay!==null)game.currentOverlay.Render();
			break;

			case game.STATES.MENU:
				/*ctx.clearRect(0,0,playWidth,playHeight);
				game.currentMenu.Render();*/
			break;

			case game.STATES.END:
			break;

			case game.STATES.LOADER:
				//game.loadGameRender();
			break;
		};
	},
	buildMenus:function(){
		
		//home
	/*	g_Menus['home'] = new Menu({
			x:0,y:0,w:playWidth,h:playHeight,color:'#333333',active:false,dx:0,dy:0,
			buttons:[new MenuElement({x:60,y:40,w:360,h:31,dx:0,dy:0, text:'Tutorial'}),
					new MenuElement({x:60,y:40+(31*1),w:360,h:31,dx:0,dy:0, text:'Play', action:function(){ game.gameState = game.STATES.PLAY; sounds.background.play(); }}),
					new MenuElement({x:60,y:40+(31*2),w:360,h:31,dx:0,dy:0, text:'Leader Boards',action:function(){game.currentMenu.changeMenu(g_Menus['highscore']);}}),
					new MenuElement({x:60,y:40+(31*3),w:360,h:31,dx:0,dy:0, text:'About',action:function(){game.currentMenu.changeMenu(g_Menus['aboutus']);}}),
					new MenuElement({x:60,y:40+(31*4),w:360,h:31,dx:0,dy:0, text:'Settings',action:function(){game.currentMenu.changeMenu(g_Menus['settings']);}})]
		});g_Menus['home'].Initialise();

		g_Menus['ingamemenu'] = new Menu({
			x:0,y:0,w:playWidth,h:playHeight,color:'#333333',active:false,dx:0,dy:0,
			buttons:[new MenuElement({x:60,y:40,w:360,h:31,dx:0,dy:0, text:'Restart', action:function(){game.restart(); game.gameState = game.STATES.PLAY; sounds.background.play(); }}),
					new MenuElement({x:60,y:40+(31*1),w:360,h:31,dx:0,dy:0, text:'Settings'}),
					new MenuElement({x:60,y:40+(31*2),w:360,h:31,dx:0,dy:0, text:'Quit'}),
					new ImageElement({x:92,y:40+(31*3.5),w:20,h:20,dx:0,dy:0, sw:32, sh:31, type:'image',bgAlpha:0.5}), //t
					new ImageElement({x:92+(32*1.5),y:40+(31*3.5),w:20,h:20,dx:32,dy:0, sw:32, sh:31, type:'image',bgAlpha:0.5}),//f
					new ImageElement({x:92+(32*3),y:40+(31*3.5),w:20,h:20,dx:64,dy:0, sw:32, sh:31, type:'image',bgAlpha:0.5}), //;
					new ImageElement({x:384,y:40+(31*3.9),w:32,h:31,dx:96,dy:0, sw:32, sh:31, type:'image',bgAlpha:0.5, action:function(){ sounds.background.play(); game.gameState = game.STATES.PLAY; }}) //back
					]
		});g_Menus['ingamemenu'].Initialise();


		g_Menus['settings'] = new Menu({
			x:0,y:0,w:playWidth,h:playHeight,color:'#333333',active:false,dx:0,dy:0,
			buttons:[new MenuElement({x:60,y:40,w:360,h:31,dx:0,dy:0, text:'Music',action:function(){music=!music;}}),
					new MenuElement({x:60,y:40+(31*1),w:360,h:31,dx:0,dy:0, text:'SFX',action:function(){sfx=!sfx;}}),
					new ImageElement({x:384,y:40+(31*3.9),w:32,h:31,dx:96,dy:0, sw:32, sh:31, type:'image',bgAlpha:0.5,action:function(){game.currentMenu.changeMenu(g_Menus['home']);}}) //back
					]
		});g_Menus['settings'].Initialise();


		g_Menus['highscore'] = new Menu({
			x:0,y:0,w:playWidth,h:playHeight,color:'#333333',active:false,dx:0,dy:0,scrollX:(42+32), scrollY:((54+(20*3)+1)), hasScroll:true,
			buttons:[
					new ImageElement({x:92,y:169,w:20,h:20,dx:0,dy:0, sw:32, sh:32, type:'image',bgAlpha:0.5}), //t
					new ImageElement({x:92+(32*1.5),y:169,w:20,h:20,dx:32,dy:0, sw:32, sh:32, type:'image',bgAlpha:0.5}),//f
					new ImageElement({x:92+(32*3),y:169,w:20,h:20,dx:64,dy:0, sw:32, sh:32, type:'image',bgAlpha:0.5}), //;
					new ImageElement({x:384,y:157,w:32,h:32,dx:96,dy:0, sw:32, sh:32, type:'image',bgAlpha:0.5,action:function(){game.currentMenu.changeMenu(g_Menus['home']);}}), //back
					new HeaderElement({x:60,y:41,w:360,h:31,dx:0,dy:0, text:'Highscores', subtext:'', subtextsize:8}),
			]
		});
		for(var i = 0; i < 5; i++){
			g_Menus['highscore'].addListItem({text:(i+1)+'_ 3,000M Nick'});
		}g_Menus['highscore'].Initialise();

	
		g_Menus['aboutus'] = new Menu({
			x:0,y:0,w:playWidth,h:playHeight,color:'#333333',active:false,dx:0,dy:0,
			buttons:[
					//max characters per row = 64
					new AboutusElement({x:60,y:41,w:360,h:0,dx:0,dy:0,textsize:8, textarr:[
						'1231231231231231231231231231231231231231231231231231231231231231',
						'asdasdas',
						'asdddddddddddd',
						'sdsds'
					]}),
					new MenuElement({x:60,y:108,w:360,h:32,dx:0,dy:0, text:'www.vitaminlondon.com', color:'147,229,138', action:function(){ window.open('http://www.vitaminlondon.com', '_blank'); }}),
					new ImageElement({x:92,y:159,w:20,h:20,dx:0,dy:0, sw:32, sh:32, type:'image',bgAlpha:0.5}), //t
					new ImageElement({x:92+(32*1.5),y:159,w:20,h:20,dx:32,dy:0, sw:32, sh:32, type:'image',bgAlpha:0.5}),//f
					new ImageElement({x:92+(32*3),y:159,w:20,h:20,dx:64,dy:0, sw:32, sh:32, type:'image',bgAlpha:0.5}), //;
					new ImageElement({x:374,y:153,w:32,h:32,dx:96,dy:0, sw:32, sh:32, type:'image',bgAlpha:0.5, action:function(){game.currentMenu.changeMenu(g_Menus['home']);}}), //bac
					new JeffElement({x:274,y:140,w:48,h:48}) //HAHA
					]
		});g_Menus['aboutus'].Initialise();
	

			
*/		
		g_OverlayMenus['desktopoverlay'] = new DesktopOverlayMenu({
			x:0,y:0,w:playWidth,h:playHeight,active:false,
			buttons:[
				new HealthBar({x:((playWidth/2)-(165/2)),y:6,w:165,h:22,dx:315,dy:0,dx2:262,dy2:40,dx3:262,dy3:24,bx:((playWidth/2)-(135/2)),by:9,bw:135,bh:16, type:'image',bgAlpha:1}), // healthbar
				new CounterElement({x:0,y:6,w:74,h:22,dx:0,dy:88, type:'image',bgAlpha:1,incElemOBJAttr:'score', textPosition:{x:25, y:17}}), // COINS
				new CounterElement({x:(playWidth-(74)),y:6,w:74,h:22,dx:239,dy:88, type:'image',bgAlpha:1,incElemOBJAttr:'distance',textPosition:{x:20, y:17}}), // distance
			]
		});g_OverlayMenus['desktopoverlay'].Initialise();
		game.currentOverlay = g_OverlayMenus['desktopoverlay'];
		game.currentOverlay.active = true;


		g_Menus['home'] = new MainMenu({name:'home', queryID:'article.menu section.home', parentQueryID:'article.menu'});
		g_Menus['controls'] = new MainMenu({name:'controls', queryID:'article.menu section.controls', parentQueryID:'article.menu'});
		g_Menus['gameover'] = new MainMenu({name:'gameover', queryID:'article.menu section.gameover', parentQueryID:'article.menu'});
		g_Menus['ingame-pause'] = new MainMenu({name:'ingame-pause', queryID:'article.menu section.ingame-pause', parentQueryID:'article.menu'});
		g_Menus['settings'] = new MainMenu({name:'settings', queryID:'article.menu section.settings', parentQueryID:'article.menu'});
		g_Menus['leaderboards'] = new MainMenu({name:'leaderboards', queryID:'article.menu section.leaderboards', parentQueryID:'article.menu'});
		g_Menus['about'] = new MainMenu({name:'about', queryID:'article.menu section.about', parentQueryID:'article.menu'});
		/*g_Menus['login'] = new MainMenu({name:'login', queryID:'article.menu section.login', parentQueryID:'article.menu'});
		g_Menus['register'] = new MainMenu({name:'register', queryID:'article.menu section.register', parentQueryID:'article.menu'});*/
		g_Menus['loginandregister'] = new MainMenu({name:'loginandregister', queryID:'article.menu section.loginandregister', parentQueryID:'article.menu'});


		if(isMobile()){
			g_MobileMenu['mobile'] = new MobileMenu({name:'mobile', queryID:'article.overlays section.mobile', parentQueryID:'article.overlays'});
			game.currentMobileMenu = g_MobileMenu['mobile'];
			MobileMenu.Actions('article.overlays');
		};

		MainMenu.Actions('article.menu');
		/*
		OVERLAY MENUS
		
		g_OverlayMenus['mobileoverlay'] = new MobileOverlayMenu({
			x:0,y:(playHeight-32),w:playWidth,h:32,dx:0,dy:56,color:'#333333',active:false,
			buttons:[
				new MobileOverlayImageButton({x:0,y:(playHeight-56),w:114,h:56,dx:0,dy:0, type:'image',bgAlpha:1, action:function(){ if(g_Player&&g_Player!==null)g_Player.Jump(); }}), //NAV
				new MobileOverlayImageButton({x:(playWidth-(20+47)),y:(playHeight-30),sw:47, sh:42, w:33,h:28,dx:114,dy:14, type:'image',bgAlpha:1, action:function(){ if(g_Player&&g_Player!==null)g_Player.Shoot(); }}), //A
				new MobileOverlayImageButton({x:(playWidth-(20+(47*2)+10)),y:(playHeight-30),sw:47, sh:42,w:33,h:28,dx:114,dy:14, type:'image',bgAlpha:1, action:function(){ if(g_Player&&g_Player!==null)g_Player.changeWeapon(true); }}), // B
				new MobileOverlayImageButton({x:((playWidth/2)-(101/2)),y:(playHeight-(24+4)),w:101,h:24,dx:161,dy:32, type:'image',bgAlpha:1, action:function(){ sounds.background.stop(); game.gameState = game.STATES.MENU; game.currentMenu.changeMenu(g_Menus['ingamemenu']); }}), // START
				new HealthBar({x:((playWidth/2)-(165/2)),y:6,w:165,h:22,dx:315,dy:0,dx2:262,dy2:40,dx3:262,dy3:24,bx:((playWidth/2)-(135/2)),by:9,bw:135,bh:16, type:'image',bgAlpha:1}), // healthbar
				new CounterElement({x:0,y:6,w:74,h:22,dx:0,dy:88, type:'image',bgAlpha:1,incElemOBJAttr:'score', textPosition:{x:25, y:17}}), // COINS
				new CounterElement({x:(playWidth-(74)),y:6,w:74,h:22,dx:239,dy:88, type:'image',bgAlpha:1,incElemOBJAttr:'distance',textPosition:{x:54, y:17}}), // distance
			]
		});g_OverlayMenus['mobileoverlay'].Initialise();

		g_OverlayMenus['desktopoverlay'] = new DesktopOverlayMenu({
			x:0,y:0,w:playWidth,h:playHeight,active:false,
			buttons:[
				new HealthBar({x:((playWidth/2)-(165/2)),y:6,w:165,h:22,dx:315,dy:0,dx2:262,dy2:40,dx3:262,dy3:24,bx:((playWidth/2)-(135/2)),by:9,bw:135,bh:16, type:'image',bgAlpha:1}), // healthbar
				new CounterElement({x:0,y:6,w:74,h:22,dx:0,dy:88, type:'image',bgAlpha:1,incElemOBJAttr:'score', textPosition:{x:25, y:17}}), // COINS
				new CounterElement({x:(playWidth-(74)),y:6,w:74,h:22,dx:239,dy:88, type:'image',bgAlpha:1,incElemOBJAttr:'distance',textPosition:{x:54, y:17}}), // distance
			]
		});g_OverlayMenus['desktopoverlay'].Initialise();


		g_Menus['home'].activate();

		game.currentOverlay = isMobile() ? g_OverlayMenus['mobileoverlay'] : g_OverlayMenus['desktopoverlay'];
		game.currentOverlay.active = true;
		*/
	}
};

game.gameState = game.STATES.LOADER;
game.initialise();

window.scrollTo(0,1);

