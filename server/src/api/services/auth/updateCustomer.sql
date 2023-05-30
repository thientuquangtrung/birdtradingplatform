update account set [name] = @name, [email] = @email, [password] = @password, [phone] = @phone, [image] = @image where [id] = @id
update customer set [shipToAddress] = @shipToAddress where [id] = @id
Select a.*, c.shipToAddress, c.category  from account a, customer c where a.email = @email and a.id = c.id