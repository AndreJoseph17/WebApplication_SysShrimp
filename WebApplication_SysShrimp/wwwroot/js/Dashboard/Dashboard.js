

$(document).ready(function () {
    $('#tabla1').hide();
    $('#tabla2').hide();
    $('#reporteGeneral').hide();
    $('#filtro').hide();
    $('#infoTiempoTunel').hide();
    $('#infoTiempoTunel2').hide();
    GenerarDashboard();
    ObtenerListaTuneles();
    $('#alerta').hide();
    $('#tabla5').hide();
});


function GenerarDashboard() {
    //Marcamos como fecha de inicio el 01 de Enero del 2022 por default
    const fechaInicio = new Date('Jan 01 2022');

    //Marcamos como fecha de fin la fecha de hoy siempre
    const tiempoTranscurrido = Date.now();
    const fechaFin = new Date(tiempoTranscurrido);

    let fecha_Inicio = fechaInicio.getFullYear() + '/' +
        ((+fechaInicio.getMonth() < 9) ? `0${fechaInicio.getMonth() + 1}` : fechaInicio.getMonth() + 1) + '/' +
        ((+fechaInicio.getDate() < 9) ? `0${fechaInicio.getDate()}` : fechaInicio.getDate());

    let fecha_Fin = fechaFin.getFullYear() + '/' +
        ((+fechaFin.getMonth() < 9) ? `0${fechaFin.getMonth() + 1}` : fechaFin.getMonth() + 1) + '/' +
        ((+fechaFin.getDate() < 9) ? `0${fechaFin.getDate()}` : fechaFin.getDate());

    try {
        $.ajax({
            type: 'GET',
            url: 'ReporteBasculaTunel/ConsultarPesajeTuneles',
            data: {
                fecha_Inicio: fecha_Inicio,
                fecha_Fin: fecha_Fin
            },
            success: function (response) {
                if (response != null && response.length > 0) {
                    limpiarCuadrosFecha();
                    /*
                     *Métodos que llenan el dashboard
                     */
                    pesaje_tunel(response);
                    tiempo_Camaraon(response);
                    //tablaEspacioTunelDia(response);
                    //tablaTunelTemperatura(response);
                    //temperatura_tunel(response);
                    $("#reporteGeneral").show();
                } else {
                    limpiarCuadrosFecha();
                    alert("No hay registros actualmente");
                    return;
                }
            },
            error: function (e) {
                alert("Error al generar consulta");
            }
        });

        $.ajax({
            type: 'GET',
            url: 'ReporteBasculaTunel/ConsultarReporte',
            data: {
                fecha_Inicio: fecha_Inicio,
                fecha_Fin: fecha_Fin
            },
            success: function (response) {
                if (response != null && response.length > 0) {
                    limpiarCuadrosFecha();
                    /*
                     *Métodos que llenan el dashboard
                     */
                    //tablaEspacioTunelDia(response);
                    //tablaTunelTemperatura(response);
                    temperatura_tunel(response);
                    $("#reporteGeneral").show();
                } else {
                    limpiarCuadrosFecha();
                    alert("No hay registros actualmente");
                    return;
                }
            },
            error: function (e) {
                alert("Error al generar consulta");
            }
        });

        $.ajax({
            type: 'GET',
            url: 'ReporteBasculaTunel/ConsultarPesajeTunelesTablas',
            data: {
                fecha_Inicio: fecha_Inicio,
                fecha_Fin: fecha_Fin
            },
            success: function (response) {
                if (response != null && response.length > 0) {
                    limpiarCuadrosFecha();
                    /*
                     *Métodos que llenan el dashboard
                     */
                    tablaEspacioTunelDia(response);
                    tablaTunelTemperatura(response);
                    $("#reporteGeneral").show();
                } else {
                    limpiarCuadrosFecha();
                    alert("No hay registros actualmente");
                    return;
                }
            },
            error: function (e) {
                alert("Error al generar consulta");
            }
        });
    } catch (e) {
        alert("Por favor ingresar valores a buscar");
        return;
    }
}

