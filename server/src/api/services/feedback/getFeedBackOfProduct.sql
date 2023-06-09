SELECT f.*, oh.customerId, oh.shopId, od.productId
FROM [Feedback] f
JOIN [OrderHeader] oh ON f.orderHeaderId = oh.id
JOIN [OrderDetail] od ON oh.id = od.orderHeaderId
WHERE od.productId = @productId