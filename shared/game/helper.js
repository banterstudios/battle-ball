/*
==================
GLOBAL VARIABLES
==================
*/
var debug = !1;
var music = !0;
var sfx = !0;
var leftkey = !1;
var rightkey = !1;
var upkey = !1;
var downkey = !1;
var isLoggedIn = false;
var postScore = false;

var canvas = document.getElementsByTagName('canvas')[0],
	ctx = canvas.getContext('2d');
  ctx.mozImageSmoothingEnabled = false;
  ctx.webkitImageSmoothingEnabled = false;
  ctx.imageSmoothingEnabled = false;
  //setpixelated(ctx);
 // ctx.imageSmoothingEnabled = false;


var w = window;
var requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
var cancelAnimationFrame = w.cancelAnimationFrame || w.webkitCancelRequestAnimationFrame || w.msCancelRequestAnimationFrame || w.mozCancelRequestAnimationFrame || clearTimeout;

var playWidth = canvas.width;
var playHeight = canvas.height;
var scrollWidth = 960;
var scrollHeight = 576;

var oCanvas = document.createElement('canvas');
var oCtx = oCanvas.getContext('2d');
oCtx.mozImageSmoothingEnabled = false;
oCtx.webkitImageSmoothingEnabled = false;
oCtx.imageSmoothingEnabled = false;
//setpixelated(oCtx);
//oCtx.imageSmoothingEnabled = false;
oCanvas.width = playWidth;
oCanvas.height = playHeight;


var o2Canvas = document.createElement('canvas');
var o2Ctx = o2Canvas.getContext('2d');
o2Ctx.mozImageSmoothingEnabled = false;
o2Ctx.webkitImageSmoothingEnabled = false;
o2Ctx.imageSmoothingEnabled = false;

o2Canvas.width = playWidth;
o2Canvas.height = playHeight;



/*PIXELATION EFFECT*/
var pixelBlock = 50,
    pixelSize = pixelBlock * 0.01,
    pixelWidth = playWidth * pixelSize,
    pixelHeight = playHeight * pixelSize,
    pixelImage = new Image(),
    pixelActive = false,
    pixelStart = 0,
    pixelEnd = 0,
    pixelDelta = 0,
    pixelMenuToChangeTo = 'ingame-pause';


function PixelationImageMenu(_menu){
  pixelMenuToChangeTo = _menu;
  pixelActive = true;
  ctx.mozImageSmoothingEnabled = false;
  ctx.webkitImageSmoothingEnabled = false;
  ctx.imageSmoothingEnabled = false;
  pixelImage.src = canvas.toDataURL();
  
  pixelStart = Date.now();
  //cancelAnimationFrame(game._render);

  //STRETCH THE IMAGE
  ctx.drawImage(pixelImage, 0, 0, pixelWidth, pixelHeight);

  //DRAW STRETCH IMAGE TO CANVAS FULL WIDTH/HEIGHT
  ctx.drawImage(canvas,0,0,pixelWidth,pixelHeight,0,0,playWidth,playHeight);
}; 

function updatePixelationImageMenu(){
  if(!pixelActive)return false;

  pixelEnd = Date.now();
  pixelDelta = (pixelEnd - pixelStart) / 400;

  pixelBlock -= pixelDelta;
  if(pixelBlock <= 2){ pixelBlock = 2; game.currentMenu.changeMenu(g_Menus[pixelMenuToChangeTo]); pixelActive = false;};

  pixelSize = pixelBlock * 0.01;
  pixelWidth = playWidth * pixelSize;
  pixelHeight = playHeight * pixelSize;

  ctx.drawImage(pixelImage, 0, 0, pixelWidth, pixelHeight);
  //DRAW STRETCH IMAGE TO CANVAS FULL WIDTH/HEIGHT
  ctx.drawImage(canvas,0,0,pixelWidth,pixelHeight,0,0,playWidth,playHeight);
};

function resetPixelationImageMenu(){
  pixelBlock = 50;
  pixelActive = true;
  pixelSize = pixelBlock * 0.01;
  pixelWidth = playWidth * pixelSize;
  pixelHeight = playHeight * pixelSize;
};


function setpixelated(ctx){
    ctx['imageSmoothingEnabled'] = false;       /* standard */
    ctx['mozImageSmoothingEnabled'] = false;    /* Firefox */
    ctx['oImageSmoothingEnabled'] = false;      /* Opera */
    ctx['webkitImageSmoothingEnabled'] = false; /* Safari */
    ctx['msImageSmoothingEnabled'] = false;     /* IE */
};


var isMobile = function ()
{
  return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))
}
var mobile = isMobile();

var mouse = {
  x:0,
  y:0,
  w:10,
  h:10,
  sx:0,
  sy:0
};

/*
==================
HELPER FUNCTIONS
==================
*/

function Vector(x,y){
	this.x = x || 0;
	this.y = y || 0;
};

var pattern = function(_bg){
	var ptrn = ctx.createPattern(_bg, 'repeat'); // Create a pattern with this image, and set it to "repeat".
    ctx.fillStyle = ptrn;
    ctx.fillRect(0, 0, playWidth, playHeight); // ctx.fillRect(x, y, width, height);
};

