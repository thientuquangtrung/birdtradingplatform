Insert account ([name], [phone], [email], [password], [role]) values (@name, @phone, @email, @password, 'SELLER')

DECLARE @id uniqueidentifier
SELECT top(1) @id = id 
FROM Account 
WHERE [email] = @email 
ORDER BY id DESC

Insert Seller values(@id, @address)
Select a.*, s.pickUpAddress from account a, Seller s where a.email = @email and a.id = s.id 