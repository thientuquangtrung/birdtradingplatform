select *, count(*) over() as total from product where [name] like '%' + @q + '%' and [enabled] = '1'
ORDER BY ID 
OFFSET (@page-1) * @rowsOfPage ROWS
FETCH NEXT @RowsOfPage ROWS ONLY