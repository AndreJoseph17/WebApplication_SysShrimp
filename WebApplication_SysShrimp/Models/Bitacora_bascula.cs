using Newtonsoft.Json;

namespace WebApplication_SysShrimp.Models
{
    public class Bitacora_bascula
    {
        [JsonProperty("id_Bitacora_Bascula")]
        public int Id_Bitacora_Bascula { get; set; }
        [JsonProperty("id_Bascula")]
        public int Id_Bascula { get; set; }
        [JsonProperty("fecha")]
        public string Fecha { get; set; }
        [JsonProperty("fecha_entero")]
        public int Fecha_Entero { get; set; }
        [JsonProperty("peso")]
        public decimal Peso { get; set; }
        [JsonProperty("codigo_rfid")]
        public string Codigo_rfid { get; set; }
        [JsonProperty ("procesado")]
        public int Procesado { get; set; }
    }
}
