select datepart(day, h.[date]) as [label], sum(d.price) as total 
from OrderHeader h 
join OrderDetail d on h.id = d.orderHeaderId 
where h.[date] between @startDate and @endDate and h.shopId = @id
group by datepart(day, h.[date])