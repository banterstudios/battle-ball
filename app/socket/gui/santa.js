var isMobile = (function ()
{
	return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))
})();

$(function ()
{
	if (isMobile) $('body').html('');

	var scaledHeightRatio = 3.3;
	var scaledMarginTopRatio = 1.58;

	var maxTvWidth = 3460;
	var tvHeightWidthRatio = 4984/3106; //1.6;
	
	var tvWindowHeightRatio = 0.6;
	var tvWindowHeightRatioPercent = '60%';

	var timesScaledTvWidthIsBiggerThanWindoWidth = 2900/1284;
	
	$(window).resize(function ()
	{
		if ($('#santa-gui').hasClass('scaled'))
		{
           scale();
		}
		else
		{
			var windowWidth = $(window).width();

			var newTvHeight = $('.tv').height();
			var newTvWidth = newTvHeight * tvHeightWidthRatio;
			newTvHeight = '60%';

			if (newTvWidth > windowWidth)
	        {
				newTvWidth = windowWidth;
				newTvHeight = (newTvWidth / tvHeightWidthRatio) + 'px';
			}
			else if (newTvWidth > maxTvWidth)
	        {
				newTvWidth = maxTvWidth;
				newTvHeight = (newTvWidth / tvHeightWidthRatio) + 'px';
			}

			$('.tv').css({
				width: newTvWidth,
				height: newTvHeight
			});
		}

		if ($(window).width() < 500) $('#santa-gui>.title>.qr').hide();
		else $('#santa-gui>.title>.qr').show();
	}).resize();

	var scale = function ()
	{
		$('#qr').hide();

		var currentWindowWidth = $(window).width();

		var scaledTvWidth = currentWindowWidth * timesScaledTvWidthIsBiggerThanWindoWidth;
		var scaledTvLeft = '-52%';
		var scaledTvMarginLeft = 0;
		if (scaledTvWidth > maxTvWidth) 
		{
			scaledTvWidth = maxTvWidth;
			scaledTvLeft = '50%';
			scaledTvMarginLeft = '-99%';
		}

		var scaledTvHeight = scaledTvWidth / tvHeightWidthRatio;

		var scaledContainerHeight = scaledTvHeight / tvWindowHeightRatio;
		var scaledContainerMarginTop = -(scaledContainerHeight/scaledMarginTopRatio);

		$('#santa-gui').addClass('scaled').stop().animate({
			top: '50%',
            height: scaledContainerHeight,
			marginTop: scaledContainerMarginTop
        },{queue: false,duration: 1000});

        $('.tv').animate({
			left: scaledTvLeft,
			marginLeft: scaledTvMarginLeft,
			width: scaledTvWidth,
			height: scaledTvHeight
		},{
			queue: false,
			duration: 1000,
			complete: function ()
			{
				$('#santa-gui>.tv>.static').fadeOut();
			}
		});
	};

	var unscale = function ()
	{
		var newTvHeight = $(window).height() * tvWindowHeightRatio;
		var newTvWidth = newTvHeight * tvHeightWidthRatio;
		newTvHeight = '60%';

		if (newTvWidth > maxTvWidth)
        {
			newTvWidth = maxTvWidth;
			newTvHeight = (newTvWidth / tvHeightWidthRatio) + 'px';
		}

        $('#santa-gui').removeClass('scaled').stop().animate({
			top: 0,
            height: '100%',
			marginTop: 0
        },{queue: false,duration: 1000});

        $('.tv').stop().animate({
			left: 0,
			marginLeft: 0,
			width: newTvWidth,
			height: newTvHeight
		},{
			queue: false,
			duration: 1000,
			complete: function ()
			{
				if ($(window).width() >=500 ) $('#qr').show();
				$('#santa-gui>.tv>.static').fadeIn();
			}
		});
	};

	$('.tv').click(function ()
	{
		if ($('#santa-gui').hasClass('scaled')) unscale();
		else scale();
	});
    
    var animating = true;
	$('#qr').mouseenter(function ()
	{
	 	if (animating) return;

	 	animating = true;
	 	
	 	$(this).animate({
	 		left: '50%',
            marginLeft: -225
	 	}, function ()
	 	{
	 		animating = false;
	 	});
	}).click(function ()
	    {
	    	if (animating) return;

		 	animating = true;
		 	
		 	$(this).animate({
		 		left: '100%',
	            marginLeft: -63
		 	}, function ()
		 	{
		 		animating = false;
		 	});
	    });
    
    setTimeout(function ()
    {
		$('#qr').animate({marginLeft: -200}, 800, function () 
		{
	    	setTimeout(function ()
			{
				$('#qr').animate({marginLeft: -63}, 800, function ()
				{
	               animating = false;
				});
			}, 100);
		});
	}, 1000);


});