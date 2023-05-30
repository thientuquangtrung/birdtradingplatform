update product set [enabled] = '0'
where [id] = @id and [shopId] = @shopId  
select * from product where id = @id    