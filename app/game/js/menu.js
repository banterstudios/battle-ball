//MENUS

function Menu(_opts){
	this.buttons = _opts&&_opts.buttons || [];
	this.position = new Vector( _opts&&_opts.x || 0, _opts&&_opts.y || 0 );
	this.dest = new Vector( _opts&&_opts.dx || 0, _opts&&_opts.dy || 0 );
	this.size = new Vector( _opts&&_opts.w || 32, _opts&&_opts.h || 32 );
	this.color = _opts&&_opts.color || '#333333';
	this.active = _opts&&_opts.active || false;
	this.maxWidth = 384;
	this.maxHeight = 168;
	this.scrollDimensions = new Vector(_opts&&_opts.scrollX || 0, _opts&&_opts.scrollY || 0);
	this.hasScroll = _opts&&_opts.hasScroll || false;
	this.scrollTop  = 0;
	this.scrollBottom = 0;
	this.listItems = [];

};
Menu.prototype.Initialise = function() {
	for(var i = 0, len = this.buttons.length; i < len; i++){this.buttons[i].Initialise(this)}
};
Menu.prototype.Update = function(delta) {
	if(!this.active || !Arena.spriteSheets['menu'].img || !Arena.spriteSheets['menu'].spritesLoaded)return false;
};
Menu.prototype.Render = function() {
	if(!this.active || !Arena.spriteSheets['menu'].img || !Arena.spriteSheets['menu'].spritesLoaded)return false;

	//render image! but for now just a rect
	ctx.drawImage(Arena.spriteSheets['menu'].img,this.position.x,this.position.y,this.size.x,this.size.y);

	for(var i = 0, len = this.buttons.length; i < len; i++){this.buttons[i].Render();}
};
Menu.prototype.unTrigger=function(type){
	if(!Arena.spriteSheets['menu'].img || !Arena.spriteSheets['menu'].spritesLoaded)return false;

	switch(type){
		case 'mousemove':
			//hit ya!
			this.resetButtons();
		break;

		case 'click':
		break;

		default:
			this.resetButtons();
		break;
	}
};
Menu.prototype.resetButtons = function() {
	for(var i = 0, len = this.buttons.length; i < len; i++){this.buttons[i].Reset();}
};

Menu.prototype.activate = function() {
	if(game.currentMenu!==this&&game.currentMenu!==null){game.currentMenu.deactivate();}
	game.currentMenu = this;
	this.active=true;
};
Menu.prototype.deactivate = function(_button) {
	this.unTrigger();
	this.active = false;
	if(_button&&_button.link){_button.link.active = true; game.currentMenu = _button.link;}
};
Menu.prototype.scrollList=function(e){
	if(!this.hasScroll)return false;


	var delta = e&&e.wheelDeltaY ? e.wheelDeltaY*0.3 : e&&e.detail ? e.detail : e&&typeof(e)==='number' ? e*0.8 : 0 >> 0;

	if(this.scrollTop <= -this.scrollBottom){this.scrollTop = -this.scrollBottom;}
	if(this.scrollTop >= 0){this.scrollTop = 0;}


	if(this.scrollTop+delta <= -this.scrollBottom || this.scrollTop+delta >= 0)return false;
	this.scrollTop += delta;

	for(var i = 0, len = this.buttons.length; i < len; i++){

		if(this.buttons[i].type !== 'ListElement')continue;

		this.buttons[i].scrollBounds(delta);
	}

};
Menu.prototype.changeMenu=function(_newmenu){
	this.deactivate();
	_newmenu.activate();
};
Menu.prototype.addPlayerScoreItem=function(_opts){

};
Menu.prototype.addListItem=function(_opts){
	var _li = new ListElement({
		x:60,
		y:this.listItems.length<=0 ? 72 : (this.listItems[this.listItems.length-1].position.y + this.listItems[this.listItems.length-1].size.y),
		w:360,
		h:20,
		dx:0,
		dy:0,
		textsize:8,
		text:_opts&&_opts.text || '1_ 1,200m Nick'
	});

	this.buttons.push(_li);
	this.listItems.push(this.buttons[this.buttons.length-1]);

	
	this.scrollDimensions.x = (71); 
	this.scrollDimensions.y = (142);

	this.scrollBottom = (this.listItems.length-1) * 20;
};
Menu.prototype.resetListItems=function(){
	for(var i = 0, len = this.buttons.length; i < len; i++){
		if(this.buttons[i].type === 'ListElement'){this.buttons.splice(1,i);}
	}
	this.listItems = [];

	this.scrollDimensions.x = 0; 
	this.scrollDimensions.y = 0;
	this.scrollBottom = 0;
};

