update account set [name] = @name, [email] = @email, [password] = @password, [phone] = @phone, [image] = @image where [id] = @id
update seller set [pickUpAddress] = @pickUpAddress, [description] = @description where [id] = @id
Select a.*, s.pickUpAddress, s.description from account a, Seller s where a.id = @id and a.id = s.id