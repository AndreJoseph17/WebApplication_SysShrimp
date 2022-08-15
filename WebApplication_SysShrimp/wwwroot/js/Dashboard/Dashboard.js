
$(document).ready(function () {
    $('#tabla1').hide();
    $('#tabla2').hide();
    $('#reporteGeneral').hide();
    GenerarDashboard();
});

function pruebaChart() {
	var chart = new CanvasJS.Chart("pesajeTuneles", {
		title: {
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

    $.each(response, function (key, value) {
        let colorColumna = "";
        valores.push({ y: parseFloat(value.peso), label: value.nombre_Tunel });
        if (value.peso >= value.peso_Maximo_Tunel) {
            colorColumna = "#FF3A3A"; //rojo
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
}

function tiempo_Camaraon(response) {
    let valores = [];
    let colores = [];

    $.each(response, function (key, value) {
        valores.push({ y: parseFloat(value.dias_Diferencia), label: value.nombre_Bascula });
        if (value.dias_Diferencia >= 7) {
            colorColumna = "#FF3A3A";
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

    $.each(response, function (key, value) {
        valores.push({ y: parseFloat(value.temperatura_Tunel), label: value.nombre_Tunel });
        if (value.temperatura_Tunel <= -18 || value.temperatura_Tunel >= -20 ) {
            colorColumna = "#0AC621"; 
        } else {
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
}