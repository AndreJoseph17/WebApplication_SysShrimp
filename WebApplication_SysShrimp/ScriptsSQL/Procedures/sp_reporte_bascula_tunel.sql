USE SysShrimp

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

IF OBJECT_ID('sp_reporte_bascula_tunel', 'P') IS NOT NULL  
  DROP PROCEDURE sp_reporte_bascula_tunel
  go

CREATE PROCEDURE sp_reporte_bascula_tunel
	@i_accion				char(1),
	@i_usuario				varchar(20)	= null,

	@i_id_tunel				int = null,
	@i_id_bascula			int = null,
	@i_fecha_ingreso		datetime = null,
	@i_fecha_salida			datetime = null
AS
BEGIN

	SET NOCOUNT ON;

	if @i_accion = 'C'
	begin
		SELECT TUNEL.codigo			AS Codigo_Tunel
			,TUNEL.nombre			AS Nombre_Tunel
			,CASE WHEN TUNEL.activo = 1 THEN 'Activo' 
			ELSE 'Inactivo' END		AS Estado_Tunel
			,TUNEL.cantidad_max_peso	AS Peso_Maximo_Tunel
			,BASCULA.codigo			AS Codigo_Bascula
			,BASCULA.nombre			AS Nombre_Bascula
			,BT.temperatura_actual	AS Temperatura_Tunel
			,BB.PESO				AS Peso
			,BT.fecha_ingreso		AS Fecha_Ingreso
			,BT.fecha_salida		AS Fecha_Salida
			,CASE 
				WHEN BT.fecha_salida IS NOT NULL THEN 'Autorizada'
				ELSE 'No Autorizada'
			END AS Autorizacion
			,Dias_Diferencia
		FROM tb_bitacora_tunel BT
		INNER JOIN tb_bitacora_bascula BB
			ON BT.id_bitacora_bascula_peso = BB.id_bitacora_bascula
		INNER JOIN tb_tunel TUNEL
			ON BT.id_tunel = TUNEL.id_tunel
		INNER JOIN tb_bascula BASCULA 
			ON BB.id_bascula = BASCULA.id_bascula
		INNER JOIN (select	id_bitacora_tunel as id
					,fecha_ingreso
					,fecha_salida
					, case
						when fecha_salida is not null then DATEDIFF(day, fecha_ingreso, fecha_salida)
						else DATEDIFF(day, fecha_ingreso, GETDATE())
					end as Dias_Diferencia
					FROM tb_bitacora_tunel) FECHAS
		ON BT.id_bitacora_tunel = FECHAS.id
		WHERE BT.id_tunel = CASE WHEN @i_id_tunel = 0 THEN bt.id_tunel ELSE ISNULL(@i_id_tunel, bt.id_tunel) END
		and bb.id_bascula = CASE WHEN @i_id_bascula = 0 THEN bb.id_bascula ELSE  ISNULL(@i_id_bascula, bb.id_bascula) END
		and bt.fecha_ingreso between ISNULL(@i_fecha_ingreso, bt.fecha_ingreso) and ISNULL(@i_fecha_salida, bt.fecha_salida)
		and bt.fecha_salida  between ISNULL(@i_fecha_ingreso, bt.fecha_ingreso) and ISNULL(@i_fecha_salida, bt.fecha_salida)
	end
END
