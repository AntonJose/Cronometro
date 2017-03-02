$(function () {
    var centecimas = 0;
    var cronometro;
    $("#start").click(function () {
        $("#start").addClass("disabled");
        $("#lap").removeClass("disabled");
        $("#stop").removeClass("disabled");
        $("#reset").removeClass("disabled");
        cronometro = setInterval(cron, 10);
    });
    $("#stop").click(function () {
        $("#stop").addClass("disabled");
        $("#start").removeClass("disabled");
        clearInterval(cronometro);
    });
    $("#reset").click(function () {
        $("#start").removeClass("disabled");
        $("#stop").addClass("disabled");
        $("#reset").addClass("disabled");
        $("#lap").addClass("disabled");
        clearInterval(cronometro);
        centecimas = 0;
        actualizarTimer();
    });
    $("#lap").click(function () {
        $("#laps").append("<li>" + visual(centecimas) + "</li>");
    });

    function cron() {
        centecimas+=10;
        actualizarTimer();
    }

    function actualizarTimer() {
        $("#timer").html(visual(centecimas));
    }

    function visual(duracion){
        
        function pad(n, z) {
            //para mostrar dos digitos siempre, y 3 en los milisegundos
            z = z || 2;
            return ('00' + n).slice(-z);
        }
        
        var ms = duracion % 1000;
        duracion = (duracion - ms) / 1000;
        var secs = duracion % 60;
        duracion = (duracion - secs) / 60;
        var mins = duracion % 60;
        var hrs = (duracion - mins) / 60;
        
        cadena = pad(hrs)+":"+pad(mins)+":"+pad(secs)+":"+pad(ms,3);
        return cadena;
        
    }
    
});