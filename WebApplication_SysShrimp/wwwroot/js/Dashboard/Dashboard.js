
$(document).ready(function () {
	//pruebaChart();
});

function pruebaChart() {
	var chart = new CanvasJS.Chart("chartContainer", {
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
    let fechaInicio = $('#fechaInicio').datepicker('getDate');
    let fechaFin = $('#fechaFin').datepicker('getDate');

    if (fechaInicio == null || fechaFin.length == 0) {
        alert("Seleccione fecha de inicio de reporte");
        return;
    }

    if (fechaFin == null || fechaFin.length == 0) {
        alert("Seleccione fecha de fin de reporte");
        return;
    }


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
                    pesaje_tunel(response);
                    alert("Consulta exitosa!");
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

    $.each(response, function (key, value) {
        valores.push({ y: parseFloat(value.peso), label: value.nombre_Tunel });
    });

    let chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        theme: "light2",
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

function limpiarCuadrosFecha() {
    $('#fechaInicio').datepicker('update', '');
    $('#fechaFin').datepicker('update', '');
}

