$(function ()
{
   var launchIntoFullscreen = function (element) 
   {
      if(element.requestFullscreen) {
       element.requestFullscreen();
      } else if(element.mozRequestFullScreen) {
       element.mozRequestFullScreen();
      } else if(element.webkitRequestFullscreen) {
       element.webkitRequestFullscreen();
      } else if(element.msRequestFullscreen) {
       element.msRequestFullscreen();
      }
   };

   var exitFullscreen = function () 
   {
      if(document.exitFullscreen) {
       document.exitFullscreen();
      } else if(document.mozCancelFullScreen) {
       document.mozCancelFullScreen();
      } else if(document.webkitExitFullscreen) {
       document.webkitExitFullscreen();
      }
   };

   var inMenu = false;

   launchIntoFullscreen(document.documentElement);

   $(window).resize(function ()
   {
      if ($(window).height() > $(window).width())
      {
         $('#portrait').fadeIn();
         $('#landscape').hide();
         exitFullscreen();
      }
      else
      {
         window.scrollTo(0,1);
         $('#landscape').fadeIn();
         $('#portrait').hide();
         launchIntoFullscreen(document.documentElement);
      }
   }).resize();

   var gameCode = window.location.href.match(/\?gc=(.+)$/)[1];
   var socket = io.connect('http://santass.herokuapp.com/');

   // When server replies with initial welcome...
   socket.on('welcome', function(data)
   {
      // Send 'controller' device type with our entered game code
      socket.emit("device", {
         "type" : "controller", 
         "gameCode" : gameCode
      });
   });

   socket.on('late', function ()
   {
      console.log('another controller already connected to the game-session that this controller tried to connect to');
      console.log('should send to vitamin');
      $('#landscape .waiting').html("you've been really naughty (I like it)<br><br>now get a new link and try again").fadeIn();
   });

   // When game code is validated, we can begin playing...
   socket.on("connected", function(data)
   {
      $('#landscape .waiting').fadeOut();

      // JUMP
      $('.cross').on('touchstart', function ()
      {
         if (!inMenu) socket.emit('jump');
      });

      // UP/DOWN/LEFT/RIGHT
      $('.cross>div>div').on('touchend', function ()
      {
         if (inMenu) socket.emit($(this).attr('class'));
      });

      // START
      $('.main .middle>div .middle').on('touchend', function ()
      {
         if (!inMenu) inMenu = true;
         else inMenu = false;
         socket.emit("start");
      });

      // A/B
      $('.main .buttons>.btns>div>div').on('touchstart', function ()
      {
         socket.emit($(this).parent().attr('class'));
      });

      socket.on('disconnected', function() 
      {
         $('body').hide();  
      });
   });

   socket.on("fail", function()
   {
      $('#landscape .waiting').html("you've been really naughty (I like it)<br><br>now get a new link and try again").fadeIn();
   });

   socket.on('disconnected', function() 
   {
      $('#landscape .waiting').html("Nooooooooooo!!<br><br>(disconnected)").fadeIn();
   });
});