Menu.Collision=function(obja,objb){
	if(objb.hasOwnProperty('active')&&!objb.active){return false;}
	return (obja.x) > objb.position.x  &&  (obja.x) < objb.position.x + objb.size.x
        && (obja.y) > objb.position.y   &&  (obja.y) < objb.position.y + objb.size.y;
};


function MobileOverlayMenu(_opts){
	Menu.call(this,_opts);
};
MobileOverlayMenu.prototype = Object.create(Menu.prototype);
MobileOverlayMenu.prototype.constructor=MobileOverlayMenu;
MobileOverlayMenu.prototype.parent = Menu.prototype;

MobileOverlayMenu.prototype.Render=function(){
	if(!this.active || !Arena.spriteSheets['mobileoverlayassets'].img || !Arena.spriteSheets['mobileoverlayassets'].spritesLoaded)return false;
	ctx.drawImage(Arena.spriteSheets['mobileoverlayassets'].img,this.dest.x,this.dest.y,this.size.x,this.size.y,this.position.x,this.position.y,this.size.x,this.size.y)
	for(var i = 0, len = this.buttons.length; i < len; i++){this.buttons[i].Render();}
};


function DesktopOverlayMenu(_opts){
	Menu.call(this,_opts);
};
DesktopOverlayMenu.prototype = Object.create(Menu.prototype);
DesktopOverlayMenu.prototype.constructor=DesktopOverlayMenu;
DesktopOverlayMenu.prototype.parent = Menu.prototype;

DesktopOverlayMenu.prototype.Render=function(){
	if(!this.active || !Arena.spriteSheets['mobileoverlayassets'].img || !Arena.spriteSheets['mobileoverlayassets'].spritesLoaded)return false;
	for(var i = 0, len = this.buttons.length; i < len; i++){this.buttons[i].Render();}
};




//BUTTONS
function Button(_opts){
	this.prevlink = _opts&&_opts.prevlink || null;
	this.link = _opts&&_opts.link || null;
	this.position = new Vector( _opts&&_opts.x || 0, _opts&&_opts.y || 0 );
	this.click = _opts&&_opts.click || true;
	this.size = new Vector( _opts&&_opts.w || 32, _opts&&_opts.h || 32 );
	this.srcsize = new Vector( _opts&&_opts.sw || this.size.x, _opts&&_opts.sh || this.size.y );
	this.dest = new Vector( _opts&&_opts.dx || 0, _opts&&_opts.dy || 0 );
	this.text = _opts&&_opts.text || '';
	this.hover = false;
	this.nohover = false;
	//this.constructor.name;

	this.textSize = _opts&&_opts.textsize || 15;
	this.textPosition = new Vector(_opts&&_opts.tx || (this.position.x+32), _opts&&_opts.ty || ((this.position.y+(this.size.y))-(this.textSize*0.6)));
	this.bgAlpha = _opts&&_opts.bgAlpha || 0;
	this.textAlpha = _opts&&_opts.textAlpha || 0.5;

	this.bgAlphaBackUp = this.bgAlpha;
	this.textAlphaBackUp = this.textAlpha;

	this.action = _opts&&_opts.action || null;
};
Button.prototype.Reset=function(){
	this.textAlpha = this.textAlphaBackUp; this.bgAlpha = this.bgAlphaBackUp; this.hover=false;
};
Button.prototype.Trigger=function(type){return false;}
Button.prototype.Initialise=function(_p){
	this.prevlink = _p;
};




function MobileOverlayImageButton(_opts){
	Button.call(this, _opts);
	this.type = 'MobileOverlayImageButton';
};
MobileOverlayImageButton.prototype = Object.create(Button.prototype);
MobileOverlayImageButton.prototype.constructor=MobileOverlayImageButton;
MobileOverlayImageButton.prototype.parent = Button.prototype;

