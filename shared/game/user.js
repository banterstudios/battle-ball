var isTouch = "ontouchend" in document;
//var g_TouchObj = null;
var styles = {};
var pref = null;
var scale = 0;
user = {
	Start:function(){

		/*if(isMobile()){
			g_TouchObj = new touchObject(canvas);
		}*/

	},
	events:function(){
		$(document).ready(function(){

		    $(window).resize(function(){

		    	if(mobile){
		    		if(window.innerWidth < window.innerHeight){
		    			$('article.deviceorientation').css('display','block');
		    		}else{
		    			$('article.deviceorientation').css('display','none');
		    		}
		    	}

				$('canvas').height($('canvas').width() * 0.5);
				
				$('canvas').attr('width',playWidth);
				$('canvas').attr('height',playHeight);

				$(oCanvas).height($('canvas').width() * 0.5);
				
				$(oCanvas).attr('width',playWidth);
				$(oCanvas).attr('height',playHeight);

				$(o2Canvas).height($('canvas').width() * 0.5);
				
				$(o2Canvas).attr('width',playWidth);
				$(o2Canvas).attr('height',playHeight);

				pref = prefix.css+'transform';
				scale = $('canvas').height() / playHeight;	
				styles[pref] = 'scale('+scale+')';
				styles['margin'] = '0 '+$('canvas').offset().left+'px';
				$('article.menu, article.overlays').css(styles);
   
				ctx.mozImageSmoothingEnabled = false;
				ctx.webkitImageSmoothingEnabled = false;
				ctx.imageSmoothingEnabled = false;

            }).resize();

			//if(debug){
				/*$(document).on('keydown',function(e){
					if(game.gameState!==game.STATES.PLAY || !debug)return true;
					e.preventDefault();
					var ee = e.originalEvent;
					if(ee.which === 65){leftkey = !0;}
					if(ee.which === 68){rightkey = !0;}
					if(ee.which === 87){upkey = !0;}
					if(ee.which === 83){downkey = !0;}
				});
				$(document).on('keyup',function(e){
					if(game.gameState!==game.STATES.PLAY || !debug)return true;
					e.preventDefault();
					leftkey = !1;
					rightkey = !1;
					upkey = !1;
					downkey = !1;
				});*/
				//return;
			//}

			if(isMobile()){
				user.move('touchstart', 'touchend');
			}else{
				user.move('keydown mousedown', 'keyup mouseup', 'mousemove', 'mousewheel DOMMouseScroll');
			}
		});
	},
	/*checkOverlayCollision:function(e){
		var px = e.originalEvent.touches ? e.originalEvent.touches[0].pageX : e.originalEvent.pageX,
			py = e.originalEvent.touches ? e.originalEvent.touches[0].pageY : e.originalEvent.pageY;

		mouse.x = (getOffsetX(px))*(mouse.sx) >> 0;
		mouse.y = (getOffsetY(py))*(mouse.sy) >> 0;
		
		for(var i = 0, len = game.currentOverlay.buttons.length; i < len; i++){
			if(Menu.Collision(mouse,game.currentOverlay.buttons[i])){ return {hit:true,index:i}; }
		};

		return {hit:false};
	},
	checkMenuCollision:function(e){

		if(game.currentMenu===null || !game.currentMenu.active)return true;

		var px = e.originalEvent.touches ? e.originalEvent.touches[0].pageX : e.originalEvent.pageX,
			py = e.originalEvent.touches ? e.originalEvent.touches[0].pageY : e.originalEvent.pageY;

		mouse.x = (getOffsetX(px))*(mouse.sx) >> 0;
		mouse.y = (getOffsetY(py))*(mouse.sy) >> 0;
		
		for(var i = 0, len = game.currentMenu.buttons.length; i < len; i++){
			if(Menu.Collision(mouse,game.currentMenu.buttons[i])){ return {hit:true,index:i}; }
		};

		return {hit:false};
	},	*/
	move:function(downkeys,upkeys,keymove,keyscroll){
		
		/*$(canvas).on(keyscroll,function(e){
			e.preventDefault();
			if(!e || game.currentMenu===null || !game.currentMenu.active)return true;

			switch(e.type){
				case 'DOMMouseScroll':
				case 'mousewheel':
					if(game.gameState===game.STATES.MENU)game.currentMenu.scrollList(e.originalEvent);
				break;
			};

		});*/


		/*$(canvas).on(keymove,function(e){
			e.preventDefault();
			if(!e || game.currentMenu===null || !game.currentMenu.active)return true;

			switch(e.type){
				case 'mousemove':
					if(game.gameState===game.STATES.MENU){
						var _c = user.checkMenuCollision(e);
						if(_c&&_c.hit){if(!game.currentMenu.buttons[_c.index].hover&&!game.currentMenu.buttons[_c.index].nohover)sounds.menunavigate.play(); game.currentMenu.unTrigger('mousemove'); game.currentMenu.buttons[_c.index].Trigger('mousemove');}else{game.currentMenu.unTrigger('mousemove');}
					};
				break;
			};
		});*/
		
		
		$(document).on(downkeys,function(e){
			//e.preventDefault();

			if(!e)return true;
			//keycodes
			/*
				w - 87
				s - 83
				a - 65
				d - 68
				space - 32
			*/

			switch(e.type){
				case 'mousedown':
				case 'touchstart':
					if(game.gameState===game.STATES.PLAY){
						if(e.type!=='touchstart' && !mobile){
							if(g_Player!==null&&!g_Player.dead)g_Player.isJumping=true;//g_Player.Jump();
						}
					}
				break;

				case 'keydown':
					//e.preventDefault();
					switch(e.which){
						case 49:
							if(game.gameState===game.STATES.PLAY&&g_Player!==null&&!g_Player.dead){e.preventDefault(); g_Player.changeWeapon('machinegun');}
						break;

						case 50:
							if(game.gameState===game.STATES.PLAY&&g_Player!==null&&!g_Player.dead){e.preventDefault(); g_Player.changeWeapon('bazooka'); }
						break;
						
						/*case 27:
							if(debug)game.restart();
						break;*/
						case 80: // p
							if(game.gameState===game.STATES.PLAY){ if(g_Player.dead)return true; e.preventDefault(); sounds.background.stop(); game.gameState = game.STATES.MENU; PixelationImageMenu('ingame-pause'); $('div.ribbon').show(600);}
						break;
						case 88:
							if(game.gameState===game.STATES.PLAY&&g_Player!==null&&!g_Player.dead){e.preventDefault(); g_Player.changeWeapon(true);}
						break;
						/*case 66:
							if(game.gameState===game.STATES.PLAY){e.preventDefault(); debug = !debug;}
						break;*/

						case 87:
						case 38:
							if(game.gameState===game.STATES.PLAY&&g_Player!==null&&!g_Player.dead){ e.preventDefault(); g_Player.isJumping=true; }
						break;

						case 32:
							if(game.gameState===game.STATES.PLAY&&g_Player!==null){e.preventDefault();}
							if(game.gameState===game.STATES.PLAY&&g_Player!==null&&!g_Player.dead){ g_Player.Shoot(); }
						break;
					};
				break;
			};
		});

		$(document).on(upkeys,function(e){
			//e.preventDefault();

			if(!e)return;
			
			//if(g_Player&& g_Player.dead && g_Player.isGrounded){game.restart(); return;}
			
			switch(e.type){

				case 'keyup':
					switch(e.which){
						case 87:
						case 38:
							if(game.gameState===game.STATES.PLAY&&g_Player!==null&&!g_Player.dead){ e.preventDefault(); g_Player.stopJump(); /*g_Player.Fall();*/ }
						break;

						case 32:
							if(game.gameState===game.STATES.PLAY&&g_Player!==null&&!g_Player.dead){ e.preventDefault(); g_Player.StopShoot(); }
						break;
					};
				break;

				case 'mouseup':
				case 'touchend':
					if(game.gameState===game.STATES.PLAY&&g_Player!==null&&!g_Player.dead&&!mobile){ e.preventDefault(); g_Player.stopJump();/* g_Player.Fall();*/ }
					//if(game.gameState===game.STATES.PLAY&&g_Player!==null&&!g_Player.dead&&e.type==='touchend'){e.preventDefault(); g_Player.StopShoot();}
				break;
			};
		});
	}
};


/*function touchObject(element)
{
  var self = this;
  this.prev = {x:0, y:0};
  this.now = {x:0, y:0};


  function handleHammer(ev) {

 	if(game.gameState!==game.STATES.MENU)return false;

    // disable browser scrolling
    //ev.gesture.preventDefault();

    switch(ev.type) {
      case 'dragstart':
      	self.prev.x = ev.gesture.touches[0].pageX;
      	self.prev.y = ev.gesture.touches[0].pageY;
      break;


      case 'dragup':
      case 'dragdown':
      
      self.now.x = ev.gesture.touches[0].pageX;
      self.now.y = ev.gesture.touches[0].pageY;

      var delta = -(self.prev.y - self.now.y);
      
      game.currentMenu.scrollList(delta);

       self.prev.x = ev.gesture.touches[0].pageX;
       self.prev.y = ev.gesture.touches[0].pageY;


      break;
   }
  }

  new Hammer($('canvas#game'), { dragLockToAxis: true }).on("dragstart dragup dragdown", handleHammer);
}*/


user.Start();