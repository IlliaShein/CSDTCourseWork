using CRUDAppBackend.Interfaces;
using CRUDAppBackend.Managers;
using CRUDAppBackend.Middlewares;
using DbLib.Models.EntityFramework;
using Microsoft.EntityFrameworkCore;
using AutoMapper;

namespace CRUDAppBackend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            const string corsPolicyName = "Cors";

            builder.Services.AddControllers();

            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddCors(
                option => option
                .AddPolicy(corsPolicyName,
                    corsPolicy => corsPolicy
                    .AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader()));
            string connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
            builder.Services.AddDbContext<MyDbContext>(options =>
                options.UseSqlServer(connectionString));

            builder.Services.AddScoped<IPersonManager, PersonManager>();

            builder.Services.AddAutoMapper(typeof(Program));

            var app = builder.Build();

            app.UseErrorHandling();

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseCors(corsPolicyName);
            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.MapControllerRoute(
            name: "default",
            pattern: "{controller}/{action=Index}/{id?}");

            app.MapControllers();

            app.Run();
        }
    }
}