MobileOverlayImageButton.prototype.Trigger=function(type){
	if(!this.prevlink || this.prevlink&&!this.prevlink.active || !Arena.spriteSheets['mobileoverlayassets'].img || !Arena.spriteSheets['mobileoverlayassets'].spritesLoaded)return false;

	switch(type){
		case 'mousemove':
			//hit ya!
		break;

		case 'click':
			if(this.action===null || typeof(this.action)!=='function')return false;
			this.action();
			//do something?!	
		break;

	}
};
MobileOverlayImageButton.prototype.Render = function() {
	if(!this.prevlink || this.prevlink&&!this.prevlink.active || !Arena.spriteSheets['mobileoverlayassets'].img || !Arena.spriteSheets['mobileoverlayassets'].spritesLoaded )return false;
	ctx.drawImage(Arena.spriteSheets['mobileoverlayassets'].img,this.dest.x,this.dest.y,this.srcsize.x,this.srcsize.y,this.position.x,this.position.y,this.size.x,this.size.y);
};


function HealthBar(_opts){
	Button.call(this, _opts);
	this.type = 'HealthBar';
	this.dest2 = new Vector(_opts&&_opts.dx2 || 0,_opts&&_opts.dy2 || 0);
	this.dest3 = new Vector(_opts&&_opts.dx3 || 0,_opts&&_opts.dy3 || 0);
	this.amount = 1;
	this.barPosition = new Vector(_opts&&_opts.bx || 0,_opts&&_opts.by || 0);
	this.barSize = new Vector(_opts&&_opts.bw || 0,_opts&&_opts.bh || 0);
};
HealthBar.prototype = Object.create(Button.prototype);
HealthBar.prototype.constructor=HealthBar;
HealthBar.prototype.parent = Button.prototype;
HealthBar.prototype.Render = function() {

	if(!Arena.spriteSheets['mobileoverlayassets'].img || !Arena.spriteSheets['mobileoverlayassets'].spritesLoaded )return false;
	
	//BG!
	ctx.drawImage(Arena.spriteSheets['mobileoverlayassets'].img,this.dest.x,this.dest.y,this.srcsize.x,this.srcsize.y,this.position.x,this.position.y,this.size.x,this.size.y);
	ctx.drawImage(Arena.spriteSheets['mobileoverlayassets'].img,this.dest2.x,this.dest2.y,this.barSize.x,this.barSize.y,this.barPosition.x,this.barPosition.y,this.barSize.x,this.barSize.y);
	//overlay -- make sure it deletes as the user health decreases and viceversa.
	this.amount = (g_Player.health/g_Player.maxhealth);
	this.amount *= this.barSize.x;
	if(this.amount)ctx.drawImage(Arena.spriteSheets['mobileoverlayassets'].img,this.dest3.x,this.dest3.y,this.amount,this.barSize.y,this.barPosition.x,this.barPosition.y,this.amount,this.barSize.y);
};




function CounterElement(_opts){
	Button.call(this, _opts);
	this.type = 'CounterElement';
	this.incrementElementAttr = _opts&&_opts.incElemOBJAttr || null;
	this.text = _opts&&_opts.text || '';
	this.textPosition = _opts&&_opts.textPosition || {x:0,y:0};
	this.textPosition.x += this.position.x;
	this.textPosition.y += this.position.y;
	this.amount = 0;
};
CounterElement.prototype = Object.create(Button.prototype);
CounterElement.prototype.constructor=CounterElement;
CounterElement.prototype.parent = Button.prototype;
CounterElement.prototype.Render = function() {
	
	if(!Arena.spriteSheets['mobileoverlayassets'].img || !Arena.spriteSheets['mobileoverlayassets'].spritesLoaded || this.incrementElement===null || g_Player===null)return false;
	ctx.drawImage(Arena.spriteSheets['mobileoverlayassets'].img,this.dest.x,this.dest.y,this.srcsize.x,this.srcsize.y,this.position.x,this.position.y,this.size.x,this.size.y);

	
	ctx.save();
		ctx.fillStyle = '#333333';
		ctx.font = "12pt ingametext";
		this.amount = (g_Player[this.incrementElementAttr]);
		var _txt = this.amount.toString();
		ctx.fillText(_txt,this.textPosition.x,this.textPosition.y);
	ctx.restore();
};




