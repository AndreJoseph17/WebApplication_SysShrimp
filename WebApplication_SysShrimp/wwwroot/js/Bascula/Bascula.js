
var DatosJson;

function doFunction() {
    alert("se presionó el botón");
}

function limpiarModal() {
    DatosJson = null;
    $("#codigoBascula_m").val('');
    $("#nombreBascula_m").val('');

    limpiarTabla();
}

function limpiarTabla() {
    const $elemento = document.querySelector("#bodyTabla");
    $elemento.innerHTML = "";
}

function setearValores() {
    limpiarTabla();
    DatosJson = null;
    $("#codigoBascula_m").val('');
    $("#nombreBascula_m").val('');
}


/************************************************************************************* */
//Método para buscar básculas

function BuscarBascula(nombre_bascula, codigo_bascula) {
    nombre = document.getElementById("nombreBascula_m").value;
    codigo = document.getElementById("codigoBascula_m").value;


    //Setear la variable json a null para realizar nueva búsqueda y limpiar tabla de resultados
    DatosJson = null;

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
                        limpiarTabla();
                        cargarDatos(response);
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

function cargarDatos(consulta) {
    DatosJson = JSON.parse(JSON.stringify(consulta));
    for (i = 0; i < DatosJson.length; i++) {

        let estado, color;
        let codigo_bascula = DatosJson[i].codigo;
        if (DatosJson[i].activo) {
            estado = "Activo";
            color = "#89F77C";
        } else {
            estado = "Inactivo";
            color = '#F08080';
        }

        $("#bodyTabla").append('<tr id = ' + codigo_bascula + '>' +
            '<td align="left" style="dislay: none;">' + DatosJson[i].codigo + '</td>' +
            '<td align="left" style="dislay: none;">' + DatosJson[i].codigo_Serie + '</td>' +
            '<td align="left" style="dislay: none;">' + DatosJson[i].nombre + '</td>' +
            '<td align="left" style="dislay: none; background-color: ' + color + '; ">' + estado + '</td>' +
            '<td align="left" style="dislay: none;"> <a href="#" class = "btn btn-primary" onclick ="Editar_Bascula(' + codigo_bascula +')";>Editar</a></td>' +
            '</tr>');
    }
}
/*************************************************************************************/
//Método para extraer registro de búsqueda al formulario principal
function validarFilaResultados() {
    if (DatosJson.length > 1) {
        alert('Filtrar la búsqueda a un solo resultado para poder editar');
    } else {
        cargarBasculaFormulario();
    }
}

function Editar_Bascula(cod) {
    alert("Se eligió el id " + cod);
    try {
        $.ajax({
            type: 'GET',
            url: 'Bascula/Detalle',
            data: {
                codigo: cod,
                nombre: null,
            },
            success: function (response) {
                if (response != null) {
                    limpiarTabla();
                    cargarFormulario(response);
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
}

function cargarFormulario(response) {

    $("#staticBackdrop").modal('hide');

    $("#codigoBascula").val(response[0].codigo);
    document.getElementById("codigoBascula").disabled = true;

    $("#idBascula").val(response[0].id_Bascula);
    $("#nombreBascula").val(response[0].nombre);
    $("#codigoSerie").val(response[0].codigo_Serie);
    $("#direccionIp").val(response[0].direccion_Ip);
    $("#puerto").val(response[0].puerto);
    if (response[0].activo) {
        document.querySelector('#EstadoActivo').checked = true;
        document.querySelector('#EstadoInactivo').checked = false;
    } else {
        document.querySelector('#EstadoActivo').checked = false;
        document.querySelector('#EstadoInactivo').checked = true;
    }
}


function cargarBasculaFormulario() {

    $("#staticBackdrop").modal('hide');
    
    $("#codigoBascula").val(DatosJson[0].codigo);
    document.getElementById("codigoBascula").disabled = true;

    $("#idBascula").val(DatosJson[0].id_Bascula);
    $("#nombreBascula").val(DatosJson[0].nombre);
    $("#codigoSerie").val(DatosJson[0].codigo_Serie);
    $("#direccionIp").val(DatosJson[0].direccion_Ip);
    $("#puerto").val(DatosJson[0].puerto);
    if (DatosJson[0].activo) {
        document.querySelector('#EstadoActivo').checked = true;
        document.querySelector('#EstadoInactivo').checked = false;
    } else {
        document.querySelector('#EstadoActivo').checked = false;
        document.querySelector('#EstadoInactivo').checked = true;
    }
}

/*************************************************************************************/
//Método para Guardar y editar báscula

function GuardarBascula() {
    try {

        let urlEnviar = ''

        let datosEnviar = {
            'id_Bascula':0,
            'codigo': 0,
            'nombre': '',
            'codigoSerie': '',
            'direccion_Ip': '',
            'puerto': '',
            'estado': 0
        };
        let id_Bascula = document.getElementById("idBascula").value;
        let codigo = document.getElementById("codigoBascula").value;
        let nombre = document.getElementById("nombreBascula").value;
        let codigoSerie = document.getElementById("codigoSerie").value;
        let direccion_ip = document.getElementById("direccionIp").value;
        let puerto = document.getElementById("puerto").value;
        let estado = 0;
        if (document.getElementById("EstadoActivo").checked) {
            estado = 1;
        } else {
            estado = 0;
        }

        datosEnviar.codigo = codigo;
        datosEnviar.nombre = nombre;
        datosEnviar.codigoSerie = codigoSerie;
        datosEnviar.direccion_Ip = direccion_ip;
        datosEnviar.puerto = puerto;
        datosEnviar.estado = estado;

        if (id_Bascula > 0) {
            datosEnviar.id_Bascula = id_Bascula;
            urlEnviar = "Bascula/Editar";
        } else {
            urlEnviar = 'Bascula/Crear';
        }

        try {
            $.ajax({
                type: 'POST',
                url: urlEnviar,
                data: {
                    id_Bascula: datosEnviar.id_Bascula,
                    codigo: datosEnviar.codigo,
                    nombre: datosEnviar.nombre,
                    codigo_serie: datosEnviar.codigoSerie,
                    direccion_ip: datosEnviar.direccion_Ip,
                    puerto: datosEnviar.puerto,
                    estado: datosEnviar.estado
                },
                success: function (response) {
                    if (response.procesoExitoso === true) {
                        alert("Báscula ingresada correctamente");
                        limpiar();
                    } else {
                        alert("Error al ingresar registro ");
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
    } catch (e) {
        alert("Error al guardar");
    }
}

/*************************************************************************************/
//Método para limpiar báscula
function limpiar() {

    document.getElementById("codigoBascula").disabled = false;
    $("#codigoBascula").val('');
    $("#idBascula").val('');
    $("#nombreBascula").val('');
    $("#codigoSerie").val('');
    $("#direccionIp").val('');
    $("#puerto").val('');
    document.querySelector('#EstadoActivo').checked = true;
    document.querySelector('#EstadoInactivo').checked = false;

    $("#codigoBascula_m").val('');
    $("#nombreBascula_m").val('');

    DatosJson = null;
}