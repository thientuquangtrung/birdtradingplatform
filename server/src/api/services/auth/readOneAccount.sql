IF @role = 'seller'
begin
    Select a.*, s.pickUpAddress, s.description  from account a, Seller s where a.email = @email and a.id = s.id and a.enabled = 'true'
end

IF @role = 'customer'
begin
    Select a.*, c.shipToAddress, c.category  from account a, customer c where a.email = @email and a.id = c.id and a.enabled = 'true'
end