function MenuElement(_opts){
	Button.call(this, _opts);
	this.type = 'MenuElement';
	this.color = _opts&&_opts.color || '255,255,255';
};
MenuElement.prototype = Object.create(Button.prototype);
MenuElement.prototype.constructor=MenuElement;
MenuElement.prototype.parent = Button.prototype;

MenuElement.prototype.Trigger=function(type){
	if(!this.prevlink || this.prevlink&&!this.prevlink.active)return false;

	switch(type){
		case 'mousemove':
			//hit ya!
			this.hover=true;
			this.textAlpha = 1;
			this.bgAlpha = 0.5;
		break;

		case 'click':
			if(this.action===null || typeof(this.action)!=='function')return false;
			this.action();
			//do something?!	
		break;

	}
};
MenuElement.prototype.Render = function() {
	if(!this.prevlink || this.prevlink&&!this.prevlink.active)return false;

	ctx.save();
	
	ctx.fillStyle="rgba(255,255,255,"+this.bgAlpha+")";
	ctx.fillRect(this.position.x,this.position.y,this.size.x,this.size.y);

	ctx.fillStyle = "rgba("+this.color+","+this.textAlpha+")";
	ctx.font = this.textSize+"pt blocktext";
	ctx.fillText(this.text,this.textPosition.x,this.textPosition.y);
	
	ctx.restore();
};




function ImageElement(_opts){
	Button.call(this, _opts);
	this.type = 'ImageElement';
};
ImageElement.prototype = Object.create(Button.prototype);
ImageElement.prototype.constructor=ImageElement;
ImageElement.prototype.parent = Button.prototype;

ImageElement.prototype.Trigger=function(type){
	if(!this.prevlink || this.prevlink&&!this.prevlink.active || !Arena.spriteSheets['menuassets'].img || !Arena.spriteSheets['menuassets'].spritesLoaded)return false;

	switch(type){
		case 'mousemove':
			//hit ya!
			this.hover=true;
			this.bgAlpha = 1;
		break;

		case 'click':
			if(this.action===null || typeof(this.action)!=='function')return false;
			this.action();
		break;

	}
};
ImageElement.prototype.Render = function() {
	if(!this.prevlink || this.prevlink&&!this.prevlink.active || !Arena.spriteSheets['menuassets'].img || !Arena.spriteSheets['menuassets'].spritesLoaded )return false;
	ctx.globalAlpha = this.bgAlpha;
	ctx.drawImage(Arena.spriteSheets['menuassets'].img,this.dest.x,this.dest.y,this.srcsize.x,this.srcsize.y,this.position.x,this.position.y,this.size.x,this.size.y);
	ctx.globalAlpha = 1;
};


function HeaderElement(_opts){
	Button.call(this, _opts);
	this.type = 'HeaderElement';
	this.subtext = _opts&&_opts.subtext || '';
	this.subtextSize = _opts&&_opts.subtextsize || 15;
	
	this.subtextPosition = new Vector(_opts&&_opts.stx || ((this.position.x+128)+(ctx.measureText(this.text).width)), _opts&&_opts.sty || ((this.position.y+(this.size.y))-(this.subtextSize*1.2)));

};
HeaderElement.prototype = Object.create(Button.prototype);
HeaderElement.prototype.constructor=HeaderElement;
HeaderElement.prototype.parent = Button.prototype;

HeaderElement.prototype.Render = function() {
	if(!this.prevlink || this.prevlink&&!this.prevlink.active)return false;

	ctx.fillStyle="#666666";
	ctx.fillRect(this.position.x,this.position.y,this.size.x,this.size.y);

	ctx.fillStyle = "rgba(255, 255, 255,1)";
	ctx.font = this.textSize+"pt blocktext";
	ctx.fillText(this.text,this.textPosition.x,this.textPosition.y);

	ctx.fillStyle = "#cccccc";
	ctx.font = this.subtextSize+"pt blocktext";
	ctx.fillText(this.subtext,this.subtextPosition.x,this.subtextPosition.y);

};


