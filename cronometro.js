$(function(){
var segundos=0;
var minutos=0;
var horas=0;
var centecimas=0;

$("#start").click(function(){

	$("#start").addClass("disabled");
	$("#lap").removeClass("disabled");
	$("#stop").removeClass("disabled");
	$("#reset").removeClass("disabled");

	var cronometro = setInterval(c,10);
});

$("#stop").click(function(){
	$("#stop").addClass("disabled");
	$("#start").removeClass("disabled");

		clearInterval(cronometro);
});

$("#reset").clicl(function(){
	$("#stop").addClass("disabled");
	$("#start").removeClass("disabled");
	$("#reset").addClass("disabled");
	$("#lap").addClass("disabled");
});

$("#lap").click(function(){
	$("#laps").append("<li>"+cronometro+"</li>");
});

});

