$(function ()
{
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

            cb(shortUrl);
         }
      });
   };

   var $up = $('.up .value');
   var $down = $('.down .value');
   var $left = $('.left .value');
   var $right = $('.right .value');
   var $start = $('.start .value');
   var $a = $('.a .value');
   var $b = $('.b .value');

   var socket = io.connect('http://santass.herokuapp.com');
    
   socket.on('welcome', function()
   {
      socket.emit("device", {"type":"game"});
   });

   socket.on("initialize", function(gameCode)
   {
      var qrcode = new QRCode("qrcode");
      qrcode.makeCode('http://christmas.vitaminlondon.com/15/socket/controller.html?gc=' + gameCode);
      console.log('http://christmas.vitaminlondon.com/15/socket/controller.html?gc=' + gameCode);
   });

   socket.on("connected", function()
   {
      $('#qrcode').hide();
      $(".wait").fadeOut();
   });

   socket.on('up', function()
   {
      console.log('up');
      var value = Number($up.text())+1;
      $up.text(value);
   });

   socket.on('down', function()
   {
      console.log('down');
      var value = Number($down.text())+1;
      $down.text(value);
   });
   socket.on('left', function()
   {
      console.log('left');
      var value = Number($left.text())+1;
      $left.text(value);
   });

   socket.on('right', function()
   {
      console.log('right');
      var value = Number($right.text())+1;
      $right.text(value);
   });

   socket.on('start', function()
   {
      console.log('start');
      var value = Number($start.text())+1;
      $start.text(value);
   });

   socket.on('a', function()
   {
      console.log('a');
      var value = Number($a.text())+1;
      $a.text(value);
   });

   socket.on('b', function()
   {
      console.log('b');
      var value = Number($b.text())+1;
      $b.text(value);
   });

   socket.on('disconnected', function() 
   {
      $('body').hide();    
   });
});
