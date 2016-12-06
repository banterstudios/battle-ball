if(!isMobile()){
   $(function ()
   {

      var socket = io.connect('http://santass.herokuapp.com');
       
      socket.on('welcome', function()
      {
         socket.emit("device", {"type":"game"});
      });

      socket.on("initialize", function(gameCode)
      {
         var qrcode = new QRCode("qrcode");
         var url = 'http://christmas.vitaminlondon.com/15/socket/controller.html?gc=' + gameCode;
         qrcode.makeCode(url);

          $.ajax({
               url: 'https://www.googleapis.com/urlshortener/v1/url?key=AIzaSyBNmtrVhiWeAelz6W-1N_Xeuq8H6OYI27U',
               type: 'POST',
               contentType: 'application/json; charset=utf-8',
               data: '{ longUrl: "' + url + '"}',
               dataType: 'json',
               complete: function (response) 
               {
                  try {
                     var shortURL = JSON.parse(response.responseText).id;
                     if (shortURL.length) $('#qrlink').text(shortURL);
                  }
                  catch (err) {
                     conditional_log('failed to create shortURL (see below)');
                     conditional_log(err);
                  }
               }
            });
      });

      socket.on("connected", function()
      {
         // connection established
      });

      socket.on('disconnected', function()
      { 
        // window.location.reload();
      });


      socket.on('jump', function()
      { 
        g_Player.Jump(); 
      });

      socket.on('up', function()
      {  
         
      });
      socket.on('down', function()
      {
         
      });
      socket.on('left', function()
      {
         
      });
      socket.on('right', function()
      {
        
      });

      socket.on('start', function()
      {
         if(game.gameState===game.STATES.PLAY){sounds.background.stop(); game.gameState = game.STATES.MENU; game.currentMenu.changeMenu(g_Menus['ingame-pause']);}
      });

      socket.on('a', function()
      {
         g_Player.changeWeapon(true);
        //change weapon
      });

      socket.on('b', function()
      {
         //shoot
         g_Player.Shoot();
      });
   });
};


/*
var getShortUrl = function (longUrl, cb)
{
   $.ajax({
      url: 'https://www.googleapis.com/urlshortener/v1/url?key=AIzaSyBNmtrVhiWeAelz6W-1N_Xeuq8H6OYI27U',
      type: 'POST',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify({
         "longUrl": longUrl
      }),
      dataType: 'json',
      complete: function(response) 
      {
         var shortUrl = '';
         try {
            shortUrl = JSON.parse(response.responseText).id;
         }
         catch (err) {
            shortUrl = '';
         }

         cb (shortUrl);
      }
   });
};
*/
