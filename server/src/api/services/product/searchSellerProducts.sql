if @categoryId = 'all'
    select * from product where [name] like '%' + @q + '%' and [shopId] = @shopId
else 
    select * from product where [name] like '%' + @q + '%' and categoryId = @categoryId and [shopId] = @shopId