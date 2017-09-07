using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace CRUD.Knockout.Models
{
    public class ProductDbContext : DbContext
    {
        public ProductDbContext() : base("connString") { }
        public DbSet<Product> Products { get; set; }
    }
}