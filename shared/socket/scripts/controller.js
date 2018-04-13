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
      socket.emit("device", {"type":"controller", "gameCode":gameCode});
   });

   // When game code is validated, we can begin playing...
   socket.on("connected", function(data)
   {
      $('#landscape .waiting').fadeOut();

      // JUMP
      $('.cross>div').on('touchend', function ()
      {
         if (!inMenu)
         {
            socket.emit('jump');
            console.log('jump');
         }
      });

      // UP/DOWN/LEFT/RIGHT
      $('.cross>div>div').on('touchend', function ()
      {
         if (inMenu)
         {
            socket.emit($(this).attr('class'));
            console.log('cross');
         }
      });

      // START
      var inMenu = false;
      $('.main .middle>div .middle').click(function ()
      {
         if (!inMenu) inMenu = true;
         else inMenu = false;
         socket.emit("start");
      });

      // A/B
      $('.main .buttons>.btns>div>div').on('touchend', function ()
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
      $('#landscape .waiting').html('connection failed<br>close this window<br>and get a new link from the main site').fadeIn();
   });

   socket.on('disconnected', function() 
   {
      $('body').hide();  
   });
});