function AboutusElement(_opts){
	Button.call(this, _opts);
	this.type = 'AboutusElement';
	this.textarr = _opts&&_opts.textarr || [];
	this.size.y = this.textarr.length <= 0 ? 0 : ((this.textarr.length)*(this.textSize+4))+4;
	this.nohover = true;
};
AboutusElement.prototype = Object.create(Button.prototype);
AboutusElement.prototype.constructor=AboutusElement;
AboutusElement.prototype.parent = Button.prototype;

AboutusElement.prototype.Render = function() {
	if(!this.prevlink || this.prevlink&&!this.prevlink.active)return false;

	ctx.fillStyle="#666666";
	ctx.fillRect(this.position.x,this.position.y,this.size.x,this.size.y);
	
	for(var i = 0, len = this.textarr.length; i < len; i++){
		ctx.fillStyle = "rgba(255, 255, 255,1)";
		ctx.font = this.textSize+"pt blocktext";
		ctx.fillText(this.textarr[i],this.position.x+4,(this.position.y+(i+1) * (this.textSize+4)));
	}
};


function JeffElement(_opts){
	Button.call(this, _opts);
	this.type = 'JeffElement';
	this.nohover=true;
};
JeffElement.prototype = Object.create(Button.prototype);
JeffElement.prototype.constructor=JeffElement;
JeffElement.prototype.parent = Button.prototype;

JeffElement.prototype.Render = function() {
	if(!this.prevlink || this.prevlink&&!this.prevlink.active || !Arena.spriteSheets['jeff'].img || !Arena.spriteSheets['jeff'].spritesLoaded )return false;
	ctx.drawImage(Arena.spriteSheets['jeff'].img,this.position.x,this.position.y,this.size.x,this.size.y);
};



function ListElement(_opts){
	Button.call(this, _opts);
	this.type = 'ListElement';
	this.active = _opts&&_opts.active || true;
};
ListElement.prototype = Object.create(Button.prototype);
ListElement.prototype.constructor=ListElement;
ListElement.prototype.parent = Button.prototype;

ListElement.prototype.Trigger=function(type){
	if(!this.prevlink || this.prevlink&&!this.prevlink.active || !this.active)return false;

	switch(type){
		case 'mousemove':
			//hit ya!
			this.hover=true;
			this.textAlpha = 1;
			this.bgAlpha = 0.5;
		break;

		case 'click':
			if(this.action===null || typeof(this.action)!=='function')return false;
			this.action();
			//do something?!	
		break;

	}
};
ListElement.prototype.Render = function() {
	if(!this.prevlink || this.prevlink&&!this.prevlink.active || !this.active)return false;

	ctx.save();
	
	ctx.fillStyle="rgba(255,255,255,"+this.bgAlpha+")";
	ctx.fillRect(this.position.x,this.position.y,this.size.x,this.size.y);

	ctx.fillStyle = "rgba(255, 255, 255,"+this.textAlpha+")";
	ctx.font = this.textSize+"pt blocktext";
	ctx.fillText(this.text,this.textPosition.x,this.textPosition.y);
	
	ctx.restore();
};

ListElement.prototype.scrollBounds=function(pos){
	if(!pos)return false;
	this.position.y += typeof(pos)==='boolean' ? 0 : pos;
	this.textPosition.y += typeof(pos)==='boolean' ? 0 : pos;

	if((this.position.y) <= this.prevlink.scrollDimensions.x || (this.position.y) >= this.prevlink.scrollDimensions.y){
		this.active = false;
	}else{
		this.active = true;
	}
};
ListElement.prototype.Initialise=function(_p){
	this.parent.Initialise.call(this,_p);
	this.scrollBounds(true);
}



