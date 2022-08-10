using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication_SysShrimp.Models
{
    public class ReporteBasculaTunelRequest
    {
        [JsonProperty("id_tunel")]
        public int Id_Tunel { get; set; }
        [JsonProperty("id_Bascula")]
        public int Id_Bascula { get; set; }
        [JsonProperty("fecha_Inicio")]
        public DateTime Fecha_Inicio { get; set; }
        [JsonProperty("fecha_Fin")]
        public DateTime Fecha_Fin { get; set; }
    }
}