function pesaje_tunel(response) {
    let valores = [];
    let alerta = "";
    let valores2 = [];

    $.each(response, function (key, value) {
        valores.push({ label: value.nombre_Tunel, y: parseFloat(value.peso_Entrante) });
        valores2.push({ label: value.nombre_Tunel, y: parseFloat(value.peso_Saliente) });
        
    });

    let chart = new CanvasJS.Chart("pesajeTuneles", {
        colorSet: "colorPesajeTunel",
        animationEnabled: true,
        theme: "light2",
        title: {
            text: "Pesaje en Túneles"
        },
        axisY: {
            title: "Peso(Lb)"
        },
        toolTip: {
            shared: true
        },
        legend: {
            cursor: "pointer",
            itemclick: toggleDataSeries
        },
        axisY: {
            title: "Peso entrante",
            interval: 1000,
            titleFontColor: "#4F81BC",
            lineColor: "#4F81BC",
            labelFontColor: "#4F81BC",
            tickColor: "#4F81BC",
            suffix: " .lb",
        },
        axisY2: {
            title: "Peso saliente",
            titleFontColor: "#C0504E",
            lineColor: "#C0504E",
            labelFontColor: "#C0504E",
            tickColor: "#C0504E"
        },
        data: [{
            type: "column",
            showInLegend: true,
            name: "Peso Cajas entrantes",
            dataPoints: valores,
        },
        {
            type: "column",
            showInLegend: true,
            name: "Peso Cajas salientes",
            dataPoints: valores2,
        }
        ]
        
    });
  
    chart.render();

    function toggleDataSeries(e) {
        if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        }
        else {
            e.dataSeries.visible = true;
        }
        chart.render();
    }

    if (alerta != null && alerta.length > 0) {
        alerta += ' En ' + '<b>Pesaje de túneles!</b>';
        alarma(alerta, 'liveAlertPlaceholder1');
    }
}

function tiempo_Camaraon(response)
{
    let valores = [];
    let valores2 = [];
    let valores3 = [];
    let alerta = "";

    $.each(response, function (key, value) {
        valores.push({ label: value.nombre_Tunel, y: parseFloat(value.cajas_Entrantes) });
        valores2.push({ label: value.nombre_Tunel, y: parseFloat(value.cajas_Salientes) });
        valores3.push({ label: value.nombre_Tunel, y: parseFloat(value.dias_Diferencia) });
        if (value.dias_Diferencia >= 7) {
            colorColumna = "#FF3A3A";
            alerta += 'Túnel: ' + value.nombre_Tunel + '</br>';
        }
        
    });

    let chart1 = new CanvasJS.Chart("tiempoCamaron", {
        animationEnabled: true,
        theme: "light2",
        title: {
            text: "Tiempo de Camarón"
        },
        axisY: {
            title: "Peso(Lb)"
        },
        toolTip: {
            shared: true
        },
        legend: {
            cursor: "pointer",
            itemclick: toggleDataSeries
        },
        axisY: {
            interval: 50,
            title: "Cajas entrantes/salientes",
            titleFontColor: "#4F81BC",
            lineColor: "#4F81BC",
            labelFontColor: "#4F81BC",
            tickColor: "#4F81BC",
        },
        data: [{
            type: "bar",
            showInLegend: true,
            name: "Cantidad Cajas entrantes",
            dataPoints: valores,
        },
        {
            type: "bar",
            showInLegend: true,
            name: "Cantidad Cajas salientes",
            dataPoints: valores2,
        },
        {
            type: "bar",
            showInLegend: true,
            name: "Tiempo en túneles",
            dataPoints: valores3,
        }
        ]

    });

    chart1.render();

    function toggleDataSeries(e) {
        if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        }
        else {
            e.dataSeries.visible = true;
        }
        chart1.render();
    }

    if (alerta != null && alerta.length > 0) {
        alerta += ' En ' + '<b>Tiempo Camarón!</b>';
        alarma(alerta, 'liveAlertPlaceholder2');
    }
}
function limpiarCuadrosFecha() {
    $('#fechaInicio').datepicker('update', '');
    $('#fechaFin').datepicker('update', '');
}

