if @role = 'CUSTOMER'
begin
    select * from [BannedReason] where [id] like '1[0-9][0-9]'
end

if @role = 'SELLER'
begin
    select * from [BannedReason] where [id] like '2[0-9][0-9]'
end