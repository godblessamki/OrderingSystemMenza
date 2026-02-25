using System;
using System.Collections.Generic;
using System.Text;

namespace OrderingSystemMenza.Models
{
    public class Order
    {
        #region getters and setters
        public int Id { get; set; }
        public required double Price { get; set; }
        public required string Name { get; set; }
        public required string description { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        #endregion
    }
}
