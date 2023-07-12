INSERT INTO [category] ([name]) values (@name)
select * from [category] where [id] = SCOPE_IDENTITY()