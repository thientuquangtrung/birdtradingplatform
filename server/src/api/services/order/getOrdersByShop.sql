IF @status = 'ALL'
BEGIN
   SELECT oh.*, od.productId, od.price, od.quantity
    FROM 
        (SELECT *, count(*) over() as total FROM   OrderHeader  ORDER BY [date] desc
        OFFSET (@page - 1) * @perPage ROWS
        FETCH NEXT @perPage ROWS ONLY) AS oh
    JOIN OrderDetail od ON oh.id = od.orderHeaderId
    WHERE oh.shopId = @id
END
ELSE
BEGIN
    SELECT oh.*, od.productId, od.price, od.quantity
    FROM 
        (SELECT *, count(*) over() as total FROM   OrderHeader  ORDER BY [date] desc
        OFFSET (@page - 1) * @perPage ROWS
        FETCH NEXT @perPage ROWS ONLY) AS oh
    JOIN OrderDetail od ON oh.id = od.orderHeaderId
    WHERE oh.shopId = @id and oh.status = @status
END
