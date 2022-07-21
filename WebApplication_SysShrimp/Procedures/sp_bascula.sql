USE SysShrimp

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE sp_bascula
	@i_accion			char(1),
	@i_usuario			varchar(20)		= null,

	@i_id_bascula		int			= null,
	@i_codigo			varchar(35) = null,
	@i_nombre			varchar(35) = null,
	@i_codigo_serie		varchar(35) = null,
	@i_direccionIp		varchar(35) = null,
	@i_puerto			int = null,
	@i_estado			smallint = null
AS
BEGIN
	
	SET NOCOUNT ON;

	declare @t_id_secuencia		int,
			@t_mensaje_error	varchar(300)
	
	if @i_accion = 'I'
	begin
		INSERT INTO [dbo].[tb_bascula] (codigo, nombre, codigo_serie, direccion_ip, puerto, activo)
		VALUES (@i_codigo, @i_nombre, @i_codigo_serie, @i_direccionIp, @i_puerto, @i_estado)

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
		update [dbo].[tb_bascula] with(rowlock)
			set codigo = @i_codigo,
			nombre = @i_nombre,
			codigo_serie = @i_codigo_serie
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
		SELECT [id_bascula]
		  ,[codigo]
		  ,[nombre]
		  ,[codigo_serie]
		  ,[direccion_ip]
		  ,[puerto]
		  ,[activo]
	  FROM [SysShrimp].[dbo].[tb_bascula]
	  
	  return 0
	end

	return 1
END
GO
