Insert account ([name], [phone], [email], [role]) values (@name, @phone, @email, 'SELLER')
Insert Seller values(SCOPE_IDENTITY(), @address)
Select * from account where email = @email