function tablaEspacioTunelDia(response) {
    let DatosJson = JSON.parse(JSON.stringify(response));
    $("#tabla1").show();
    for (i = 0; i < DatosJson.length; i++) {

        let estado, color;
        if (DatosJson[i].autorizacion == "Autorizada") {
            estado = "Salida";
            color = "#89F77C";
        } else {
            estado = "Ingreso";
            color = '#F08080';
        }


        $("#tableEspacioTunelDia").append('<tr id = ' + (i + 1) + '>' +
            '<td align="left" style="dislay: none;">' + (i + 1)  + '</td>' +
            '<td align="left" style="dislay: none;">' + DatosJson[i].nombre_Tunel + '</td>' +
            '<td align="left" style="dislay: none;">' + DatosJson[i].cajas_Entrantes + '</td>' +
            '<td align="left" style="dislay: none;">' + DatosJson[i].cajas_Salientes + '</td>' +
            '<td align="left" style="dislay: none;">' + DatosJson[i].peso + '</td>' +
            '<td align="left" style="dislay: none;">' + estado + '</td>' +
            '<td align="left" style="dislay: none;">' + DatosJson[i].dias_Diferencia +' días'+ '</td>' +
            '<td align="left" style="dislay: none; background-color: ' + color + '; ">' + DatosJson[i].autorizacion + '</td>' +
            '</tr>');
    }
}

function tablaTemperaturaTunelReporte(response) {
    let DatosJson = JSON.parse(JSON.stringify(response));
    $("#tabla5").show();

    for (i = 0; i < DatosJson.length; i++) {

        if (DatosJson[i].temperatura_Tunel <= -18 && DatosJson[i].temperatura_Tunel >= -20) {
            colorColumna = "#0AC621";
        } else if (DatosJson[i].temperatura_Tunel == -17 || DatosJson[i].temperatura_Tunel == -21) {
            colorColumna = "#E7E429";
        } else {
            colorColumna = "#FF3A3A";
        }

        var fecha = new Date(DatosJson[i].fecha);
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

        $("#tableTemperaturaTunelReporte").append('<tr>'+
            '<td align="left" style="dislay: none;">' + (i + 1) + '</td>' +
            '<td align="left" style="dislay: none;">' + DatosJson[i].mes + '</td>' +
            '<td align="left" style="dislay: none;">' + DatosJson[i].semana  + '</td>' +
            '<td align="left" style="dislay: none;">' + fecha.toLocaleDateString("es-ES", options) + '</td>' +
            '<td align="left" style="dislay: none;">' + DatosJson[i].temp_minima+ '°C' + '</td>' +
            '<td align="left" style="dislay: none;">' + DatosJson[i].temp_maxima + '°C' + '</td>' +
            '<td align="left" style="dislay: none; background-color: ' + colorColumna + '; ">' + DatosJson[i].observacion +  '</td>' +
            '</tr>');
    }
}

function tablaTunelTemperatura(response) {
    let DatosJson = JSON.parse(JSON.stringify(response));
    $("#tabla2").show();
    for (i = 0; i < DatosJson.length; i++) {

        let estado, color;
        if (DatosJson[i].estado_Tunel == "Activo") {
            color = "#89F77C";
        } else {
            color = '#F08080';
        }


        $("#tableTemperaturaTunel").append('<tr id = ' + (i + 1) + '>' +
            '<td align="left" style="dislay: none;">' + (i + 1) + '</td>' +
            '<td align="left" style="dislay: none;">' + DatosJson[i].nombre_Tunel + '</td>' +
            '<td align="left" style="dislay: none;">' + DatosJson[i].temperatura_Tunel + '°C'+ '</td>' +
            '<td align="left" style="dislay: none; background-color: ' + color + '; ">' + DatosJson[i].estado_Tunel + '</td>' +
            '<td align="left" style="dislay: none;">' + DatosJson[i].dias_Diferencia +' días' +'</td>' +
            '</tr>');
    }
}

function limpiarTablaTunelTempReporte() {
    const $elemento8 = document.querySelector("#tableTemperaturaTunelReporte");
    $elemento8.innerHTML = "";
}


