IF @role = 'SELLER'
BEGIN
    Select a.*, s.pickUpAddress, s.description from account a, Seller s where a.name like '%' + @name + '%' and a.role = @role and a.id = s.id
END

IF @role = 'CUSTOMER'
BEGIN
    Select a.*, c.shipToAddress, c.category  from account a, customer c where a.name like '%' + @name + '%' and a.role = @role and a.id = c.id
END