BEGIN TRY
    BEGIN TRAN
        Insert account ([name], [phone], [email], [password], [role]) values (@name, @phone, @email, @password, 'CUSTOMER')

        DECLARE @id uniqueidentifier
        SELECT top(1) @id = id 
        FROM Account 
        WHERE [email] = @email 
        ORDER BY id DESC

        Insert Customer ([id], [shipToAddress], [category]) values(@id, @shipToAddress, 'Copper')
    COMMIT TRAN
        Select a.*, c.shipToAddress, c.category  from account a, customer c where a.email = @email and a.id = c.id
END TRY
BEGIN CATCH
   ROLLBACK
   DECLARE @ErrorMessage VARCHAR(2000)
   SELECT @ErrorMessage = ERROR_MESSAGE()
   RAISERROR(@ErrorMessage, 16, 1)
END CATCH