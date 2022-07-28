using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication_SysShrimp.DAO
{
    public class Response
    {
        [JsonProperty("procesoExitoso")]
        public bool ProcesoExitoso { get; set; }
        [JsonProperty("mensajeRespuesta")]
        public string MensajeRespuesta { get; set; }
    }
}
