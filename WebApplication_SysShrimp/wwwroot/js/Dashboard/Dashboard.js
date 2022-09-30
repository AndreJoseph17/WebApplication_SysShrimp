/// <reference path="../bascula/bascula.js" />
/// <reference path="../bascula/bascula.js" />

$(document).ready(function () {
    $('#tabla1').hide();
    $('#tabla2').hide();
    $('#reporteGeneral').hide();
    GenerarDashboard();
    ObtenerListaTuneles();
    $('#alerta').hide();
});

function pruebaChart() {
	var chart = new CanvasJS.Chart("pesajeTuneles", {title: {
			text: "My First Chart in CanvasJS"
		},
		data: [
			{
				// Change type to "doughnut", "line", "splineArea", etc.
				type: "column",
				dataPoints: [
					{ label: "apple", y: 10 },
					{ label: "orange", y: 15 },
					{ label: "banana", y: 25 },
					{ label: "mango", y: 30 },
					{ label: "grape", y: 28 }
				]
			}
		]
	});
	chart.render();
}

function GenerarDashboard() {
    //Marcamos como fecha de inicio el 01 de Enero del 2022 por default
    const fechaInicio = new Date('Jan 01 2022');

    //Marcamos como fecha de fin la fecha de hoy siempre
    const tiempoTranscurrido = Date.now();
    const fechaFin = new Date(tiempoTranscurrido);

    let fecha_Inicio = fechaInicio.getFullYear() + '/' +
        ((+fechaInicio.getMonth() < 10) ? `0${fechaInicio.getMonth() + 1}` : fechaInicio.getMonth() + 1) + '/' +
        ((+fechaInicio.getDate() < 10) ? `0${fechaInicio.getDate()}` : fechaInicio.getDate());

    let fecha_Fin = fechaFin.getFullYear() + '/' +
        ((+fechaFin.getMonth() < 10) ? `0${fechaFin.getMonth() + 1}` : fechaFin.getMonth() + 1) + '/' +
        ((+fechaFin.getDate() < 10) ? `0${fechaFin.getDate()}` : fechaFin.getDate());

    try {
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
                    pesaje_tunel(response);
                    tiempo_Camaraon(response);
                    tablaEspacioTunelDia(response);
                    tablaTunelTemperatura(response);
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
    } catch (e) {
        alert("Por favor ingresar valores a buscar");
        return;
    }
}

function pesaje_tunel(response) {
    let valores = [];
    let colores = [];
    let alerta = "";

    $.each(response, function (key, value) {
        let colorColumna = "";
        valores.push({ y: parseFloat(value.peso), label: value.nombre_Tunel });
        if (value.peso >= value.peso_Maximo_Tunel) {
            colorColumna = "#FF3A3A"; //rojo
            alerta += 'Túnel: ' + value.nombre_Tunel + '</br>';
        } else if (value.peso >= (value.peso_Maximo_Tunel / 2) && value.peso < value.peso_Maximo_Tunel) {
            colorColumna = "#E7E429"; //amarillo
        } else {
            colorColumna = "#0AC621"; //verde
        }
        colores.push(colorColumna);
    });

    CanvasJS.addColorSet("colorPesajeTunel", colores);

    let chart = new CanvasJS.Chart("pesajeTuneles", {
        colorSet: "colorPesajeTunel",
        animationEnabled: true,
        title: {
            text: "Pesaje en Túneles"
        },
        axisY: {
            title: "Peso(Kg)"
        },
        data: [{
            type: "column",
            showInLegend: true,
            legendMarkerColor: "grey",
            legendText: "Paquetes (fundas o cartones)",
            dataPoints: valores,
        }]
        
    });
  
    chart.render();

    if (alerta != null && alerta.length > 0) {
        alerta += ' En ' + '<b>Pesaje de túneles!</b>';
        alarma(alerta, 'liveAlertPlaceholder1');
    }
}

