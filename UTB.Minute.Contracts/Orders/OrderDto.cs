using System;
using System.Collections.Generic;
using System.Text;

namespace UTB.Minute.Contracts.Orders
{
    public class OrderDto
    {
        public Guid Id { get; set; }

        public Guid MenuItemId { get; set; }

        public DateTime CreatedAt { get; set; }

        public OrderStatus Status { get; set; }
    }
}
