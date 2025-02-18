using API.Data;
using API.Entities;
using API.Middleware;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;



var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Disable SSL certificate validation
        System.Net.ServicePointManager.ServerCertificateValidationCallback = 
            delegate { return true; };
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<StoreContext>(opt=>{

opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));

});
builder.Services.AddCors();

builder.Services.AddIdentityCore<User>().AddRoles<IdentityRole>()
.AddEntityFrameworkStores<StoreContext>();
builder.Services.AddAuthentication();
builder.Services.AddAuthorization();



var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseMiddleware<ExceptionMiddleware>();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(opt =>
{

opt.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins("https://localhost:3000");

});

app.UseAuthorization();
app.MapControllers();

     var scope=app.Services.CreateScope();
     var context=scope.ServiceProvider.GetRequiredService<StoreContext>();
     var userManager=scope.ServiceProvider.GetRequiredService<UserManager<User>>();
     var logger=scope.ServiceProvider.GetRequiredService<ILogger<Program>>(); 

     try{

       await  context.Database.MigrateAsync();
        await DbInitializer.Initialize(context,userManager);
       }  
     catch(Exception ex){
       logger.LogError(ex,"A problem occured during migration"); 
     }

app.Run();
