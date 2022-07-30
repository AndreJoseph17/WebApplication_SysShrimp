﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using WebApplication_SysShrimp.DAO;
using WebApplication_SysShrimp.Models;
using WebApplication_SysShrimp.Operaciones;

namespace WebApplication_SysShrimp.Controllers
{
    public class TunelController : Controller
    {
        private readonly ITunelOperaciones tunelOperaciones;

        public TunelController(ITunelOperaciones tunelOperaciones)
        {
            this.tunelOperaciones = tunelOperaciones;
        }

        // GET: TunelController1
        public ActionResult Index()
        {
            return View();
        }

        // GET: TunelController1/Details/5
        [HttpGet]
        public async Task<JsonResult> Detalle(TunelRequest request)
        {
            try
            {
                var response = await tunelOperaciones.Consultar(request);
                if (response != null)
                {
                    return Json(response);
                }
                return Json(new Response { ProcesoExitoso = false, MensajeRespuesta = "Error durante la consulta" });
            }
            catch (Exception ex)
            {
                return Json(new Response { ProcesoExitoso = false, MensajeRespuesta = "Error " + ex.Message.ToString() });
            }
            
        }

        // GET: TunelController1/Create
        [HttpPost]
        public async Task<JsonResult> Crear(Tunel request)
        {
            try
            {
                await tunelOperaciones.CrearTunel(request);
                return Json(new Response { ProcesoExitoso = true, MensajeRespuesta = "Proceso exitoso" });
            }
            catch (Exception ex)
            {
                return Json(new Response { ProcesoExitoso = false, MensajeRespuesta = "Error durante el registro"+ex.Message });
            }
        }

        [HttpPost]
        public async Task<JsonResult> Editar(Tunel request)
        {
            try
            {
                await tunelOperaciones.Editar(request);
                return Json(new Response { ProcesoExitoso = true, MensajeRespuesta = "Proceso exitoso" });
            }
            catch (Exception ex)
            {
                return Json(new Response { ProcesoExitoso = false, MensajeRespuesta = "Error durante la edición"+ex.Message });
            }
        }

        [HttpGet]
        public async Task<JsonResult> Listar()
        {
            try
            {
                var basculas = await tunelOperaciones.Listar();
                if (basculas != null)
                    return Json(basculas);

                return Json(new Response { ProcesoExitoso = false, MensajeRespuesta = "Error durante la consulta" });
            }
            catch (Exception ex)
            {
                return Json(new Response { ProcesoExitoso = false, MensajeRespuesta = "Error " + ex.Message.ToString() });
            }
        }
    }
}
