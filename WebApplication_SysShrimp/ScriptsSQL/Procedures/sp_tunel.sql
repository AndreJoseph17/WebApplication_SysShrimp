USE SysShrimp

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE sp_tunel
	@i_accion			char(1),
	@i_usuario			varchar(20)	= null,

	@i_id_tunel			int = null,
	@i_codigo			varchar(35) = null,
	@i_nombre			varchar (35) = null,
	@i_cantidad_min_peso	decimal = null,
	@i_cantidad_max_peso	decimal = null,
	@i_peso_actual			decimal = null,
	@i_temp_actual			decimal = null,
	@i_alarma_peso			decimal = null,
	@i_direccionIpEntrada	varchar(35) = null,
	@i_puerto_entrada		int =  null,
	@i_direccionIpSalida	varchar(35) = null,
	@i_puerto_salida		int =  null,
	@i_activo				int = null
AS
BEGIN
	
	SET NOCOUNT ON;

	SET NOCOUNT ON;
	declare @t_id_secuencia		int,
			@t_mensaje_error	varchar(300)

	if @i_accion = 'I'
	begin
		INSERT INTO [dbo].[tb_tunel] ([codigo] ,
							[nombre], 
							[cantidad_min_peso], 
							[cantidad_max_peso], 
							[peso_actual], 
							[temperatura_actual], 
							[alarma_peso], 
							[direccion_ip_entrada], 
							[puerto_entrada], 
							[direccion_ip_salida], 
							[puerto_salida], 
							[activo])
				VALUES (@i_codigo, 
						@i_nombre, 
						@i_cantidad_min_peso, 
						@i_cantidad_max_peso, 
						@i_peso_actual, 
						@i_temp_actual,
						@i_alarma_peso, 
						@i_direccionIpEntrada, 
						@i_puerto_entrada, 
						@i_direccionIpSalida, 
						@i_puerto_salida,
						@i_activo)

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
		update [dbo].[tb_tunel] with(rowlock)
			set codigo = @i_codigo
			,nombre = @i_nombre
			,cantidad_min_peso = @i_cantidad_min_peso
			,cantidad_max_peso = @i_cantidad_max_peso
			,peso_actual = @i_peso_actual
			,temperatura_actual = @i_temp_actual
			,alarma_peso = @i_alarma_peso
			,direccion_ip_entrada = @i_direccionIpEntrada
			,puerto_entrada = @i_puerto_entrada
			,direccion_ip_salida = @i_direccionIpSalida
			,puerto_salida = @i_puerto_salida
			,activo = @i_activo
		where id_tunel = @i_id_tunel
		return 1
	end
	
	if @i_accion = 'G'
	begin
		SELECT [id_tunel]
      ,[codigo]
      ,[nombre]
      ,[cantidad_min_peso]
      ,[cantidad_max_peso]
      ,[peso_actual]
      ,[temperatura_actual]
      ,[alarma_peso]
      ,[direccion_ip_entrada]
      ,[puerto_entrada]
      ,[direccion_ip_salida]
      ,[puerto_salida]
      ,[activo]
	FROM [SysShrimp].[dbo].[tb_tunel]	  
	  return 0
	end

	if @i_accion = 'C'
	begin
		SELECT [id_tunel]
			  ,[codigo]
			  ,[nombre]
			  ,[cantidad_min_peso]
			  ,[cantidad_max_peso]
			  ,[peso_actual]
			  ,[temperatura_actual]
			  ,[alarma_peso]
			  ,[direccion_ip_entrada]
			  ,[puerto_entrada]
			  ,[direccion_ip_salida]
			  ,[puerto_salida]
			  ,[activo]
		FROM [SysShrimp].[dbo].[tb_tunel]
	  WHERE codigo = isnull(@i_codigo,codigo)
	  AND nombre Like  '%'+ISNULL(@i_nombre, nombre)+'%'

	  return 1
	end
	return 1
END
