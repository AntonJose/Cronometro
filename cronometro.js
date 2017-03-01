$(function(){

var centecimas=0;
var cronometro ;
$("#start").click(function(){

	$("#start").addClass("disabled");
	$("#lap").removeClass("disabled");
	$("#stop").removeClass("disabled");
	$("#reset").removeClass("disabled");

	cronometro = setInterval(cron,10);
});

$("#stop").click(function(){
	$("#stop").addClass("disabled");
	$("#start").removeClass("disabled");

		clearInterval(cronometro);
});

$("#reset").click(function(){
	$("#start").removeClass("disabled");
	$("#stop").addClass("disabled");
	$("#reset").addClass("disabled");
	$("#lap").addClass("disabled");
	clearInterval(cronometro);
	centecimas=0;
	actualizarTimer();
});

$("#lap").click(function(){
	$("#laps").append("<li>"+$("#timer").val().toString()+"</li>");
});

function cron (){
	centecimas++;
	actualizarTimer();
}

function actualizarTimer(){
	$("#timer").html(centecimas);
}

});