function tiempo_Camaraon(response) {
    let valores = [];
    let colores = [];
    let colorColumna = "";
    let alerta = "";

    $.each(response, function (key, value) {
        valores.push({ y: parseFloat(value.dias_Diferencia), label: value.nombre_Bascula });
        if (value.dias_Diferencia >= 7) {
            colorColumna = "#FF3A3A";
            alerta += 'Báscula: ' + value.nombre_Bascula + '</br>';
        } else if (value.peso >= 2 && value.peso < 7) {
            colorColumna = "#E7E429";
        } else {
            colorColumna = "#0AC621";
        }
        colores.push(colorColumna);
    });

    CanvasJS.addColorSet("colorTiempoCamaron", colores);

    let chart = new CanvasJS.Chart("tiempoCamaron", {
        animationEnabled: true,
        colorSet: "colorTiempoCamaron",
        title: {
            text: "Tiempo del Camarón"
        },
        axisY: {
            title: "Tiempo(Días)"
        },
        data: [{
            type: "column",
            showInLegend: true,
            legendMarkerColor: "grey",
            legendText: "Paquetes (fundas o cartones)",
            dataPoints: valores,
        }]

    });

    chart.render();

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
            '<td align="left" style="dislay: none;">' + DatosJson[i].nombre_Bascula + '</td>' +
            '<td align="left" style="dislay: none;">' + DatosJson[i].peso + '</td>' +
            '<td align="left" style="dislay: none;">' + estado + '</td>' +
            '<td align="left" style="dislay: none;">' + DatosJson[i].dias_Diferencia +' días'+ '</td>' +
            '<td align="left" style="dislay: none; background-color: ' + color + '; ">' + DatosJson[i].autorizacion + '</td>' +
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

function temperatura_tunel(response) {
    let valores = [];
    let colores = [];
    let alerta = "";

    $.each(response, function (key, value) {
        valores.push({ y: parseFloat(value.temperatura_Tunel), label: value.nombre_Tunel });
        if (value.temperatura_Tunel <= -18 || value.temperatura_Tunel >= -20 ) {
            colorColumna = "#0AC621";
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
        ((+fechaInicioReporte.getMonth() < 10) ? `0${fechaInicioReporte.getMonth() + 1}` : fechaInicioReporte.getMonth() + 1) + '/' +
        ((+fechaInicioReporte.getDate() < 10) ? `0${fechaInicioReporte.getDate()}` : fechaInicioReporte.getDate());

    let fecha_Fin = fechaFinReporte.getFullYear() + '/' +
        ((+fechaFinReporte.getMonth() < 10) ? `0${fechaFinReporte.getMonth() + 1}` : fechaFinReporte.getMonth() + 1) + '/' +
        ((+fechaFinReporte.getDate() < 10) ? `0${fechaFinReporte.getDate()}` : fechaFinReporte.getDate());

    try {
        $.ajax({
            type: 'GET',
            url: 'ReporteBasculaTunel/ConsultarReporte',
            data: {
                id_tunel: idTunel,
                fecha_Inicio: fecha_Inicio,
                fecha_Fin: fecha_Fin
            },
            success: function (response) {
                if (response != null && response.length > 0) {
                    generarTiempoTunel(response);
                    generarCantTunel(response);
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
                    generarTempTunel (response);
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

}

function generarTiempoTunel(response) {
    let valores = [];

    $.each(response, function (key, value) {
        valores.push({ label: value.nombre_Bascula, y: value.dias_Diferencia });

    });
    var chart = new CanvasJS.Chart("tiempoTunel", {
        animationEnabled: true,
        title: {
            text: "Tunel - Cantidad"
        },
        axisY: {
            title: "Tiempo",
            suffix: "días",
        },
        data: [{
            type: "splineArea",
            color: "rgba(54,158,173,.7)",
            dataPoints: valores  
        }]
    });
    chart.render();

}

function generarTempTunel(response) {
    let valores = [];
    let nombreTunel = response[0].nombre_Tunel;

    $.each(response, function (key, value) {
        valores.push({ y: value.temperatura_Tunel, label: value.nombre_Dias + ' - ' + value.fecha.substring(0,10)});

    });
    var chart = new CanvasJS.Chart("tempTunel", {
        theme: "light1",
        animationEnabled: true,
        title: {
            text: "Temperatura de Túnel"
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
            dataPoints: valores
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

function generarCantTunel(response) {
    let valores = [];
    let nombreTunel = response[0].nombre_Tunel;

    $.each(response, function (key, value) {
        valores.push({ y: value.peso, label: value.nombre_Bascula });

    });

    var chart = new CanvasJS.Chart("cantTunel", {
        animationEnabled: true,
        title: {
            text: nombreTunel + " - Pesaje",
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
    var audio = new Audio('../../lib/alarm.mp3');
    audio.play();

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