using Microsoft.EntityFrameworkCore;
using UTB.Minute.Db;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<MinuteDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("Default")));

var app = builder.Build();

app.MapGet("/", () => "API is running");

app.Run();