var debug_console = {
	warn:function(_e){console.warn(_e);},
	log:function(_e){console.log(_e);}
}

function getBase64Image(img) {
    var _canvas = document.createElement("canvas");
    _canvas.width = img.width;
    _canvas.height = img.height;

    var _ctx = _canvas.getContext("2d");
    _ctx.drawImage(img, 0, 0);

    var dataURL = _canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

function loadSprites(src,callback){
	var sprite = new Image();
    sprite.src = src;
    sprite.onload = function(){callback(sprite);}
};

function getOffsetX(x){
 
  var rect = canvas.getBoundingClientRect();
  return x-rect.left;
 // return x-$('canvas').offset().left;
};
function getOffsetY(y){
  var rect = canvas.getBoundingClientRect();
  return y-rect.top;
  //return y-$('canvas').offset().top;
};

/*
==========
COLLISION
==========
*/
var getCenterDifference=function(a,b){

    var x = a.x - b.x;
    var y = a.y - b.y;

    return ({x:Math.abs(x),y:Math.abs(y)});

};



var boundingBoxCollision = function(a, b, _cp, _ovr) {
//if tile
/*
    tile.collision if collision is false then its not a collidable object so continue
    tile.inView  if inview is false then continue, no point doing collision if its not in the view. 
*/
  if(!_ovr){
    if(a.dead || b.dead || a.layer===b.layer || !a.collision || !b.collision || a.type==='Deer'&&b.type==='Player' || a.type==='Deer'&&b.type==='Deer' || a.type==='Elf'&&b.type==='Player' || a.type==='Elf'&&b.type==='Elf' || a.type==='Elf'&&b.type==='Deer' || a.type==='Deer'&&b.type==='Elf')return false;
  }

   if((b.position.x < _cp.x + a.bbox.x &&
   b.position.x + b.bbox.x > _cp.x &&
   b.position.y < _cp.y + a.bbox.y &&
   b.bbox.y + b.position.y > _cp.y)){


    if(b.type==='RoadHole'){
    
    if((b.position.x-5) < _cp.x + a.bbox.x &&
    ((b.position.x + b.bbox.x)-5) > _cp.x){
      return true;
    }else{
      return false;
    }
    /*  if(_cp.y >= ((b.position.y))){
        return true;
      }else{
        return false;
      }*/
    }else{
      
    }

    if(!b.childrenBoundingBoxes || b.childrenBoundingBoxes.length <= 0 || _ovr)  return true;
    for(var i = 0, len = b.childrenBoundingBoxes.length; i < len; i++){
       if((b.childrenBoundingBoxes[i].position.x < _cp.x + a.bbox.x &&
         b.childrenBoundingBoxes[i].position.x + b.childrenBoundingBoxes[i].bbox.x > _cp.x &&
         b.childrenBoundingBoxes[i].position.y < _cp.y + a.bbox.y &&
         b.childrenBoundingBoxes[i].bbox.y + b.childrenBoundingBoxes[i].position.y > _cp.y)){ return true; }
   };
  };

  return false;
 /* if((Math.abs(_cp.x - b.position.x) * 2 < (a.bbox.x + b.bbox.x)) &&
         (Math.abs(_cp.y - b.position.y) * 2 < (a.bbox.y + b.bbox.y))){

    console.log(Math.abs(_cp.x - b.position.x)*2);
    console.log((a.bbox.x + b.bbox.x));

    return true;*/
      /*if(b.platform){ // if a platform object
        if((a.position.y+a.bbox.y)<= b.position.y){return true;}
        return false;
      };*/

      /* switch(_cp.side){
        case Character.DIRECTIONS.UP:
         if (_cp.y > (b.position.y+b.bbox.y) && _cp.y < b.position.y){
            return true;
          }
        break;

        case Character.DIRECTIONS.DOWN:
          if((_cp.y+a.bbox.y) > b.position.y && _cp.y < b.position.y){
            return true;
          }
        break;

        case Character.DIRECTIONS.LEFT:
         if(_cp.x < (b.position.x+b.bbox.x) && (_cp.x+a.bbox.x) > (b.position.x+b.bbox.x)){
            return true;
          }
        break;

        case Character.DIRECTIONS.RIGHT:
           if((_cp.x+a.bbox.x) > b.position.x && _cp.x < b.position.x){
            return true;
          }
        break;
      }*/
  
     /* var aCenter = {
        x:((_cp.x)+(a.bbox.x/2)),
        y:((_cp.y)+(a.bbox.y/2))
      };
      var bCenter = {
        x:((b.position.x)+(b.bbox.x/2)),
        y:((b.position.y)+(b.bbox.y/2))
      };

        var difference = getCenterDifference(bCenter,aCenter);//objectBCenter - objectACenter;
        if(difference.x > difference.y && difference.x > 0) { if(_cp.side===Character.DIRECTIONS.RIGHT){return true;}  } //right
        if(difference.x > difference.y && difference.x < 0) { if(_cp.side===Character.DIRECTIONS.LEFT){return true;}  } //left
        if(difference.x < difference.y && difference.y > 0) { if(_cp.side===Character.DIRECTIONS.DOWN){return true;}  } //down
        if(difference.x < difference.y && difference.y < 0) { if(_cp.side===Character.DIRECTIONS.UP){return true;}  } //up*/

       /* return false;
    }

    return false;*/

};

var slopeCollision=function(ax,ay,bx,by,prr){
	for(var l=prr.length,i=0,s,t;i<l;i++){
		t=((prr[i][0]-ax)*(by-ay)/(bx-ax)+ay-prr[i][1]);
	if(!t) return !0; t=t>0?1:-1; if(i&&t!=s) return !0; s=t;
	}return !1;
};

/*
if(slopeCollision(slopes[i].slopeline1.x,slopes[i].slopeline1.y,slopes[i].slopeline2.x,slopes[i].slopeline2.y,
	[[playerline1.x,playerline1.y],[playerline2.x,playerline2.y],[playerline3.x,playerline3.y],[playerline4.x,playerline4.y]])){
	self.finished = true;
 	return true;
}
*/

function rotate(x, y, xm, ym, a) {
    var cos = Math.cos,
        sin = Math.sin,

        a = a * Math.PI / 180, // Convert to radians because that is what
                               // JavaScript likes

        // Subtract midpoints, so that midpoint is translated to origin
        // and add it in the end again
        xr = (x - xm) * Math.cos(a) - (y - ym) * Math.sin(a)   + xm,
        yr = (x - xm) * Math.sin(a) + (y - ym) * Math.cos(a)   + ym;

    return {x:xr, y:yr};
}

function toggleFullScreen() {
  var doc = window.document;
  var docEl = doc.documentElement;

  var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
  var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

  if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
    requestFullScreen.call(docEl);
  }
  else {
   // cancelFullScreen.call(doc);
  }
}


