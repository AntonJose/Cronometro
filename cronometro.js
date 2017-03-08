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
        var lon = $("#laps").children().length;
        if (lon>1){
            lon--;
           /* console.log($("#laps li:nth-child("+lon+")").text());*/
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
        pos++;  //Para ubicar la posicion en la que nos encontramos de la lista
        var color="red"; //Variable usada para definir el color
        var d = $("#laps li:nth-child("+(pos-1)+")").text();
        //En d obtengo el string contemplado en el elemento li actual
        //console.log("D:",d);
        
        
        /*------------Obtengo valores para comparar y calcular tiempo de esta vuelta-----------*/
        
        var a = {   //Tiempo actual que llevamos, el total//
            hrs: timeA.substring(0,2),
            mins: timeA.substring(3,5) ,
            secs: timeA.substring(6,8),
            ms: timeA.substring(9,12)
        };
       /* console.log(a.hrs,a.mins,a.secs,a.ms);*/
        var b = {   //Tiempo total de la vuelta anterior//
            hrs: timeB.substring(0,2),
            mins: timeB.substring(3,5) ,
            secs: timeB.substring(6,8),
            ms: timeB.substring(9,12)
        };
        
        var c = {   //Aqui calculamos el tiempo de esta vuelta, restando la vuelta anterior al tiempo total//
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
        
        c.comprueba(); //Compruebo que los ms no se quedan en negativo
        
        /*------------Selecciono los valores de distinta manera en la vuelta 1 y el resto de vueltas, aqui guardo la vuelta anterior-----------*/
        if(pos-1==1){
            d = {
                hrs: d.substring(0,2),
                mins: d.substring(3,5) ,
                secs: d.substring(6,8),
                ms: d.substring(9,12)
            }
        }else{
            d = {
                hrs: d.substring(17,19),
                mins: d.substring(20,22) ,
                secs: d.substring(23,25),
                ms: d.substring(26,29)
            }
        }
        
        /*------------En cadena tengo la vuelta actual con formato de impresion-----------*/
        cadena = pad(c.hrs)+":"+pad(c.mins)+":"+pad(c.secs)+":"+pad(c.ms,3);
        
        /*------------En cadena 2 tengo la vuelta anterior, y en cadena 4 la vuelta actual sin formato, para realizar operaciones-----------*/
        
        /*La razon de tener estos valores en cadena, es para calcular de manera mas sencilla los minutos,segundos,etc*/
        cadena2 = pad(parseInt(d.hrs))+pad(parseInt(d.mins))+pad(parseInt(d.secs))+pad(parseInt(d.ms),3);
        
        cadena4 = pad(c.hrs)+pad(c.mins)+pad(c.secs)+pad(c.ms,3);
        
        
        /*-----Resto los valores, si el valor es negativo, has tardado menos, y lo pongo en verde y le quito el negativo, si no, saldra en rojo-----*/
        var res = parseInt(cadena4)-parseInt(cadena2);
        
        if (res<0){
            color="green";
            res = res*-1;
        }
        
        
        
        //console.log(pos," ",cadena3,"cadena2: ",cadena4);
        /*console.log(difer.hrs,difer.mins,difer.secs,difer.ms);
        console.log(c.hrs,c.mins,c.secs,c.ms);
        */
        $("#laps li:nth-child("+pos+")").append("<span style='color:blue'> --- "+cadena+" --- "+"</span>"+"<span style='color:"+color+"'>"+conversor(res)+"</span>");
        
    }
    
    
    /*------------Funcion para convertir el tiempo de cadenas anterior, a el formato en el cual imprimo los numeros-----------*/
    function conversor(time){
        var hras=0,min=0,sec=0;
        while (time>=10000000){
            hras++;
            time = time - 10000000;
        }
        while (time>=100000){
            min++;
            time = time - 100000;
        }
        while (time>=1000){
            sec++;
            time = time - 1000;
        }
        
        var convertido = {
            hrs: hras,
            mins: min,
            secs: sec,
            ms: time
        }
        
        var cadena = pad(convertido.hrs)+":"+pad(convertido.mins)+":"+pad(convertido.secs)+":"+pad(convertido.ms,3);
        return cadena;
    }
    
});