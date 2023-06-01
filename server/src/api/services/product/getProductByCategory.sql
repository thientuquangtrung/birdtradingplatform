select *, count(*) over() as total from product  where [categoryId] = @id
ORDER BY ID 
OFFSET (@page-1) * @rowsOfPage ROWS
FETCH NEXT @RowsOfPage ROWS ONLY