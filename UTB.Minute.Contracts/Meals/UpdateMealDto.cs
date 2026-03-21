using System;
using System.Collections.Generic;
using System.Text;

namespace UTB.Minute.Contracts.Meals
{
    public class UpdateMealDto
    {
        public string Name { get; set; } = null!;
        public string Description { get; set; } = null!;
        public decimal Price { get; set; }

        public bool IsActive { get; set; }
    }
}
