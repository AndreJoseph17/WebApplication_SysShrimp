﻿using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using WebApplication_SysShrimp.DAO;
using WebApplication_SysShrimp.Models;
using WebApplication_SysShrimp.Operaciones;

namespace WebApplication_SysShrimp.Controllers
{
    public class BasculaController : Controller
    {
        private readonly IBasculaOperaciones basculaOperaciones;

        public BasculaController(IBasculaOperaciones basculaOperaciones)
        {
            this.basculaOperaciones = basculaOperaciones;
        }

        // GET: BasculaController1
        public ActionResult Index()
        {
            return View();
        }

        // GET: BasculaController1/Details/5
        [HttpGet]
        public async Task<JsonResult> Detalle(BasculaRequest request)
        {
            try
            {
                var response = await basculaOperaciones.Consultar(request);
                if (response != null)
                {
                    return Json(response);
                }
                return Json(new Response { ProcesoExitoso = false, MensajeRespuesta = "Error durante la consulta" });
            }
            catch(SqlException ex)
            {
                return Json(new Response { ProcesoExitoso = false, MensajeRespuesta = "Error durante la consulta "});
            }
            
        }

        //POST: BasculaController1/Create
       [HttpPost]
        public async Task<JsonResult> Crear(Bascula request)
        {
            try
            {
                await basculaOperaciones.CrearBascula(request);
                return Json(new Response { ProcesoExitoso = true, MensajeRespuesta = "Proceso exitoso" });
                //return Ok(new Response { ProcesoExitoso = true, MensajeRespuesta = "Proceso exitoso" }) ;
            }
            catch (Exception ex)
            {
                if(ex.Message.Contains("duplicate key"))
                    return Json(new Response { ProcesoExitoso = false, MensajeRespuesta = "Error, código ya existente!" });

                return Json(new Response { ProcesoExitoso = false, MensajeRespuesta = "Error durante el registro "});
                //return BadRequest(new Response { ProcesoExitoso = false, MensajeRespuesta = "Error durante la consulta" });
            }
        }

        [HttpPost]
        public async Task<JsonResult> Editar(Bascula request)
        {
            try
            {
                await basculaOperaciones.Editar(request);
                return Json(new Response { ProcesoExitoso = true, MensajeRespuesta = "Proceso exitoso" });
            }
            catch
            {
                return Json(new Response { ProcesoExitoso = false, MensajeRespuesta = "Error durante la consulta" });
            }
        }

        [HttpGet]
        public async Task<JsonResult> Listar()
        {
            try
            {
                var basculas = await basculaOperaciones.Listar();
                if(basculas != null)
                    return Json(basculas);

                return Json(new Response { ProcesoExitoso = false, MensajeRespuesta = "Error durante la consulta" });
            }catch(Exception ex)
            {
                return Json(new Response { ProcesoExitoso = false, MensajeRespuesta = "Error "});
            }
        }
    }
}
