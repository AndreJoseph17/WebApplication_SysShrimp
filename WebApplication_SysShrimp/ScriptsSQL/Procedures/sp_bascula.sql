USE [SysShrimp]
GO
/****** Object:  StoredProcedure [dbo].[sp_bascula]    Script Date: 25/7/2022 2:17:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

IF OBJECT_ID('sp_bascula', 'P') IS NOT NULL  
  DROP PROCEDURE sp_bascula
  go

CREATE PROCEDURE [dbo].[sp_bascula]
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
		return 1
	end

	if @i_accion = 'M'
	begin
		update [dbo].[tb_bascula] with(rowlock)
			set codigo = @i_codigo,
			nombre = @i_nombre,
			codigo_serie = @i_codigo_serie,
			direccion_ip = @i_direccionIp,
			puerto = @i_puerto,
			activo = @i_estado
		where id_bascula = @i_id_bascula

		return 1
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
	  
	  return 1
	end

	if @i_accion = 'C'
	begin
		SELECT [id_bascula]
		  ,[codigo]
		  ,[nombre]
		  ,[codigo_serie]
		  ,[direccion_ip]
		  ,[puerto]
		  ,[activo]
	  FROM [SysShrimp].[dbo].[tb_bascula]
	  WHERE codigo = isnull(@i_codigo,codigo)
	  AND nombre like  '%'+ISNULL(@i_nombre, nombre)+'%'

	  return 1
	end

	return 1
END
