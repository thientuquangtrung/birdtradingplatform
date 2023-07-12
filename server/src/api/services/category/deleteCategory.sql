Update [category] set [enabled] = '0' where [id] = @id
select * from [category] where [id] = @id
