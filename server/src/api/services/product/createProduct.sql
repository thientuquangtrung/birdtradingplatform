insert product ([name], [shopId], [description], [price], [image], [categoryId]) values(@name, @shopId, @description, @price, @image, @categoryId)
select IDENT_CURRENT('product')