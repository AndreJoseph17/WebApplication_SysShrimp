USE [SysShrimp]
GO
/****** Object:  StoredProcedure [dbo].[sp_parametro]    Script Date: 19/7/2022 22:40:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE procedure [dbo].[sp_parametro]
(
	@i_accion			char(1),
	@i_usuario			varchar(20)		= null,

	@i_id_parametro		int				= null,
	@i_tipo				char(1)			= null,
	@i_moneda			money			= null,
	@i_booleano			bit				= null,
	@i_entero			int				= null
)
as
	declare @t_id_secuencia		int,
			@t_mensaje_error	varchar(300)
	
	if @i_accion = 'M'
	begin
		if @i_tipo = 'M'
		begin
			update tb_parametro with(rowlock)
				set moneda = @i_moneda
			where id_parametro = @i_id_parametro

			if @@rowcount = 0 or @@error != 0
			begin
				set	@t_mensaje_error = 'Error al insertar los registros del parametro' 
				exec sp_imprimir_error
					@i_mensaje_error = @t_mensaje_error
				return 1
			end
		end

		if @i_tipo = 'B'
		begin
			update tb_parametro with(rowlock)
				set booleano = @i_booleano
			where id_parametro = @i_id_parametro

			if @@rowcount = 0 or @@error != 0
			begin
				set	@t_mensaje_error = 'Error al insertar los registros del parametro' 
				exec sp_imprimir_error
					@i_mensaje_error = @t_mensaje_error
				return 1
			end
		end

		if @i_tipo = 'E'
		begin
			update tb_parametro with(rowlock)
				set entero = @i_entero
			where id_parametro = @i_id_parametro

			if @@rowcount = 0 or @@error != 0
			begin
				set	@t_mensaje_error = 'Error al insertar los registros del parametro' 
				exec sp_imprimir_error
					@i_mensaje_error = @t_mensaje_error
				return 1
			end
		end

		return 0
	end

	if @i_accion = 'G'
	begin
		select 
		id_parametro,
		codigo,
		descripcion,
		tipo,
		cadena,
		entero,
		moneda,
		booleano,
		fecha,
		activo 
		from tb_parametro with(rowlock)
		where activo = 1

		return 0
	end
	
	return 1


