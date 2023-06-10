IF @role = 'SELLER'
BEGIN
    Select a.*, s.pickUpAddress, s.description from account a, Seller s where name like '%' + @name + '%'
END

IF @role = 'CUSTOMER'
BEGIN
    Select a.*, c.shipToAddress, c.category  from account a, customer c where name like '%' + @name + '%'
END