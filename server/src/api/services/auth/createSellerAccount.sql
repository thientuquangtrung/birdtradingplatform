Insert account ([name], [phone], [email], [password], [role]) values (@name, @phone, @email, @password, 'SELLER')

DECLARE @id uniqueidentifier
SELECT top(1) @id = id 
FROM Account 
WHERE [email] = @email 
ORDER BY id DESC

Insert Seller ([id], [pickUpAddress]) values(@id, @address) 
Select a.*, s.pickUpAddress, s.description from account a, Seller s where a.email = @email and a.id = s.id 