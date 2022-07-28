
function doFunction() {
    alert("se presionó el botón");
}

function GuardarBascula() {
    try {

        let datosEnviar = {
            'codigo': 0,
            'nombre': '',
            'codigoSerie': '',
            'direccion_Ip': '',
            'puerto': '',
            'estado': 0
        };
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

        try {
            $.ajax({
                type: 'POST',
                url: 'Bascula/Crear',
                data: {
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
                    } else {
                        alert("Error al ingresar registro " + response.mensajeRespuesta);
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