/*
Main Menu
*/
function MainMenu(_opts){
	this.name = _opts&&_opts.name || 'MENU';
	this.queryID = _opts&&_opts.queryID || '';
	this.parentQueryID = _opts&&_opts.parentQueryID || '';
};
MainMenu.prototype.On=function(){
	game.currentMenu = g_Menus[this.name];
	
	$(this.parentQueryID).addClass('active');
	$(this.queryID).addClass('active');

	switch(this.name){
		case 'home':
			game.chainedMenus.length = 0;
			$(this.queryID+' *').addClass('active');
		break;

		case 'settings':
			$(this.queryID+' *').addClass('active');
		break;

		case 'ingame-pause':
			$(this.queryID+' *').addClass('active');
			$(this.queryID+' .text').addClass('slideleft');
			$(this.queryID+' .elfrun').addClass('slideright');
		break;

		case 'gameover':
			$(this.queryID+' *').addClass('active');
			$(this.queryID+' .gameovertext').addClass('growFadeIn');
			$(this.queryID+' .gameoverskull').addClass('growFadeIn');
			$(this.queryID+' .gameoverskull').one('webkitAnimationEnd oanimationend msAnimationEnd animationend',MainMenu.gameOverSecondScreen);
		break;

		case 'loginandregister':
			$(this.queryID+' *').addClass('active');
		break;
	};

	if(game.chainedMenus.indexOf(game.currentMenu) < 0)game.chainedMenus.push(game.currentMenu);

};
MainMenu.prototype.Off=function(){
	$(this.queryID).removeClass('active');
	$(this.parentQueryID).removeClass('active');
	
	switch(this.name){
		case 'home':
			$(this.queryID+' *').removeClass('active');
		break;

		case 'settings':
			$(this.queryID+' *').removeClass('active');
		break;

		case 'ingame-pause':
			$(this.queryID+' *').removeClass('active');
			$(this.queryID+' .text').removeClass('slideleft');
			$(this.queryID+' .elfrun').removeClass('slideright');
		break;

		case 'gameover':
			$(this.queryID+' *').removeClass('active');
			$(this.queryID+' .gameovertext').removeClass('growFadeIn moveup');
			$(this.queryID+' .gameoverskull').removeClass('growFadeIn fadeup');
			$(this.queryID+' .gameovercontainer').removeClass('show');
		break;

		case 'loginandregister':
			$(this.queryID+' *').removeClass('active');
			$(this.queryID+' article.login').removeClass('fadeOutLeftLogin fadeInRightLogin');
			$(this.queryID+' article.register').removeClass('fadeOutRightRegister fadeInLeftRegister');
			$('.login li, .register li').trigger('mousedown');
		break;
	};
};
MainMenu.prototype.changeMenu=function(_menu){
	game.previousMenu = g_Menus[this.name];
	this.Off();
	_menu.On();
};
MainMenu.gameOverSecondScreen=function(e){
	$('.gameover').off('webkitAnimationEnd oanimationend msAnimationEnd animationend');
	$('.gameovertext').removeClass('growFadeIn').addClass('moveup');
	$('.gameoverskull').removeClass('growFadeIn').addClass('fadeup');
	$('.gameoverskull').one('webkitAnimationEnd oanimationend msAnimationEnd animationend',MainMenu.gameOverSecondScreenShow);
};
MainMenu.gameOverSecondScreenShow=function(e){
	$('.gameover').off('webkitAnimationEnd oanimationend msAnimationEnd animationend');
	$('.gameover .gameovercontainer').addClass('show');

	MainMenu.showPopup();
};
MainMenu.createScoreOnScreen=function(_score){
	$('article.menu > section.gameover > div.gameovercontainer > div.score, article.menu > section.leaderboards > div.table > div.top').text('#__ '+g_Player.distance);
};

