if @cancelId = 0
begin
    update OrderHeader set [status] = @status
    where [id] = @orderId
end
else
begin
    update OrderHeader set [status] = @status, [cancelId] = @cancelId
    where [id] = @orderId
end

