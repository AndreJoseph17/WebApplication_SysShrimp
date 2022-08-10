USE SysShrimp

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

IF OBJECT_ID('sp_bitacora_bascula', 'P') IS NOT NULL  
  DROP PROCEDURE sp_bitacora_bascula
  go

CREATE PROCEDURE sp_bitacora_bascula
	@i_accion			char(1),
	@i_usuario			varchar(20)		= null,

	@i_id_bascula		int = null,
	@i_peso				decimal = null,
	@i_codigorfid		varchar(35) = null,
	@i_procesado		smallint
AS
BEGIN
	
	SET NOCOUNT ON;
	declare @t_id_secuencia		int,
			@t_mensaje_error	varchar(300)

	if @i_accion = 'I'
	begin
		INSERT INTO [dbo].[tb_bitacora_bascula] (fecha, fecha_entero, peso, codigo_rfid, procesado)
		VALUES (GETDATE(), CONVERT(varchar,getdate(),112), @i_peso, @i_codigorfid, @i_procesado )

		if @@rowcount = 0 or @@error != 0
		begin
			set	@t_mensaje_error = 'Error al insertar los registros del parametro' 
			exec sp_imprimir_error
				@i_mensaje_error = @t_mensaje_error
			return 1
		end
	end

	if @i_accion = 'M'
	begin
		update tb_bitacora_bascula with(rowlock)
			set peso = @i_peso,
			codigo_rfid = @i_codigorfid,
			procesado = @i_procesado
		where id_bascula = @i_id_bascula

		if @@rowcount = 0 or @@error != 0
		begin
			set	@t_mensaje_error = 'Error al insertar los registros del parametro' 
			exec sp_imprimir_error
				@i_mensaje_error = @t_mensaje_error
			return 1
		end
	end

	if @i_accion = 'G'
	begin
		SELECT [id_bitacora_bascula]
		  ,[id_bascula]
		  ,[fecha]
		  ,[fecha_entero]
		  ,[peso]
		  ,[codigo_rfid]
		  ,[procesado]
	  FROM [SysShrimp].[dbo].[tb_bitacora_bascula]
	  return 0
	end
	
	return 1
    
END
GO