function compare(a,b) {
  if (a.x < b.x)
    return -1;
  if (a.x > b.x)
    return 1;
  return 0;
}

var prefix = (function () {
  var styles = window.getComputedStyle(document.documentElement, ''),
    pre = (Array.prototype.slice
      .call(styles)
      .join('') 
      .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
    )[1],
    dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
  return {
    dom: dom,
    lowercase: pre,
    css: '-' + pre + '-',
    js: pre[0].toUpperCase() + pre.substr(1)
  };
})();


/*
VALIDATIONS
*/
function validateEmail(email) {
  if(email === '')return false;
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
};

function validatePassword(password){
  if(password === '')return false;
  var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    return re.test(password);

    /*
    matches a string of six or more characters;
    that contains at least one digit (\d is shorthand for [0-9]);
    at least one lowercase character; and
    at least one uppercase character:
  */
};

function validateName(name){
  if(name === '')return false;
  if(name.length < 2)return false;
  if(name.length > 10)return false;
  return true;
};




/*function ProjectileEquation(_opts) {  
    
    this.startVelocity = new Vector(_opts&&_opts.vx || 0, _opts&&_opts.vy || 0);  
    this.startPoint = new Vector(_opts&&opts.x || 0, _opts&&_opts.y || 0);  
};

ProjectileEquation.prototype.getX=function(t){  
  return this.startVelocity.x * t + this.startPoint.x;  
}; 
  
ProjectileEquation.prototype.getY=function(t){
  return 0.5 * Character.gravity * t * t + this.startVelocity.y * t + this.startPoint.y;  
}; */   

/*function Trajectory(target, object){
 
  this.distance = target.position.x - object.position.x;
  this._time = this.distance;
  this.velocity = new Vector(0,0);
  this.velocity.x = (this.distance/this._time);
  this.velocity.y =  (this._time * Character.gravity * 0.5);

};
Trajectory.prototype.Update=function(object){

  if(object.Up(this.velocity.y))return true;
  if(object.Down(-this.velocity.y))return true;

  object.position.x += this.velocity.x;
  object.position.y -= this.velocity.y;

  this.velocity.y -= Character.gravity;

  return false;
}; */


function Trajectory(target, object){

  this.velocity = new Vector(2.8,0);
  var dx = (target.position.x - object.position.x);
  var dy = (target.position.y - object.position.y);

  this.dt = Math.sqrt(dx*dx + dy*dy) / this.velocity.x;
  this.velocity.y = Character.gravity * this.dt / 2;

  object.velocity.x = this.velocity.x;
  object.velocity.y = this.velocity.y;


};
Trajectory.prototype.Update=function(object){

  //if(object.Up(this.velocity.y, true))return true;
 // if(object.Down(this.velocity.y, true))return true;

  //this.velocity.y += Character.gravity;
  //object.position.x += this.velocity.x;
  //object.position.y += this.velocity.y;
};



var subtractVector = function(target, object){
    return {x: target.position.x-object.position.x, y:target.position.y-object.position.y};
};
var magnitudeX = function(object){
  return Math.sqrt(object.x*object.x);
};
var normalize = function(object, dist, vel){
  return {x:(object.x / dist)*vel, y:(object.y / dist)*vel};
};

function BallisticVel(target, object, angle){

 

};



