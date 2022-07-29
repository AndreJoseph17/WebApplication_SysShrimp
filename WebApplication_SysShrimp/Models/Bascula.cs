using Newtonsoft.Json;
using System.Data.Entity;

namespace WebApplication_SysShrimp.Models
{
    public class Bascula
    {
        [JsonProperty("id_Bascula")]
        public int Id_Bascula { get; set; }  
        [JsonProperty("codigo")]
        public string Codigo { get; set; }
        [JsonProperty("nombre")]
        public string Nombre { get; set; }
        [JsonProperty("codigoSerie")]
        public string Codigo_Serie { get; set; }
        [JsonProperty("direccion_Ip")]
        public string Direccion_Ip { get; set; }
        [JsonProperty("puerto")]
        public int Puerto { get; set; }
        [JsonProperty("estado")]
        public int Estado { get; set; }
        [JsonProperty("activo")]
        public int Activo { get; set; }
    }
}
