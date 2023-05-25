BEGIN
    DECLARE @role varchar(10);

    SELECT 
        @role = [role]
    FROM
        Account
    WHERE
        [id] = @id

    IF @role = 'ADMIN'
		BEGIN
			select * from Account where [id] = @id
		END
	ELSE
		BEGIN
			IF @role = 'SELLER'
				BEGIN
					Select a.*, s.pickUpAddress, s.[description] from account a, Seller s where a.id = @id and a.id = s.id
				END
			IF @role = 'CUSTOMER'
				BEGIN
					Select a.*, c.category, c.shipToAddress from account a, Customer c where a.id = @id and a.id = c.id
				END
		END
END