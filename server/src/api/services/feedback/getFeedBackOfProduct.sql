SELECT f.*, oh.customerId, oh.shopId, od.productId, count(*) over() as total
FROM [Feedback] f
JOIN [OrderHeader] oh ON f.orderHeaderId = oh.id
JOIN [OrderDetail] od ON oh.id = od.orderHeaderId
WHERE od.productId = @productId
ORDER BY [createdAt] desc
OFFSET (@page - 1) * @perPage ROWS
FETCH NEXT @perPage ROWS ONLY