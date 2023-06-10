select oh.*, od.productId, od.price, od.quantity
from OrderHeader oh
join OrderDetail od on oh.id = od.orderHeaderId
where oh.customerId = @id and oh.status = @status