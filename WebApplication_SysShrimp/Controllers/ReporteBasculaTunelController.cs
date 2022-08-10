using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication_SysShrimp.DAO;
using WebApplication_SysShrimp.Models;
using WebApplication_SysShrimp.Operaciones;

namespace WebApplication_SysShrimp.Controllers
{
    public class ReporteBasculaTunelController : Controller
    {
        private readonly IReporteBasculaTunelOperaciones reporteBasculaTunelOperaciones;

        public ReporteBasculaTunelController(IReporteBasculaTunelOperaciones reporteBasculaTunel)
        {
            this.reporteBasculaTunelOperaciones = reporteBasculaTunel;
        }

        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public async Task<JsonResult> ConsultarReporte(ReporteBasculaTunelRequest request)
        {
            try
            {
                var response = await reporteBasculaTunelOperaciones.Consultar(request);
                if(response != null)
                {
                    return Json(response);
                }
                return Json(new Response { ProcesoExitoso = false, MensajeRespuesta = "Error durante la consulta" });

            }
            catch (Exception ex)
            {
                return Json(new Response { ProcesoExitoso = false, MensajeRespuesta = "Error al realizar la consulta " });
            }

        }
    }
}