function temperatura_tunel(response) {
    let valores = [];
    let colores = [];
    let alerta = "";
    let colorColumna = "";

    $.each(response, function (key, value) {
        valores.push({ y: parseFloat(value.temperatura_Tunel), label: value.nombre_Tunel });
        if (value.temperatura_Tunel <= -18 && value.temperatura_Tunel >= -20) {
            colorColumna = "#0AC621";
        }else if (value.temperatura_Tunel == -17 || value.temperatura_Tunel == -21) {
            colorColumna = "#E7E429";
        } else {
            alerta += 'Túnel: ' + value.nombre_Tunel + '</br>';
            colorColumna = "#FF3A3A";
        }
        colores.push(colorColumna);
    });

    CanvasJS.addColorSet("colorTemperaturaTunel", colores);

    let chart = new CanvasJS.Chart("temperaturaTuneles", {
        animationEnabled: true,
        colorSet: "colorTemperaturaTunel",
        title: {
            text: "Temperatura"
        },
        axisY: {
            title: "Entre +C° y -C°"
        },
        data: [{
            type: "column",
            showInLegend: true,
            legendMarkerColor: "grey",
            legendText: "Túnel",
            dataPoints: valores,
        }]

    });

    chart.render();

    if (alerta != null && alerta.length > 0) {
        alerta += ' En ' + '<b>Temperatura Túnel!</b>';
        alarma(alerta, 'liveAlertPlaceholder3');
    }
}

function ObtenerListaTuneles() {
    try {
        $.ajax({
            type: 'GET',
            url: 'Tunel/Listar',
            data: {
            },
            success: function (response) {
                if (response != null && response.length > 0) {
                    cargarDatosTunelLista(response);
                } else {
                    alert("No hay registros actualmente");
                    return;
                }
            },
            error: function () {
                alert("Error al generar consulta");
            }

        });
    } catch (e) {
        alert("Error al generar la consulta");
    }
}

function cargarDatosTunelLista(response) {
    var select = $("#listaTuneles");
    select.empty();
    $('#listaTuneles').append('<option selected>Seleccione un túnel</option>');
    var rsp = JSON.parse(JSON.stringify(response));
    for (i = 0; i < rsp.length; i++) {
        $('#listaTuneles').
            append('<option value ="' + rsp[i].id_Tunel + '">' + rsp[i].nombre + '</option>');
    }
}

function GenerarReporte() {
    $('#filtro').show();

    const $elemento3 = document.querySelector("#filtro");
    $elemento3.innerHTML = "";

    limpiarMensajes();

    var idTunel = $("#listaTuneles option:selected").val()
    let fechaInicioReporte = $('#fechaInicio').datepicker('getDate');
    let fechaFinReporte = $('#fechaFin').datepicker('getDate');

    if (fechaInicioReporte == null || fechaInicioReporte.length == 0) {
        alert("Seleccione fecha de inicio de reporte");
        return;
    }

    if (fechaFinReporte == null || fechaFinReporte.length == 0) {
        alert("Seleccione fecha de fin de reporte");
        return;
    }

    if (fechaInicioReporte > fechaFinReporte) {
        alert("Seleccione un rango de fechas válido")
        return;
    }

    let fecha_Inicio = fechaInicioReporte.getFullYear() + '/' +
        ((+fechaInicioReporte.getMonth() < 9) ? `0${fechaInicioReporte.getMonth() + 1}` : fechaInicioReporte.getMonth() + 1) + '/' +
        ((+fechaInicioReporte.getDate() < 9) ? `0${fechaInicioReporte.getDate()}` : fechaInicioReporte.getDate());

    let fecha_Fin = fechaFinReporte.getFullYear() + '/' +
        ((+fechaFinReporte.getMonth() < 9) ? `0${fechaFinReporte.getMonth() + 1}` : fechaFinReporte.getMonth() + 1) + '/' +
        ((+fechaFinReporte.getDate() < 9) ? `0${fechaFinReporte.getDate()}` : fechaFinReporte.getDate());

    //Agregar en el alert las fechas y el túnel seleccionado
    $('#filtro').
        append('<p> Las fechas seleccionadas son ' + fecha_Inicio + ' - ' + fecha_Fin + ' en el túnel ' +
        $("#listaTuneles option:selected").text()+ '</p>');


    try {
        $.ajax({
            type: 'GET',
            url: 'ReporteBasculaTunel/ConsultarPesajeTunelesTablas',
            data: {
                id_tunel: idTunel,
                fecha_Inicio: fecha_Inicio,
                fecha_Fin: fecha_Fin
            },
            success: function (response) {
                if (response != null && response.length > 0) {
                    generarTiempoTunel_entrante(response);
                    generarTiempoTunel_saliente(response);
                    generarCantTunelEntrante(response);
                    generarCantTunelSaliente(response);
                    limpiarCampos();
                } else {
                    limpiarTablaReporte();
                    $('#fechaInicioReporte').datepicker('update', '');
                    $('#fechaFinReporte').datepicker('update', '');
                    alert("No hay registros actualmente");
                    return;
                }
            },
            error: function (e) {
                alert("Error al generar consulta");
            }

        });

    } catch (e) {
        alert("Se generó un error durante la consulta, reintente por favor");
        return;
    }

    //Se realiza la consulta para generar el gráfico de Donut.
    try {
        $.ajax({
            type: 'GET',
            url: 'Dashboard/ConsultarTemperatura',
            data: {
                id_tunel: idTunel,
                fecha_Inicio: fecha_Inicio,
                fecha_Fin: fecha_Fin
            },
            success: function (response) {
                if (response != null && response.length > 0) {
                    limpiarTablaTunelTempReporte();
                    generarTempTunelMinima(response);
                    generarTempTunelMaxima(response);
                    tablaTemperaturaTunelReporte(response);  
                    limpiarCampos();
                } else {
                    $('#fechaInicioReporte').datepicker('update', '');
                    $('#fechaFinReporte').datepicker('update', '');
                    alert("No hay registros actualmente");
                    return;
                }
            },
            error: function (e) {
                alert("Error al generar consulta");
            }

        });

    } catch (e) {
        alert("Se generó un error durante la consulta, reintente por favor");
        return;
    }

}

