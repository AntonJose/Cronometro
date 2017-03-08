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
        $("#laps").html("");
    });
    $("#lap").click(function () {
        $("#laps").append("<li>" + visual(centecimas) + "</li>");
        var lon = $("#laps").children().length;
        if (lon>1){
            lon--;
            console.log($("#laps li:nth-child("+lon+")").text());
            vuelta(visual(centecimas),$("#laps li:nth-child("+lon+")").text(),lon);
        }
    });

    function cron() {
        centecimas+=10;
        actualizarTimer();
    }

    function actualizarTimer() {
        $("#timer").html(visual(centecimas));
    }

    function visual(duracion){

        var ms = duracion % 1000;
        duracion = (duracion - ms) / 1000;
        var secs = duracion % 60;
        duracion = (duracion - secs) / 60;
        var mins = duracion % 60;
        var hrs = (duracion - mins) / 60;
        
        cadena = pad(hrs)+":"+pad(mins)+":"+pad(secs)+":"+pad(ms,3);
        return cadena;
        
    }
    
    function pad(n, z) {
            //para mostrar dos digitos siempre, y 3 en los milisegundos
            z = z || 2;
            return ('00' + n).slice(-z);
    };
    
    function vuelta(timeA,timeB,pos){
        pos++;
        var a = {
            hrs: timeA.substring(0,2),
            mins: timeA.substring(3,5) ,
            secs: timeA.substring(6,8),
            ms: timeA.substring(9,12)
        };
        console.log(a.hrs,a.mins,a.secs,a.ms);
        var b = {
            hrs: timeB.substring(0,2),
            mins: timeB.substring(3,5) ,
            secs: timeB.substring(6,8),
            ms: timeB.substring(9,12)
        };
        
        var c = {
            hrs: parseInt(a.hrs)-parseInt(b.hrs),
            mins: parseInt(a.mins)-parseInt(b.mins),
            secs: parseInt(a.secs)-parseInt(b.secs),
            ms: parseInt(a.ms)-parseInt(b.ms),
            comprueba: function(){
                        if (c.ms<0){
                            c.secs--;
                            c.ms = c.ms+1000;
                            }   
                        }
        };
        
        c.comprueba();
        
        cadena = pad(c.hrs)+":"+pad(c.mins)+":"+pad(c.secs)+":"+pad(c.ms,3);
        console.log(c.hrs,c.mins,c.secs,c.ms);
        $("#laps li:nth-child("+pos+")").append("<span style='color:blue'> --- "+cadena+"</span>");
        
    }
    
});