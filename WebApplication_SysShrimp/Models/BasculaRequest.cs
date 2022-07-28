using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication_SysShrimp.Models
{
    public class BasculaRequest
    {
        [JsonProperty("codigo")]
        public string Codigo { get; set; }
        [JsonProperty("nombre")]
        public string Nombre { get; set; }
    }
}
