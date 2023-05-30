update product set [name] = @name, [categoryId] = @categoryId, [image] = @image, [price] = @price, [description] = @description, [enabled] = '1'
where [id] = @id and [shopId] = @shopId
select * from product where id = @id    