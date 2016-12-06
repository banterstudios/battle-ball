$(function ()
{
	$(window).resize(function ()
	{
		var wwidth = $('body>.center').width();

		$('body>.center').css({
			height: wwidth/2,
			marginTop: -(wwidth/4)
		});
        
        var canvasWidth = wwidth * 0.52
		$('body>.center>.game').css({
			width: canvasWidth,
			height: canvasWidth/2
		});
	}).resize();
});