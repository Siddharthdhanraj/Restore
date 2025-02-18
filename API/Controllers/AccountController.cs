using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AccountController:BaseApiController
    { 
        //_userManager used to interact with database related to user
       private readonly UserManager<User> _userManager;

      public AccountController(UserManager<User> userManager){
       _userManager=userManager;

      }

      [HttpPost("login")]
      public async Task<ActionResult<User>> Login(LoginDto loginDto)
      {
        var user=await _userManager.FindByNameAsync(loginDto.UserName);
        if(user==null || !await _userManager.CheckPasswordAsync(user,loginDto.Password))
        return Unauthorized();
  
       return user;

      }
      
    [HttpPost("register")]
    public async Task<ActionResult> Register(RegisterDto registerDto)
      {
        var user=new User{UserName=registerDto.UserName,Email=registerDto.Email};
        var result=await _userManager.CreateAsync(user,registerDto.Password);
        if(user==null)
        await _userManager.AddToRoleAsync(user ,"User");
        if(!result.Succeeded)
        {
            foreach(var error in result.Errors)
            {
               ModelState.AddModelError(error.Code,error.Description);
            }
           return ValidationProblem();
        }
              
         await _userManager.AddToRoleAsync(user,"Member");

         return StatusCode(201);
      }
       



        
    }
}