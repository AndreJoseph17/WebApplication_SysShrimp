using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication_SysShrimp.Models
{
    public class ReporteDashboard
    {
        [JsonProperty("codigo_Tunel")]
        public string Codigo_Tunel { get; set; }
        [JsonProperty("nombre_Tunel")]
        public string Nombre_Tunel { get; set; }
        [JsonProperty("codigo_Bascula")]
        public string Codigo_Bascula { get; set; }
        [JsonProperty("nombre_Bascula")]
        public string Nombre_Bascula { get; set; }
        [JsonProperty("temperatura_Tunel")]
        public decimal Temperatura_Tunel { get; set; }
        [JsonProperty("fecha")]
        public DateTime Fecha { get; set; }
        [JsonProperty("nombre_Dias")]
        public string Nombre_Dias { get; set; }
        [JsonProperty("numero_Semana")]
        public int Numero_Semana { get; set; }
    }
}
