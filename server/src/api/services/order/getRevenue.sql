select CONVERT(varchar,h.[date], 1) as [date], CONVERT(varchar,h.[date], 8) as [time], count(h.id) as numOfOrders, count(d.quantity) as numOfProducts, sum(d.price) as total 
from OrderHeader h 
join OrderDetail d on h.id = d.orderHeaderId 
and h.[date] >= @startDate
and h.[date] <= @endDate 
and h.shopId = @id
and h.[status] = 'COMPLETED'
group by h.[date]
order by h.[date] desc