using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class ProductExtensions
    {
        
        public static IQueryable<Product> Sort(this IQueryable<Product> query,string orderBy){

            if(string.IsNullOrWhiteSpace(orderBy))
            return query.OrderBy(p=>p.Name);
            query= orderBy switch
            {
                "price" => query.OrderBy(p => p.Price),
                "priceDesc" => query.OrderByDescending(p => p.Price),
                _ => query.OrderBy(p => p.Name),
            };
            return query;
        }
          public static IQueryable<Product> Search(this IQueryable<Product> query,string searchBy){
           
            if(string.IsNullOrWhiteSpace(searchBy))
            return query;  
            var lowerCaseSearchTerm=searchBy.Trim().ToLower();

            return query.Where(p => p.Name.ToLower().Contains(lowerCaseSearchTerm));
        }

         public static IQueryable<Product> Filter(this IQueryable<Product> query,string  brands,string types){
           
              var brandList=new List<string>();
              var typelist=new List<string>();
              if(!string.IsNullOrEmpty(brands))
              brandList.AddRange(brands.ToLower().Split(",").ToList());

              if(!string.IsNullOrEmpty(types))
              typelist.AddRange(types.ToLower().Split(",").ToList());

              query = query.Where(p => brandList.Count == 0 || brandList.Contains(p.Brand.ToLower()));
              query=query.Where(p=>typelist.Count == 0 || typelist.Contains(p.Type.ToLower()));
          
            return query;

        }


       
    }
}