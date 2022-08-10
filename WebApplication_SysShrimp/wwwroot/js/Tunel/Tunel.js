
var DatosJsonTunel;

function limpiarModalTunel() {
    DatosJsonTunel = null;
    $("#codigoTunel_m").val('');
    $("#nombreTunel_m").val('');

    limpiarTablaTunel();
}

function limpiarTablaTunel() {
    const $elemento = document.querySelector("#bodyTablaTunel");
    $elemento.innerHTML = "";
}

function setearValoresModalTunel() {
    limpiarTablaTunel();
    DatosJsonTunel = null;
    $("#codigoTunel_m").val('');
    $("#nombreTunel_m").val('');
}

/************************************************************************************* */
//Método para buscar túneles

function BuscarTunel() {
    let nombre = document.getElementById("nombreTunel_m").value;
    let codigo = document.getElementById("codigoTunel_m").value;

    //Setear la variable json a null para realizar nueva búsqueda y limpiarPantallaTunel tabla de resultados
    DatosJsonTunel = null;

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
                        limpiarTablaTunel();
                        cargarDatosTunel(response);
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

function cargarDatosTunel(consulta) {
    DatosJsonTunel = JSON.parse(JSON.stringify(consulta));
    for (i = 0; i < DatosJsonTunel.length; i++) {

        let estado, color;
        let codigo_Tunel = DatosJsonTunel[i].codigo;
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
            '<td align="left" style="dislay: none;"> <a href="#" class = "btn btn-primary" onclick ="Editar_Tunel(' + codigo_Tunel + ')";>Editar</a></td>' +
            '</tr>');
    }
}

/*************************************************************************************/
//Método para extraer registro de búsqueda al formulario principal
function validarFilaResultadosTunel() {
    if (DatosJsonTunel.length > 1) {
        alert('Filtrar la búsqueda a un solo resultado para poder editar');
    } else {
        cargarTunelFormulario();
    }
}

