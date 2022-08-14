using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication_SysShrimp.Models
{
    public class ReporteBasculaTunel
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
        [JsonProperty("peso")]
        public decimal Peso { get; set; }
        [JsonProperty("fecha_Ingreso")]
        public DateTime Fecha_Ingreso { get; set; }
        [JsonProperty("fecha_Salida")]
        public DateTime Fecha_Salida { get; set; }
        [JsonProperty("autorizacion")]
        public string Autorizacion { get; set; }
        [JsonProperty("dias_Diferencia")]
        public int Dias_Diferencia { get; set; }
    }
}
