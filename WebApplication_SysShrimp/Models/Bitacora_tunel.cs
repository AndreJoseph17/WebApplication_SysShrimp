using Newtonsoft.Json;

namespace WebApplication_SysShrimp.Models
{
    public class Bitacora_tunel
    {
        [JsonProperty("id_bitacora_tunel")]
        public int Id_Bitacora_Tunel { get; set; }
        [JsonProperty("id_Bitacora_Bascula")]
        public int Id_Bitacora_Bascula { get; set; }
        [JsonProperty("id_tunel")]
        public int Id_Tunel { get; set; }
        [JsonProperty("fecha")]
        public string Fecha { get; set; }
        [JsonProperty("fecha_entero")]
        public int Fecha_Entero { get; set; }
        [JsonProperty("fecha_ingreso")]
        public string Fecha_Ingreso { get; set; }
        [JsonProperty("fecha_salida")]
        public string Fecha_Salida { get; set; }
        [JsonProperty("procesado_completo")]
        public int Procesado_Completo { get; set; }
    }
}
