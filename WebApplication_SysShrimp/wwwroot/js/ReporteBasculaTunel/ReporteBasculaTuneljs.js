

/**************************************************************************************/
//Método para buscar básculas

var nombreTunel = "", nombreBascula = "", codigoTunel = "", codigoBascula = "";


function limpiarModalBasculaReporte() {
    $("#codigoBascula_m").val('');
    $("#nombreBascula_m").val('');

    limpiarTablaBascRep();
}


function setearValoresBascula() {
    limpiarTablaBascRep();
    $("#codigoBascula_m").val('');
    $("#nombreBascula_m").val('');
}

function limpiarTablaBascRep() {
    const $elemento = document.querySelector("#bodyTabla");
    $elemento.innerHTML = "";
}

function BuscarBascula(nombre_bascula, codigo_bascula) {
    nombre = document.getElementById("nombreBascula_m").value;
    codigo = document.getElementById("codigoBascula_m").value;

    if (nombre.length > 0 || codigo.length > 0) {
        try {
            $.ajax({
                type: 'GET',
                url: 'Bascula/Detalle',
                data: {
                    codigo: codigo,
                    nombre: nombre,
                },
                success: function (response) {
                    if (response != null) {
                        limpiarTablaBascRep();
                        cargarDatosBascRep(response);
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
            alert("Error al guardar");
        }
    } else {
        alert("Por favor ingresar valores a buscar");
        return;
    }
}

function cargarDatosBascRep(consulta) {
    let DatosJson = JSON.parse(JSON.stringify(consulta));
    for (i = 0; i < DatosJson.length; i++) {

        let estado, color;
        let codigo_bascula = DatosJson[i].id_Bascula;
        let nombre_bascula = DatosJson[i].nombre;
        if (DatosJson[i].activo) {
            estado = "Activo";
            color = "#89F77C";
        } else {
            estado = "Inactivo";
            color = '#F08080';
        }

        $("#bodyTabla").append('<tr id = ' + codigo_bascula + '>' +
            '<td align="left" style="dislay: none;">' + DatosJson[i].codigo_Serie + '</td>' +
            '<td align="left" style="dislay: none;">' + DatosJson[i].nombre + '</td>' +
            '<td align="left" style="dislay: none; background-color: ' + color + '; ">' + estado + '</td>' +
            '<td align="left" style="dislay: none;"> <a href="#" class = "btn btn-link" onclick ="seleccionar_Bascula(\'' + codigo_bascula + '\',\'' + nombre_bascula+'\')";>Seleccionar</a></td>' +
            '</tr>');
    }
}

function seleccionar_Bascula(codigo_bascula, nombre_bascula) {
    let textoBascula = codigo_bascula + ' - ' + nombre_bascula;
    $("#nombreBasculaReporte").val(textoBascula);
    $("#idBasculaReporte").val(codigo_bascula);
    $("#staticBackdropBasculaReporte").modal('hide');
}

/**************************************************************************************/
//Método para buscar túneles

function limpiarModalTunelReporte() {
    DatosJsonTunel = null;
    $("#codigoTunel_m").val('');
    $("#nombreTunel_m").val('');

    limpiarTablaTunelReporte();
}

function limpiarTablaTunelReporte() {
    const $elemento = document.querySelector("#bodyTablaTunel");
    $elemento.innerHTML = "";
}

function setearValoresModalTunel() {
    limpiarTablaTunelReporte();
    $("#codigoTunel_m").val('');
    $("#nombreTunel_m").val('');
}

function BuscarTunel() {
    let nombre = document.getElementById("nombreTunel_m").value;
    let codigo = document.getElementById("codigoTunel_m").value;


    if (nombre.length > 0 || codigo.length > 0) {
        try {
            $.ajax({
                type: 'GET',
                url: 'Tunel/Detalle',
                data: {
                    codigo: codigo,
                    nombre: nombre,
                },
                success: function (response) {
                    if (response != null && response.length > 0) {
                        limpiarTablaTunelReporte();
                        cargarDatosTunelReporte(response);
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
            alert("Error al guardar");
        }
    } else {
        alert("Por favor ingresar valores a buscar");
        return;
    }
}

function cargarDatosTunelReporte(consulta) {
    DatosJsonTunel = JSON.parse(JSON.stringify(consulta));
    for (i = 0; i < DatosJsonTunel.length; i++) {

        let estado, color;
        let codigo_Tunel = DatosJsonTunel[i].id_Tunel;
        let nombre_Tunel = DatosJsonTunel[i].nombre;
        if (DatosJsonTunel[i].activo) {
            estado = "Activo";
            color = "#89F77C";
        } else {
            estado = "Inactivo";
            color = '#F08080';
        }

        $("#bodyTablaTunel").append('<tr id = ' + codigo_Tunel + '>' +
            '<td align="left" style="dislay: none;">' + DatosJsonTunel[i].codigo + '</td>' +
            '<td align="left" style="dislay: none;">' + DatosJsonTunel[i].nombre + '</td>' +
            '<td align="left" style="dislay: none; background-color: ' + color + '; ">' + estado + '</td>' +
            '<td align="left" style="dislay: none;"> <a href="#" class = "btn btn-link" onclick ="seleccionar_Tunel(\'' + codigo_Tunel + '\',\'' + nombre_Tunel +'\')";>Seleccionar</a></td>' +
            '</tr>');
    }
}

function seleccionar_Tunel(codigo_tunel, nombre_tunel) {
    let textoTunel = codigo_tunel + ' - ' + nombre_tunel;
    $("#nombreTunelReporte").val(textoTunel);
    $("#idTunelReporte").val(codigo_tunel);
    $("#staticBackdropTunelReporte").modal('hide');
}

/**************************************************************************************/
//Método para generar reporte

function limpiarTablaReporte() {
    const $elementoReporte = document.querySelector("#bodyTablaReporte");
    $elementoReporte.innerHTML = "";
}

function ConsultarReporte() {
    let fechaInicioReporte = $('#fechaInicioReporte').datepicker('getDate');
    let fechaFinReporte = $('#fechaFinReporte').datepicker('getDate');
    
    let id_tunel = document.getElementById("idTunelReporte").value;
    let id_Bascula = document.getElementById("idBasculaReporte").value;

    if (id_tunel == null || id_tunel === undefined || id_tunel.length < 1) {
        alert("Seleccione un túnel para generar el reporte");
        return;
    }

    if (id_Bascula == null || id_Bascula === undefined || id_Bascula.length < 1) {
        alert("Seleccione una báscula para generar el reporte");
        return;
    }

    if (fechaInicioReporte == null || fechaInicioReporte.length == 0) {
        alert("Seleccione fecha de inicio de reporte");
        return;
    }

    if (fechaFinReporte == null || fechaFinReporte.length == 0) {
        alert("Seleccione fecha de fin de reporte");
        return;
    }

    let fecha_Inicio = fechaInicioReporte.getFullYear() + '/' +
        ((+fechaInicioReporte.getMonth() < 9) ? `0${fechaInicioReporte.getMonth() + 1}` : fechaInicioReporte.getMonth() + 1) + '/' +
        ((+fechaInicioReporte.getDate() < 9) ? `0${fechaInicioReporte.getDate()}` : fechaInicioReporte.getDate());

    let fecha_Fin = fechaFinReporte.getFullYear() + '/' +
        ((+fechaFinReporte.getMonth() < 9) ? `0${fechaFinReporte.getMonth() + 1}` : fechaFinReporte.getMonth() + 1) + '/' +
        ((+fechaFinReporte.getDate() < 9) ? `0${fechaFinReporte.getDate()}` : fechaFinReporte.getDate());


    try {
        $.ajax({
            type: 'GET',
            url: 'ReporteBasculaTunel/ConsultarReporte',
            data: {
                id_tunel: id_tunel,
                id_bascula: id_Bascula,
                fecha_Inicio: fecha_Inicio,
                fecha_Fin: fecha_Fin
            },
            success: function (response) {
                if (response != null && response.length > 0) {
                    limpiarTablaReporte();
                    cargarDatosReporte(response);
                    limpiarCamposReporte();
                } else {
                    limpiarTablaReporte();
                    $('#fechaInicioReporte').datepicker('update', '');
                    $('#fechaFinReporte').datepicker('update', '');
                    alert("No hay registros actualmente");
                    return;
                }
            },
            error: function (e) {
                alert("Error al generar consulta" );
            }

        });
    } catch (e) {
        alert("Por favor ingresar valores a buscar");
        return;
    }
}

function cargarDatosReporte(consulta) {

    let DatosJsonReporte = JSON.parse(JSON.stringify(consulta));

    nombreTunel = DatosJsonReporte[0].nombre_Tunel;
    nombreBascula = DatosJsonReporte[0].nombre_Bascula;
    codigoTunel = DatosJsonReporte[0].codigo_Tunel;
    codigoBascula = DatosJsonReporte[0].codigo_Bascula;

    for (i = 0; i < DatosJsonReporte.length; i++) {

        let color_Aut, color_dias;
        let dias_dif = DatosJsonReporte[i].dias_Diferencia;
        if (DatosJsonReporte[i].autorizacion == 'Autorizada') {
            color_Aut = "#89F77C";
        } else {
            color_Aut = '#F08080';
        }

        if (dias_dif > 6) {
            color_dias = '#F08080';
        } else if (dias_dif > 3 && dias_dif < 7) {
            color_dias = '#F8F83F'
        } else {
            color_dias = "#89F77C";
        }
        let fechaI = new Date(DatosJsonReporte[i].fecha_Ingreso);
        let fechaS = new Date(DatosJsonReporte[i].fecha_Salida);


        $("#bodyTablaReporte").append('<tr >' +
            '<td align="left" style="dislay: none;">' + (i+1) + '</td>' +
            '<td align="left" style="dislay: none;">' + DatosJsonReporte[i].temperatura_Tunel + '</td>' +
            '<td align="left" style="dislay: none;">' + DatosJsonReporte[i].peso + '</td>' +
            '<td align="left" style="dislay: none; background-color: ' + color_Aut + '; ">' + DatosJsonReporte[i].autorizacion + '</td>' +
            '<td align="left" style="dislay: none;">' + fechaI.toLocaleDateString() + '</td>' +
            '<td align="left" style="dislay: none;">' + fechaS.toLocaleDateString() + '</td>' +
            '<td align="left" style="dislay: none; background-color: ' + color_dias + '; ">' + dias_dif + '</td>' +
            '</tr>');

    }
}

function limpiarCamposReporte() {

    $("#idTunelReporte").val('');
    $("#idBasculaReporte").val('');
    $("#nombreBasculaReporte").val('');
    $("#nombreTunelReporte").val('');
    $('#fechaInicioReporte').val('');
    $('#fechaFinReporte').val('');

    //$.datepicker._clearDate(this);

    $('#fechaInicioReporte').datepicker('update', '');
    $('#fechaFinReporte').datepicker('update', '');

}


function GenerarReporte() {
    $('#data_table').tableExport({
        type: 'excel',
        escape: 'false',
        ignoreColumn: []
    });
       
}

function GenerarReportePDF() {
    var doc = new jsPDF('p', 'pt', 'letter');
    var htmlstring = '';
    var tempVarToCheckPageHeight = 0;
    var pageHeight = 0;
    pageHeight = doc.internal.pageSize.height;
    specialElementHandlers = {
        // element with id of "bypass" - jQuery style selector  
        '#bypassme': function (element, renderer) {
            // true = "handled elsewhere, bypass text extraction"  
            return true
        }
    };
    margins = {
        top: 150,
        bottom: 60,
        left: 40,
        right: 40,
        width: 600
    };
    var y = 20;
    doc.setLineWidth(2);
    doc.text(200, y = y + 30, "Reporte de Bitácora - SysShrimp");
    doc.text(50, y = y + 30, "Código Tunel: " + codigoTunel + " - Nombre túnel:  " + nombreTunel);
    doc.text(50, y = y + 30, "Código Báscula: " + codigoBascula + " - Nombre báscula: " + nombreBascula);
    doc.autoTable({
        html: '#data_table',
        startY: 120,
        theme: 'grid',
        columnStyles: {
            0: {
                cellWidth: 25,
            },
            1: {
                cellWidth: 75,
            },
            2: {
                cellWidth: 60,
            },
            3: {
                cellWidth: 100,
            },
            4: {
                cellWidth: 80,
            },
            5: {
                cellWidth: 80,
            },
            6: {
                cellWidth: 100,
            }
        },
        styles: {
            minCellHeight: 40
        }
    })
    const tiempoTranscurrido = Date.now();
    const fechaActual = new Date(tiempoTranscurrido);

    doc.save('Reporte-' + fechaActual.toLocaleDateString() + '.pdf');
}