function Editar_Tunel(cod) {
    try {
        $.ajax({
            type: 'GET',
            url: 'Tunel/Detalle',
            data: {
                codigo: cod,
                nombre: null,
            },
            success: function (response) {
                if (response != null) {
                    limpiarTablaTunel();
                    cargarTunelFormulario(response);
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
function cargarTunelFormulario(response) {

    $("#staticBackdrop2").modal('hide');

    $("#codigoTunel").val(response[0].codigo);
    document.getElementById("codigoTunel").disabled = true;

    $("#idTunel").val(response[0].id_Tunel);
    $("#nombreTunel").val(response[0].nombre);
    $("#pesoActual").val(response[0].peso_Actual);
    $("#pesoMinimo").val(response[0].cantidad_Min_Peso);
    $("#pesoMaximo").val(response[0].cantidad_Max_Peso);
    $("#temperatura").val(response[0].temperatura_Actual);
    $("#ipEntrada").val(response[0].direccion_Ip_Entrada);
    $("#puertoEntrada").val(response[0].puerto_Entrada);
    $("#ipSalida").val(response[0].direccion_Ip_Salida);
    $("#puertoSalida").val(response[0].puerto_Salida);

    if (response[0].activo) {
        document.querySelector('#activoTunel').checked = true;
        document.querySelector('#inactivoTunel').checked = false;
    } else {
        document.querySelector('#activoTunel').checked = false;
        document.querySelector('#inactivoTunel').checked = true;
    }

    if (response[0].alarma_Peso) {
        document.querySelector('#alarmaActiva').checked = true;
        document.querySelector('#alarmaDesactiva').checked = false;
    } else {
        document.querySelector('#alarmaActiva').checked = false;
        document.querySelector('#alarmaDesactiva').checked = true;
    }
}

/*************************************************************************************/
//Método para Guardar y editar báscula

function GuardarTunel() {
    try {

        let urlEnviar = ''

        let datosEnviar = {
            'id_tunel': 0,
            'codigo': 0,
            'nombre': '',
            'cantidad_min_peso': 0,
            'cantidad_max_peso': 0,
            'peso_actual': 0,
            'temperatura_actual': 0,
            'alarma_peso': 0,
            'direccion_ip_entrada': '',
            'puerto_entrada': 0,
            'direccion_ip_salida': '',
            'puerto_salida': '',
            'activo': 0,
        };
        let id_tunel = document.getElementById("idTunel").value;
        let codigo = document.getElementById("codigoTunel").value;
        let nombre = document.getElementById("nombreTunel").value;
        let cantidad_min_peso = document.getElementById("pesoMinimo").value;
        let cantidad_max_peso = document.getElementById("pesoMaximo").value;
        let peso_actual = document.getElementById("pesoActual").value;
        let temperatura_actual = document.getElementById("temperatura").value;
        let direccion_ip_entrada = document.getElementById("ipEntrada").value;
        let puerto_entrada = document.getElementById("puertoEntrada").value;
        let direccion_ip_salida = document.getElementById("ipSalida").value;;
        let puerto_salida = document.getElementById("puertoSalida").value;;
        let estado = 0;
        let alarma_Peso = 0;
        if (document.getElementById("activoTunel").checked) {
            estado = 1;
        } else {
            estado = 0;
        }

        if (document.getElementById("alarmaActiva").checked) {
            alarma_Peso = 1;
        } else {
            alarma_Peso = 0;
        }

        if (document.getElementById("alarmaActiva").checked) {
            alarma_Peso = 1;
        } else {
            alarma_Peso = 0;
        }

        if (Number(cantidad_min_peso) > Number(cantidad_max_peso)) {
            alert("Peso máximo no puede ser mayor al mínimo");
            return;
        }

        if (Number(peso_actual) > Number(cantidad_max_peso) || Number(peso_actual) < Number(cantidad_min_peso) ) {
            
            alert("Peso actual no está en el rango registrado");
            return;
                
        }

        if (Number(cantidad_min_peso) < 0 || Number(cantidad_max_peso) < 0) {
            alert("No se permiten pesos negativos");
            return;
        }

        if (Number(puerto_entrada) <= 0 || Number(puerto_salida) <= 0) {
            alert("No se permiten ese valor en los puertos");
            return;
        }


        datosEnviar.codigo = codigo;
        datosEnviar.nombre = nombre;
        datosEnviar.cantidad_min_peso = cantidad_min_peso;
        datosEnviar.cantidad_max_peso = cantidad_max_peso;
        datosEnviar.peso_actual = peso_actual;
        datosEnviar.temperatura_actual = temperatura_actual;
        datosEnviar.alarma_peso = alarma_Peso;
        datosEnviar.direccion_ip_entrada = direccion_ip_entrada;
        datosEnviar.puerto_entrada = puerto_entrada;
        datosEnviar.direccion_ip_salida = direccion_ip_salida;
        datosEnviar.puerto_salida = puerto_salida;
        datosEnviar.activo = estado;

        if (id_tunel > 0) {
            datosEnviar.id_tunel = id_tunel;
            urlEnviar = "Tunel/Editar";
        } else {
            urlEnviar = 'Tunel/Crear';
        }

        try {
            $.ajax({
                type: 'POST',
                url: urlEnviar,
                data: {
                    id_tunel: datosEnviar.id_tunel,
                    codigo: datosEnviar.codigo,
                    nombre: datosEnviar.nombre,
                    cantidad_min_peso: datosEnviar.cantidad_min_peso,
                    cantidad_max_peso: datosEnviar.cantidad_max_peso,
                    peso_actual: datosEnviar.peso_actual,
                    temperatura_actual: datosEnviar.temperatura_actual,
                    alarma_peso: datosEnviar.alarma_peso,
                    direccion_ip_entrada: datosEnviar.direccion_ip_entrada,
                    puerto_entrada: datosEnviar.puerto_entrada,
                    direccion_ip_salida: datosEnviar.direccion_ip_salida,
                    puerto_salida: datosEnviar.puerto_salida,
                    activo: datosEnviar.activo
                },
                success: function (response) {
                    if (response.procesoExitoso === true) {
                        alert("Túnel ingresado correctamente");
                        limpiarPantallaTunel();
                    } else {
                        alert(response.mensajeRespuesta);
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
//Método para limpiarPantallaTunel báscula
function limpiarPantallaTunel() {

    document.getElementById("codigoTunel").disabled = false;
    $("#codigoTunel").val('');
    $("#idTunel").val('');
    $("#nombreTunel").val('');
    $("#pesoActual").val('');
    $("#pesoMinimo").val('');
    $("#pesoMaximo").val('');
    $("#temperatura").val('');
    $("#ipEntrada").val('');
    $("#puertoEntrada").val('');
    $("#ipSalida").val('');
    $("#puertoSalida").val('');

    document.querySelector('#activoTunel').checked = false;
    document.querySelector('#inactivoTunel').checked = true;

    $("#codigoTunel_m").val('');
    $("#nombreTunel_m").val('');

    DatosJsonTunel = null;
}