MainMenu.switchScreenToRegister=function(){
	$('article.menu > section.loginandregister > article.login').removeClass('fadeInRightLogin').addClass('fadeOutLeftLogin');
	$('article.menu > section.loginandregister > article.register').removeClass('fadeOutRightRegister').addClass('fadeInLeftRegister');
};
MainMenu.switchScreenToLogin=function(){
	$('article.menu > section.loginandregister > article.login').removeClass('fadeOutLeftLogin').addClass('fadeInRightLogin');
	$('article.menu > section.loginandregister > article.register').removeClass('fadeInLeftRegister').addClass('fadeOutRightRegister');
};
MainMenu.removePopup=function(){
	$('.loginpopup').removeClass('active growFadeInFast');
};
MainMenu.showPopup=function(){
	if(!isLoggedIn)$('.loginpopup').addClass('active growFadeInFast');
};
MainMenu.showControllerPopup=function(e){
	$('section.controllerpopup').addClass('active');
};
MainMenu.hideControllerPopup=function(e){
	$('section.controllerpopup').removeClass('active');
};
MainMenu.mouseUpFunction=function(e){
		if($(this).hasClass('proceed')){ sounds.select.play(); postScore = true; MainMenu.removePopup(); if(game.currentMenu){ game.currentMenu.changeMenu(g_Menus['loginandregister']); return true; }  g_Menus['loginandregister'].On(); return true; }else
		if($(this).hasClass('nothanks')){ sounds.select.play(); postScore = false; MainMenu.removePopup(); }
		if($(this).hasClass('logout')){ sounds.select.play();  GAME_HANDLER.Logout(); return true;}else
		if($(this).hasClass('play')){ $('div.ribbon').hide(); game.restart(); sounds.select.play(); game.gameState = game.STATES.PLAY; sounds.background.play(); game.currentMenu.Off(); return true;}else
		if($(this).hasClass('leaderboards')){ GAME_HANDLER.GetScore(); sounds.select.play(); if(game.currentMenu){ game.currentMenu.changeMenu(g_Menus['leaderboards']); return true; }  g_Menus['leaderboards'].On();  return true;}else
		if($(this).hasClass('about')){sounds.select.play(); if(game.currentMenu){ game.currentMenu.changeMenu(g_Menus['about']); return true; }  g_Menus['about'].On(); return true;}else
		if($(this).hasClass('settings')){sounds.select.play(); if(game.currentMenu){ game.currentMenu.changeMenu(g_Menus['settings']); return true; }  g_Menus['settings'].On(); return true;}else
		if($(this).hasClass('restart')){ $('div.ribbon').hide(); sounds.select.play(); game.restart(); game.gameState = game.STATES.PLAY; sounds.background.play(); game.currentMenu.Off(); return true;}else
		if($(this).hasClass('resume')){ $('div.ribbon').hide(); sounds.select.play(); sounds.background.play(); game.currentMenu.Off(); game.resume(); game.gameState = game.STATES.PLAY; return true;}else
		
		if($(this).hasClass('controls')){ sounds.select.play(); if(game.currentMenu){ game.currentMenu.changeMenu(g_Menus['controls']); return true; }  g_Menus['controls'].On();  return true;}else
		
		if($(this).hasClass('nes')){ sounds.select.play(); MainMenu.showControllerPopup(); }else
		

		if($(this).hasClass('quit')){ sounds.select.play(); if(game.currentMenu){ game.currentMenu.changeMenu(g_Menus['home']); return true; } g_Menus['home'].On(); return true; }else
		
		if($(this).hasClass('loginandlogout')){ sounds.select.play(); if(isLoggedIn){ GAME_HANDLER.Logout(); return; } if(game.currentMenu){ game.currentMenu.changeMenu(g_Menus['loginandregister']); return true; } g_Menus['loginandregister'].On(); return true; }else

		if($(this).hasClass('audio')){sounds.select.play(); sfx=!sfx; $(this).toggleClass('on'); return true;}else
		if($(this).hasClass('music')){sounds.select.play(); music=!music; $(this).toggleClass('on'); return true;}else
		if($(this).hasClass('start')){sounds.select.play(); GAME_HANDLER.Login(); return true;}else
		if($(this).hasClass('register')){sounds.select.play();  MainMenu.switchScreenToRegister(); return true;}else
		if($(this).hasClass('agreeandstart')){sounds.select.play(); GAME_HANDLER.Register(); return true;}
};

MainMenu.hoverOverFunction=function(e){
	sounds.menunavigate.play();
};

