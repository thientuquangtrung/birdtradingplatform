DECLARE @sqlCommand varchar(1000)

DECLARE @pagination varchar(1000)
SET @pagination = 'OFFSET (' + @page + '-1) * ' + @rowsOfPage + 'ROWS FETCH NEXT' + @RowsOfPage + 'ROWS ONLY'

IF @sortBy = 'newest'
BEGIN
    SET @sqlCommand = 'select * from product where' +  @categoryId + @q + 'and [enabled] = 1 order by [id] desc' + @pagination
END

IF @sortBy = 'sales'
BEGIN
    SET @sqlCommand = 'select p.* from product p, orderdetail o where' + @categoryId + @q + 'p.id = o.productId and p.[enabled] = 1 group by p.categoryId, p.description, p.id, p.[name], p.price, p.enabled order by sum (o.quantity) desc' + @pagination
END

IF @sortBy = 'price'
BEGIN
    SET @sqlCommand = 'select * from product where' +  @categoryId + @q + 'and [enabled] = 1 order by [price]' + @order + @pagination
END

EXEC (@sqlCommand)