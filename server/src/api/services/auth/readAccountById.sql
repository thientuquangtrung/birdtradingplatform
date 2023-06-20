if @role = 'seller'
BEGIN
    Select a.*, s.pickUpAddress, s.description from account a, Seller s where a.id = @id and a.id = s.id
end

if @role = 'customer'
BEGIN
    Select a.*, c.shipToAddress, c.category  from account a, customer c where a.id = @id and a.id = c.id
end

if @role = 'ALL'
BEGIN
    select * from account where [id] = @id
END