MainMenu.mouseUpBackButtonFunction=function(e){
	if($(this).hasClass('backregister')){
		MainMenu.switchScreenToLogin();
		return true;
	}
	//if(game.previousMenu){
		if(game.chainedMenus.length>0){
			//game.currentMenu.changeMenu(game.previousMenu);
			game.chainedMenus.pop();
			game.currentMenu.changeMenu(game.chainedMenus[game.chainedMenus.length-1]);
		}

	//} return true;
};
MainMenu.mouseUpSocialButtonFunction=function(e){
	e.preventDefault();
	if($(this).hasClass('twitter')){
		if(isLoggedIn&&g_Player&&g_Player.distance){
			var win = window.open(settings.twitterShare+settings.shareTextScore+' '+g_Player.distance+'&url='+settings.vurl, '_blank');
			win.focus();
		}else{
			var win = window.open(settings.twitterShare+settings.shareTextNoScore+'&url='+settings.vurl, '_blank');
			win.focus();
		}
	}else
	if($(this).hasClass('facebook')){
		if(isLoggedIn&&g_Player&&g_Player.distance){
			var win = window.open(settings.facebookSharePreSummary+settings.twitterShareTextScore+' '+g_Player.distance+settings.facebookSharePreSummary, '_blank');
			win.focus();
		}else{
			var win = window.open(settings.facebookSharePreSummary+settings.twitterShareTextScore+settings.facebookSharePreSummary, '_blank');
			win.focus();
		}
	}else
	if($(this).hasClass('linkedin')){
		if(isLoggedIn&&g_Player&&g_Player.distance){
			var win = window.open(settings.linkedinShare+settings.shareTextScore+' '+g_Player.distance, '_blank');
			win.focus();
		}else{
			var win = window.open(settings.linkedinShare+settings.shareTextNoScore, '_blank');
			win.focus();
		}
	}
	return false;
	//https://twitter.com/intent/tweet?text=Hello%20world
};
MainMenu.Actions=function(_id){
	$(_id+' .text').on('mouseup',MainMenu.mouseUpFunction);
	$(_id+' .text, '+_id+' .back').hover(MainMenu.hoverOverFunction);
	$(_id+' .back').on('mouseup',MainMenu.mouseUpBackButtonFunction);
	$('.socialbutton').on('mouseup',MainMenu.mouseUpSocialButtonFunction);

	$('input').on('change focus input',MainMenu.removeErrorMessagesInput);
	$('.login li, .register li').on('mousedown',MainMenu.removeErrorMessagesLi);

	$('section.controllerpopup').on('click',MainMenu.hideControllerPopup);
};
MainMenu.removeErrorMessagesInput=function(e){
	$(this).siblings('span').removeClass('invalid');
}
MainMenu.removeErrorMessagesLi=function(e){
	$(this).find('span').removeClass('invalid');
}

function MobileMenu(_opts){
	this.name = _opts&&_opts.name || 'MENU';
	this.queryID = _opts&&_opts.queryID || '';
	this.parentQueryID = _opts&&_opts.parentQueryID || '';
};
MobileMenu.prototype.On=function(){
	game.currentMobileMenu = g_MobileMenu[this.name];
	$(this.parentQueryID).addClass('active');
	$(this.queryID).addClass('active');
};
MobileMenu.prototype.Off=function(){
	$(this.queryID).removeClass('active');
	$(this.parentQueryID).removeClass('active');
};
MobileMenu.prototype.changeMenu=function(_menu){
	game.previousMobileMenu = g_MobileMenu[this.name];
	this.Off();
	_menu.On();
};

MobileMenu.touchStartFunction=function(e){
	if($(this).hasClass('jump')){ if(g_Player&&g_Player!==null)g_Player.isJumping = true; return true;}
	if($(this).hasClass('start')){ if(game.gameState===game.STATES.PLAY){ sounds.background.stop(); game.gameState = game.STATES.MENU; /*game.currentMenu.changeMenu(g_Menus['ingame-pause']);*/ PixelationImageMenu('ingame-pause');} $('div.ribbon').show(600); return true;}
	if($(this).hasClass('a')){ if(g_Player&&g_Player!==null)g_Player.Shoot(); return true;}
	if($(this).hasClass('b')){ if(g_Player&&g_Player!==null)g_Player.changeWeapon(true); return true;}
};
MobileMenu.touchEndFunction=function(e){

	if($(this).hasClass('jump')){ if(g_Player&&g_Player!==null) g_Player.stopJump(); return true;}
	if($(this).hasClass('a')){ if(g_Player&&g_Player!==null) g_Player.StopShoot(); return true;}
	
};
MobileMenu.FullScreen=function(e){
	toggleFullScreen();
	$('article.menu').off('click');
};	
MobileMenu.Actions=function(_id){
	$(_id+' .mobileaction').on('touchstart',MobileMenu.touchStartFunction);
	$(_id+' .mobileaction').on('touchend',MobileMenu.touchEndFunction);
	$('article.menu').on('click',MobileMenu.FullScreen);
};









