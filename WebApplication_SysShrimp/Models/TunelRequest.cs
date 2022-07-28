using Newtonsoft.Json;

namespace WebApplication_SysShrimp.Models
{
    public class TunelRequest
    {
        [JsonProperty("codigo")]
        public string Codigo { get; set; }
        [JsonProperty("nombre")]
        public string Nombre { get; set; }
    }
}