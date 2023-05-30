DECLARE @sqlCommand varchar(1000)

IF @sortBy = 'newest'
BEGIN
    SET @sqlCommand = 'select * from product where' +  @categoryId + 'and [enabled] = 1 order by [id] desc'
END

IF @sortBy = 'sales'
BEGIN
    SET @sqlCommand = 'select p.* from product p, orderdetail o where' + @categoryId + 'p.id = o.productId and p.[enabled] = 1 group by p.categoryId, p.description, p.id, p.[name], p.price, p.enabled order by sum (o.quantity) desc'
END

IF @sortBy = 'price'
BEGIN
    SET @sqlCommand = 'select * from product where' +  @categoryId + 'and [enabled] = 1 order by [price]' + @order
END

EXEC (@sqlCommand)