using UTB.Minute.Contracts.Orders;
using UTB.Minute.Db.Entities;

namespace UTB.Minute.WebApi.Mappers;

public static class OrderMapper
{
    public static OrderDto ToDto(this Order order)
    {
        return new OrderDto
        {
            Id = order.Id,
            MenuItemId = order.MenuItemId,
            CreatedAt = order.CreatedAt,
            Status = ConvertStatus(order.Status)
        };
    }

    private static OrderStatus ConvertStatus(UTB.Minute.Db.Entities.OrderStatus status)
    {
        return status switch
        {
            UTB.Minute.Db.Entities.OrderStatus.Preparing => OrderStatus.Preparing,
            UTB.Minute.Db.Entities.OrderStatus.Ready => OrderStatus.Ready,
            UTB.Minute.Db.Entities.OrderStatus.Cancelled => OrderStatus.Cancelled,
            UTB.Minute.Db.Entities.OrderStatus.Completed => OrderStatus.Completed,
            _ => throw new ArgumentOutOfRangeException(nameof(status), status, null)
        };
    }
}