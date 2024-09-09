using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace API.Controllers
{
    public class BasketController:BaseApiController
    {
          private readonly StoreContext _context;
        public BasketController(StoreContext context)
        {

           _context=context;

        }


        [HttpGet(Name ="GetBasket")]
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            var basket = await RetrieveBasket();

            if (basket == null)
                return NotFound();

            return MapBasketToDto(basket);

        }



        [HttpPost]
        public async Task<ActionResult<BasketDto>> AddItemToBasket(int productId,int quantity)
        {
        var basket = await RetrieveBasket();

        //create basket if not exists
        if(basket==null)
        basket=CreateBasket();
        //get product
        var product=await _context.Products.FindAsync(productId);

        if(product==null)
        return NotFound();
        //add item
        basket.AddItem(product,quantity);
        //save changes
        var result=await _context.SaveChangesAsync()>0;

        if(result) return  CreatedAtRoute("GetBasket",MapBasketToDto(basket));

        return BadRequest(new ProblemDetails{Title="Problem saving item to basket"});
        
        }

        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int productId,int quantity)
        {
        //get basket
        var basket = await RetrieveBasket();
        //reduce item or quantity
        if(basket==null)
        return NotFound();

        basket.RemoveItem(productId,quantity);
        //save changes
        var result =await _context.SaveChangesAsync()>0;
        if(result)
        return Ok();

        return BadRequest(new ProblemDetails{Title="problem removing item from basket"})    ;

        }
        

        // extracted new method from GetBasket
        private async Task<Basket> RetrieveBasket()
        {
            return await _context.Baskets
                     .Include(i => i.Items)
                     .ThenInclude(p => p.Product)
                     .FirstOrDefaultAsync(x => x.BuyerId ==  Request.Cookies["buyerId"]);
        }

         //Create BasketMethod
        private Basket CreateBasket()
        {
            var buyerId=Guid.NewGuid().ToString();
            var cookieOptions=new CookieOptions{IsEssential=true,Expires=DateTime.Now.AddDays(30)};
            Response.Cookies.Append("buyerId",buyerId,cookieOptions);
            var basket=new Basket{BuyerId=buyerId};
            _context.Baskets.Add(basket);
             return basket;
        
        }


        private BasketDto MapBasketToDto(Basket basket)
        {
            return new BasketDto
            {

                Id = basket.Id,
                BuyerId = basket.BuyerId,
                Items = basket.Items.Select(item => new BasketItemDto
                {
                    ProductId = item.ProductId,
                    Name = item.Product.Name,
                    Price = item.Product.Price,
                    PictureUrl = item.Product.PictureUrl,
                    Brand = item.Product.Brand,
                    Type = item.Product.Type,
                    Quantity = item.Quantity

                }).ToList()

            };
        }


        
    }
}