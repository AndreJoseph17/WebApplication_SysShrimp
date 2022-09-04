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
    public class DashboardController : Controller
    {
        private readonly IReporteDashboardOperaciones reporteDashboardOperaciones;

        public DashboardController(IReporteDashboardOperaciones reporteDashboard)
        {
            this.reporteDashboardOperaciones = reporteDashboard;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public async Task<JsonResult> ConsultarTemperatura(ReporteBasculaTunelRequest request)
        {
            try
            {
                var response = await reporteDashboardOperaciones.Consultar(request);
                if (response != null)
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
