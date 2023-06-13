DECLARE @sqlCommand varchar(1000)

DECLARE @pagination varchar(1000)
SET @pagination = ' OFFSET ' + @offset + ' ROWS FETCH NEXT ' + @RowsOfPage + ' ROWS ONLY'

SET @sqlCommand = 'select *, count(*) over() as total from product where ' +  @categoryId + @q + ' and [enabled] = 1 order by (select null) ' + @pagination

IF @sortBy = 'newest'
BEGIN
    SET @sqlCommand = 'select *, count(*) over() as total from product where ' +  @categoryId + @q + ' and [enabled] = 1 order by [id] desc ' + @pagination
END

IF @sortBy = 'sales'
BEGIN
    SET @sqlCommand = 'select p.* from product p, orderdetail o, count(*) over() as total where' + @categoryId + @q + 'p.id = o.productId and p.[enabled] = 1 group by p.categoryId, p.description, p.id, p.[name], p.price, p.enabled order by sum (o.quantity) desc ' + @pagination
END

IF @sortBy = 'price'
BEGIN
    SET @sqlCommand = 'select *, count(*) over() as total from product where' +  @categoryId + @q + 'and [enabled] = 1 order by [price] ' + @order + ' ' + @pagination
END

EXEC (@sqlCommand)