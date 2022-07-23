using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using WebApplication_SysShrimp.Models;

namespace WebApplication_SysShrimp.Controllers
{
    public class ParametroController : Controller
    {
        // GET: ParametroController
        public ActionResult Index()
        {
            return View();
        }

        //[HttpGet]
        //public JsonResult GetParametros(Parametro request)
        //{
        //    try
        //    {
        //        if(request != null)
        //        {
        //            return Json(request);
        //        }
        //    }
        //    catch (Exception ex)
        //    {

        //    }
        //}

        // GET: ParametroController/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: ParametroController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: ParametroController/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: ParametroController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: ParametroController/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: ParametroController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
    }
}
