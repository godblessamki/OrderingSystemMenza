using Microsoft.EntityFrameworkCore;
using UTB.Minute.Contracts.Meals;
using UTB.Minute.Db;

public static class MealsEndpoints
{
    public static void MapMealsEndpoints(this WebApplication app)
    {
        app.MapGet("/meals", async (MinuteDbContext db) =>
        {
            var meals = await db.Meals.ToListAsync();
            return TypedResults.Ok(meals.Select(m => new MealDto
            {
                Id = m.Id,
                Name = m.Name,
                Description = m.Description,
                Price = m.Price,
                IsActive = m.IsActive
            }));
        });

        app.MapPost("/meals", async (CreateMealDto dto, MinuteDbContext db) =>
        {
            var meal = new UTB.Minute.Db.Entities.Meal
            {
                Id = Guid.NewGuid(),
                Name = dto.Name,
                Description = dto.Description,
                Price = dto.Price
            };

            db.Meals.Add(meal);
            await db.SaveChangesAsync();

            return TypedResults.Ok();
        });
    }
}
