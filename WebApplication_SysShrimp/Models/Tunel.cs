using Newtonsoft.Json;

namespace WebApplication_SysShrimp.Models
{
    public class Tunel
    {
        [JsonProperty("id_tunel")]
        public int Id_Tunel { get; set; }
        [JsonProperty("codigo")]
        public string Codigo { get; set; } 
        [JsonProperty("nombre")]
        public string Nombre { get; set; }  
        [JsonProperty("cantidad_min_peso")]
        public decimal Cantidad_Min_Peso { get; set; }
        [JsonProperty("cantidad_max_peso")]
        public decimal Cantidad_Max_Peso { get; set; }
        [JsonProperty("peso_actual")]
        public decimal Peso_Actual { get; set; }
        [JsonProperty("temperatura_actual")]
        public decimal Temperatura_Actual { get; set; }
        [JsonProperty("alarma_peso")]
        public int Alarma_Peso { get; set; }
        [JsonProperty("direccion_ip_entrada")]
        public string Direccion_Ip_Entrada { get; set; }   
        [JsonProperty("puerto_entrada")]
        public int Puerto_Entrada { get; set; } 
        [JsonProperty("direccion_ip_salida")]
        public string Direccion_Ip_Salida { get; set; }
        [JsonProperty("puerto_salida")]
        public int Puerto_Salida { get; set; }
        [JsonProperty("activo")]
        public int Activo { get; set; }    

    }
}