function generarTiempoTunel_entrante(response) {
    let valores = [];
    let total_pesaje = 0;
    $.each(response, function (key, value) {
        valores.push({ x: value.cajas_Entrantes, y: value.dias_Diferencia });
        total_pesaje = value.peso_Entrante + total_pesaje;
    });
    var chart = new CanvasJS.Chart("tiempoTunel", {
        animationEnabled: true,
        title: {
            text: "Tunel - Cantidad cajas entrantes"
        },
        axisY: {
            title: "Tiempo",
            suffix: "días",
            includeZero: true,
        },
        axisX: {
            interval: 50
        },
        data: [{
            type: "splineArea",
            markerSize: 5,
            color: "rgba(54,158,173,.7)",
            dataPoints: valores.sort()  
        }]
    });
    chart.render();

    $('#infoTiempoTunel').show();

    $('#infoTiempoTunel').
        append('<p> Pesaje total Cajas entrante ' + total_pesaje + ' lb </p>');
   

}

function generarTiempoTunel_saliente(response) {
    let valores = [];
    let total_pesaje = 0;

    $.each(response, function (key, value) {
        valores.push({ x: value.cajas_Salientes, y: value.dias_Diferencia });
        total_pesaje = value.peso_Saliente + total_pesaje;
    });
    var chart = new CanvasJS.Chart("tiempoTunel2", {
        animationEnabled: true,
        title: {
            text: "Tunel - Cantidad cajas salientes"
        },
        axisY: {
            title: "Tiempo",
            suffix: "días",
            includeZero: true,
        },
        axisX: {
            interval: 50
        },
        data: [{
            type: "splineArea",
            markerSize: 5,
            color: "rgb(144, 90, 246)",
            dataPoints: valores.sort()
        }]
    });
    chart.render();

    $('#infoTiempoTunel2').show();

    $('#infoTiempoTunel2').
        append('<p> Pesaje total Cajas saliente ' + total_pesaje + ' lb </p>');

}

function generarTempTunelMinima(response) {
    let valores = [];
    let valoresFinal = [];
    let nombreTunel = response[0].nombre_Tunel;

    $.each(response, function (key, value) {
        valores.push({ y: value.temp_minima, label: value.nombre_Dias + ' - ' + value.fecha.substring(0,10)});

    });

    for (var i = 0; i < 7; i++) {
        valoresFinal[i] = valores[i];
    }

    var chart = new CanvasJS.Chart("tempTunel", {
        theme: "light1",
        animationEnabled: true,
        title: {
            text: "Temperatura de Túnel (Valores mínimos)"
        },
        subtitles: [{
            text: nombreTunel,
            fontSize: 12
        }],
        data: [{
            type: "pie",
            indexLabelFontSize: 18,
            radius: 80,
            indexLabel: "{label} - {y}",
            yValueFormatString: "###0.0\"°\"",
            click: explodePie,
            dataPoints: valoresFinal
        }]
    });
    chart.render();

    function explodePie(e) {
        for (var i = 0; i < e.dataSeries.dataPoints.length; i++) {
            if (i !== e.dataPointIndex)
                e.dataSeries.dataPoints[i].exploded = false;
        }
    }
}

