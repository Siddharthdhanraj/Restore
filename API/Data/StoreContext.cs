using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{

    //Instead of DbContext we are using IdentityDbContext
    public class StoreContext : IdentityDbContext<User>
    {
        public StoreContext (DbContextOptions<StoreContext>  options) : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }=null!;
        public DbSet<Basket> Baskets   {get; set;}

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<IdentityRole>()
            .HasData(
            

                new IdentityRole{Name="Member",NormalizedName="MEMBER"},
                new IdentityRole{Name="Admin",NormalizedName="ADMIN"}
            );
        }
    }
}