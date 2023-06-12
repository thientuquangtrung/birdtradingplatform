BEGIN TRY
    BEGIN TRAN
        Insert account ([name], [phone], [email], [password], [image], [role]) values (@name, @phone, @email, @password, @image, @role)
        DECLARE @id uniqueidentifier
        SELECT top(1) @id = id 
        FROM Account 
        WHERE [email] = @email 
        ORDER BY id DESC

        if @role = 'SELLER'
        BEGIN
            Insert Seller ([id], [pickUpAddress]) values(@id, @address)
        END

        if @role = 'CUSTOMER'
        BEGIN
            Insert customer ([id], [shipToAddress], [category]) values(@id, @address, 'Copper')
        END
    COMMIT TRAN
END TRY
BEGIN CATCH
   ROLLBACK
   DECLARE @ErrorMessage VARCHAR(2000)
   SELECT @ErrorMessage = ERROR_MESSAGE()
   RAISERROR(@ErrorMessage, 16, 1)
END CATCH        