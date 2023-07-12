Update [category] set [name] = @name, [enabled] = '1' where [id] = @id
select * from [category] where [id] = @id