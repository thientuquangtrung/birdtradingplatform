BEGIN TRY
    BEGIN TRAN
        update account set [name] = @name, [email] = @email, [phone] = @phone, where [id] = @id

        if @role = 'SELLER'
        BEGIN
            update seller set [pickUpAddress] = @address where [id] = @id
        END
        else
        BEGIN
            update customer set [shipToAddress] = @address where [id] = @id
        END
    COMMIT TRAN
END TRY
BEGIN CATCH
   ROLLBACK
   DECLARE @ErrorMessage VARCHAR(2000)
   SELECT @ErrorMessage = ERROR_MESSAGE()
   RAISERROR(@ErrorMessage, 16, 1)
END CATCH

