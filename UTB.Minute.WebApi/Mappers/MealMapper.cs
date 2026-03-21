using UTB.Minute.Contracts.Meals;
using UTB.Minute.Db.Entities;

namespace UTB.Minute.WebApi.Mappers;

public static class MealMapper
{
    public static MealDto ToDto(this Meal meal)
    {
        return new MealDto
        {
            Id = meal.Id,
            Name = meal.Name,
            Description = meal.Description,
            Price = meal.Price,
            IsActive = meal.IsActive
        };
    }
}
