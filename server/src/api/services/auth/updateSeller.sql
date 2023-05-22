update account set [name] = @name, [email] = @email, [password] = @password, [phone] = @phone, [image] = @image where [id] = @id
update seller set [pickUpAddress] = @pickUpAddress where [id] = @id
Select a.*, s.pickUpAddress from account a, Seller s where a.id = @id and a.id = s.id