function generarTempTunelMaxima(response) {
    let valores = [];
    let valoresFinal = [];
    let nombreTunel = response[0].nombre_Tunel;

    $.each(response, function (key, value) {
        valores.push({ y: value.temp_maxima, label: value.nombre_Dias + ' - ' + value.fecha.substring(0, 10) });

    });

    for (var i = 0; i < 7; i++) {
        valoresFinal[i] = valores[i];
    }

    var chart = new CanvasJS.Chart("tempTunel2", {
        theme: "light2",
        animationEnabled: true,
        title: {
            text: "Temperatura de Túnel (Valores máximos)"
        },
        subtitles: [{
            text: nombreTunel,
            fontSize: 12
        }],
        data: [{
            type: "pie",
            indexLabelFontSize: 18,
            radius: 80,
            indexLabel: "{label} - {y}",
            yValueFormatString: "###0.0\"°\"",
            click: explodePie,
            dataPoints: valoresFinal
        }]
    });
    chart.render();

    function explodePie(e) {
        for (var i = 0; i < e.dataSeries.dataPoints.length; i++) {
            if (i !== e.dataPointIndex)
                e.dataSeries.dataPoints[i].exploded = false;
        }
    }
}

function generarCantTunelEntrante(response) {
    let valores = [];
    let nombreTunel = response[0].nombre_Tunel;

    $.each(response, function (key, value) {
        valores.push({ y: value.cajas_Entrantes, label: value.nombre_Bascula });

    });

    var chart = new CanvasJS.Chart("cantTunel", {
        animationEnabled: true,
        theme: "light2",
        title: {
            text: nombreTunel + " - Pesaje Entrante",
            horizontalAlign: "center"
        },
        data: [{
            type: "doughnut",
            startAngle: 60,
            //innerRadius: 60,
            indexLabelFontSize: 17,
            indexLabel: "{label} - #percent%",
            toolTipContent: "<b>{label}:</b> {y} (#percent%)",
            dataPoints: valores
        }]
    });
    chart.render();

}

function generarCantTunelSaliente(response) {
    let valores = [];
    let nombreTunel = response[0].nombre_Tunel;

    $.each(response, function (key, value) {
        valores.push({ y: value.cajas_Salientes, label: value.nombre_Bascula });

    });

    var chart = new CanvasJS.Chart("cantTunel2", {
        animationEnabled: true,
        theme: "light1",
        title: {
            text: nombreTunel + " - Pesaje Saliente",
            horizontalAlign: "center"
        },
        data: [{
            type: "doughnut",
            startAngle: 60,
            //innerRadius: 60,
            indexLabelFontSize: 17,
            indexLabel: "{label} - #percent%",
            toolTipContent: "<b>{label}:</b> {y} (#percent%)",
            dataPoints: valores
        }]
    });
    chart.render();

}

function limpiarMensajes() {
    const $elemento = document.querySelector("#infoTiempoTunel");
    $elemento.innerHTML = "";
    const $elemento2 = document.querySelector("#infoTiempoTunel2");
    $elemento2.innerHTML = "";
}

function limpiarCampos() {

    $('#fechaInicio').datepicker('update', '');
    $('#fechaFin').datepicker('update', '');
}

function alarma(values, div) {
    var alertPlaceholder = document.getElementById(div)
    var wrapper = document.createElement('div')

    wrapper.innerHTML = '<div class="alert alert-danger alert-dismissible" role="alert"> Revisar ' + values +
        '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'

    alertPlaceholder.append(wrapper);
    //var audio = new Audio('../../lib/alarm.mp3');
    //audio.play();

    //setInterval(
    //    function () {
        
    //    var audio = new Audio('../../lib/alarm.mp3');

    //    // al finalizar el sonido escondemos el mensaje de "Alarma sonando"
    //    audio.onended = function () {
    //        document.getElementById("alerta").innerHTML = "";
    //    };
    //document.getElementById("alerta").innerHTML = "Revisar " + values + "</br>";
    //$("#alerta").append( 'Revisar '+ values+'<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>');

    //    // Iniciamos el sonido
    //    audio.play();
}