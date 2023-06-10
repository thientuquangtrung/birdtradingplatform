IF @status = 'ALL'
BEGIN
    select oh.*, od.productId, od.price, od.quantity
    from OrderHeader oh
    join OrderDetail od on oh.id = od.orderHeaderId
    where oh.shopId = @id
    order by (select null)
    offset (@page - 1) * @perPage rows
    fetch next @perPage rows only
END
ELSE
BEGIN
    select oh.*, od.productId, od.price, od.quantity
    from OrderHeader oh
    join OrderDetail od on oh.id = od.orderHeaderId
    where oh.shopId = @id and oh.status = @status
    order by (select null)
    offset (@page - 1) * @perPage rows
    fetch next @perPage rows only
END
