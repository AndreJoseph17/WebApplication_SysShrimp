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
		SELECT BT.temperatura_actual AS Temperatura_Tunel
			,BB.PESO				AS Peso
			,BT.fecha_ingreso		AS Fecha_Ingreso
			,BT.fecha_salida		AS Fecha_Salida
			,CASE 
				WHEN BT.fecha_salida IS NOT NULL THEN 'Autorizada'
				ELSE 'No Autorizada'
			END AS Autorizacion
			,Dias_Diferencia
		FROM tb_bitacora_tunel BT
		LEFT JOIN tb_bitacora_bascula BB
			ON BT.id_bitacora_bascula_peso = BB.id_bitacora_bascula
		LEFT JOIN (select	id_bitacora_tunel as id
					,fecha_ingreso
					,fecha_salida
					, case
						when fecha_salida is not null then DATEDIFF(day, fecha_ingreso, fecha_salida)
						else DATEDIFF(day, fecha_ingreso, GETDATE())
					end as Dias_Diferencia
					FROM tb_bitacora_tunel) FECHAS
		ON BT.id_bitacora_tunel = FECHAS.id
		WHERE BT.id_tunel = ISNULL(@i_id_tunel, bt.id_tunel)
		and bb.id_bascula = ISNULL(@i_id_bascula, bb.id_bascula)
		and ISNULL(@i_fecha_ingreso, bt.fecha_ingreso) between bt.fecha_ingreso and bt.fecha_salida
		and ISNULL(@i_fecha_salida, bt.fecha_salida) between bt.fecha_ingreso and bt.fecha_salida
	end
END