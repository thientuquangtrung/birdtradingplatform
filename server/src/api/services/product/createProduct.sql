insert product ([name], [shopId], [description], [price], [image], [categoryId]) values(@name, @shopId, @description, @price, @image, @categoryId)
select * from product where id = SCOPE_IDENTITY()