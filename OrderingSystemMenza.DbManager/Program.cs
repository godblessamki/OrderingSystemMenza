using OrderingSystemMenza.Models;

var builder = WebApplication.CreateBuilder(args);

builder.AddServiceDefaults();

builder.AddSqlServerDbContext<ModelsContext>("postgresdb");

var app = builder.Build();

app.MapDefaultEndpoints();

app.MapPost("/reset-db", async (ModelsContext context) =>
{
    await context.Database.EnsureDeletedAsync();
    await context.Database.EnsureCreatedAsync();

    await context.SaveChangesAsync();
});

app.UseHttpsRedirection();

app.Run();