select oh.*, od.productId, od.price, od.quantity
from OrderHeader oh
join OrderDetail od on oh.id = od.orderHeaderId
where oh.shopId = @id and oh.status = @status
