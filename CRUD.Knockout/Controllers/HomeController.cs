using CRUD.Knockout.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CRUD.Knockout.Controllers
{
    public class HomeController : Controller
    {
        private ProductDbContext db = new ProductDbContext();

        // GET: Products
        public ActionResult Products()
        {
            return View();
        }
        public JsonResult GetAllProducts()
        {
            return Json(db.Products.ToList(), JsonRequestBehavior.AllowGet);
        }
        
        public JsonResult AddProduct(Product product)
        {
            db.Products.Add(product);
            db.SaveChanges();
            return Json(db.Products.(), JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult EditProduct(Product product)
        {
            var products = db.Products.Single(a => a.Id == product.Id);
            products.ProductName = product.ProductName;
            products.Quantity = product.Quantity;
            db.SaveChanges();
            return Json(db.Products.ToList(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult DeleteProduct(int id)
        {

            Product product = db.Products.Find(id);
            db.Products.Remove(product);
            db.SaveChanges();
                return Json(new { Status = true }, JsonRequestBehavior.AllowGet);
            

      

        }
    }
}