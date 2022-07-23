/*
	Copyright Hadrian Bell (Dev1lroot) All Rights Reserved.
	------------------------------------------------------
	Requirements: JQuery@3.5.1
*/
$(document).ready(function()
{
	console.log('ready');
	/* скроллер вниз, с полной конфигой */
	$(".dev1-scroll").click(function (event) {
		if($(this).attr("data-scroll")){
			var dest = 0;
			var time = 0;
			dest = parseInt(eval($(this).attr("data-scroll")));
			if($(this).attr("data-time")){
				time = parseInt($(this).attr("data-time"));
			}
			$('html,body').animate({
		        scrollTop: dest
		    }, time, 'swing');
		}
	});
	/* Показ Меню при скролле вниз */
	$(window).scroll(function(){
		var scrollPos = $(document).scrollTop();
		$(".dev1-scroll-fadein").each(function(e){
			if($(this).attr("data-start") && $(this).attr("data-shown")){
				var s = 0;
				var d = s + $(this).height();
				s = parseInt(eval($(this).attr("data-start")));
				if ($(this).attr("data-shown")) {
					d = parseInt(eval($(this).attr("data-shown")));
				}
				$(this).css("opacity",(scrollPos - s)/(d - s));
				if(s > scrollPos){
					$(this).css("opacity",0);
				}
				if(scrollPos > d){
					$(this).css("opacity",1);
				}
			}
		});
	});
});
var disability = 1;
/* анимация исчезновения */
function endModal(modal){
	if (typeof modal === 'string') {
		modal = $(".modal#"+modal);
	}
	else
	{
		modal = $(modal).parent("modal");
	}
	$(modal).fadeOut(500);
	$(modal).find(".modal-dialog").animate({ 
		marginTop: "+=200",
	}, 500 );
}
/* анимация появления */
function runModal(modal){
	$(".modal").each(function(e){
		if($(this).attr("id") != modal){
			$(this).fadeOut(500);
			$(this).find(".modal-dialog").animate({ 
		        marginTop: "+=200",
		    }, 500 );
		}else{
			$(this).find(".modal-dialog").css("margin-top","-200px");
		}
	})
	$(".modal#"+modal).find(".modal-dialog").animate({ 
		marginTop: "0",
	}, 500 );
	$(".modal#"+modal).fadeIn(500);
	$(".modal#"+modal).on("click", function(e){
		if(disability == 1){
			endModal(modal);
		}
	});
	$(".modal#"+modal).children().on("click", function(e){
		e.stopPropagation(); 
	});
	$(".modal#"+modal).find(".close").on("click", function(){
		endModal(modal);
	});
}
/* 
	ваще кажется лучше было делать свои собственные модалки чем юзать это говно) 
	UIKITовские модалки тоже говно кста, так что ждите что я свои выпущу, 
	которые будут полностью через JS и не иметь своих стилей, чтобы не пришлось их
	через !important перестилизировать.
*/
function screenshot(object)
{
	runModal("screenshot");
	$("#screenshot-view").attr("src",$(object).attr("src"));
}
function fallbackCopyTextToClipboard(text) {
	var textArea = document.createElement("textarea");
	textArea.value = text;
  
	// Avoid scrolling to bottom
	textArea.style.top = "0";
	textArea.style.left = "0";
	textArea.style.position = "fixed";

	document.body.appendChild(textArea);
	textArea.focus();
	textArea.select();

	try {
		var successful = document.execCommand('copy');
		var msg = successful ? 'successful' : 'unsuccessful';
		console.log('Fallback: Copying text command was ' + msg);
	} catch (err) {
		console.error('Fallback: Oops, unable to copy', err);
	}

	document.body.removeChild(textArea);
}
function ctrlC(text)
{
	if (!navigator.clipboard)
	{
		fallbackCopyTextToClipboard(text);
		return;
	}
	navigator.clipboard.writeText(text).then(function()
	{
		console.log('Async: Copying to clipboard was successful!');
	}, function(err) {
		console.error('Async: Could not copy text: ', err);
	});
}