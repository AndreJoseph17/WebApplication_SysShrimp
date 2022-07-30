USE SysShrimp

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE pr_bitacora_tunel
	@i_accion			char(1),
	@i_usuario			varchar(20)		= null,

	@i_id_bitacora_peso	int = null,
	@i_id_tunel			int = null,
	@i_fecha_ingreso	date = null,
	@i_fecha_salida		date = null,
	@i_procesado_completo	smallint = null
AS
BEGIN
	
	SET NOCOUNT ON;
	declare @t_id_secuencia		int,
			@t_mensaje_error	varchar(300)

	if @i_accion = 'I'
	begin
		INSERT INTO [dbo].[tb_bitacora_tunel] (id_tunel, fecha, fecha_entero, fecha_ingreso, fecha_salida, procesado_completo)
		VALUES ( @i_id_tunel, GETDATE(), CONVERT(varchar,getdate(),112), @i_fecha_ingreso, @i_fecha_salida, @i_procesado_completo )

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
		update tb_bitacora_tunel with(rowlock)
			set fecha_ingreso = @i_fecha_ingreso,
			fecha_salida = @i_fecha_salida,
			procesado_completo = @i_procesado_completo
		where id_bitacora_bascula_peso = @i_id_bitacora_peso

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
		SELECT  [id_bitacora_tunel]
		  ,[id_bitacora_bascula_peso]
		  ,[id_tunel]
		  ,[fecha]
		  ,[fecha_entero]
		  ,[fecha_ingreso]
		  ,[fecha_salida]
		  ,[procesado_completo]
	  FROM [SysShrimp].[dbo].[tb_bitacora_tunel]
		return 0
	end

	return 1
    
END
GO
