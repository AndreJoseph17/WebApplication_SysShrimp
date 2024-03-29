USE SysShrimp

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

IF OBJECT_ID('sp_reporte_dashboard', 'P') IS NOT NULL  
  DROP PROCEDURE sp_reporte_dashboard
  go

CREATE PROCEDURE [dbo].[sp_reporte_dashboard]
	@i_accion				char(1),
	@i_usuario				varchar(20)	= null,
	@i_id_tunel				int = null,
	@i_fecha_ingreso		datetime = null,
	@i_fecha_salida			datetime = null

AS
BEGIN
	SET Language 'Spanish';
	SET NOCOUNT ON;

    if @i_accion = 'D'
	begin
	Declare @tablaTemp Table (
		Codigo_Tunel	varchar(35),
		Nombre_Tunel	varchar(35),
		Codigo_Bascula	varchar(35),
		Nombre_Bascula	varchar(35),
		Peso_Maximo_Tunel	decimal,
		Temperatura_Tunel	decimal,
		Peso				decimal,
		Dias_diferencia		int,
		Fecha_Ingreso		datetime,
		Temp_minima			decimal,
		Temp_maxima			decimal
	)

	Declare @tablaCursor Table (
		Codigo_Tunel	varchar(35),
		Codigo_Bascula	varchar(35),
		Fecha				varchar(35),
		Nombre_Dias			varchar(35),
		Numero_Semana		int 
	)
	Insert into @tablaTemp
		SELECT	TUNEL.codigo				AS Codigo_Tunel
				,TUNEL.nombre				AS Nombre_Tunel
				,BASCULA.codigo				AS Codigo_Bascula
				,BASCULA.nombre				AS Nombre_Bascula
				,TUNEL.cantidad_max_peso	AS Peso_Maximo_Tunel
				,BT.temperatura_actual		AS Temperatura_Tunel
				,BB.PESO					AS Peso
				,Dias_Diferencia
				,BT.fecha_ingreso			AS Fecha_Ingreso
				,BT.temp_minima				AS Temp_minima
				,BT.temp_maxima				AS Temp_maxima
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
			and bt.fecha_ingreso between ISNULL(@i_fecha_ingreso, bt.fecha_ingreso) and ISNULL(@i_fecha_salida, bt.fecha_salida)
			and bt.fecha_salida  between ISNULL(@i_fecha_ingreso, bt.fecha_ingreso) and ISNULL(@i_fecha_salida, bt.fecha_salida)

		DECLARE @Codigo_Tunel as VARCHAR(15), @Codigo_Bascula as VARCHAR(15), @Dias_Diferencia as INT, @Fecha_Ingreso as Datetime
			,@Dia_Semana AS nvarchar(40), @Numero_Semana AS int, @contador int, @Fecha as Datetime
	
		DECLARE DiasSemana CURSOR FOR 
		SELECT Codigo_Tunel
				,Codigo_Bascula
				,Fecha_Ingreso
				,Dias_diferencia		
				FROM @tablaTemp
	
		OPEN DiasSemana
			FETCH NEXT FROM DiasSemana INTO @Codigo_Tunel, @Codigo_Bascula, @Fecha_Ingreso ,@Dias_Diferencia
			WHILE @@fetch_status = 0
			BEGIN
				SET @contador = 1
				while @Dias_Diferencia > 0
					BEGIN
						SET @Dia_Semana = DATENAME(WEEKDAY, @Fecha_Ingreso + @contador)
						SET @Numero_Semana = @contador / 7
						SET @Fecha = @Fecha_Ingreso + @contador
						INSERT INTO @tablaCursor
							SELECT @Codigo_Tunel, 
								@Codigo_Bascula, 
								@Fecha,
								@Dia_Semana, 
								@Numero_Semana
						SET @Dias_Diferencia = @Dias_Diferencia - 1
						SET @contador = @contador + 1
					END
				FETCH NEXT FROM DiasSemana INTO @Codigo_Tunel, @Codigo_Bascula, @Fecha_Ingreso ,@Dias_Diferencia
			END
		CLOSE DiasSemana
		DEALLOCATE DiasSemana

		SELECT c.Codigo_Tunel
			,t.Nombre_Tunel
			,c.Codigo_Bascula
			,t.Nombre_Bascula
			,t.Temperatura_Tunel
			,TRY_CONVERT(datetime,c.Fecha,3) as 'Fecha'
			,c.Nombre_Dias
			,c.Numero_Semana
			,t.Temp_minima
			,t.Temp_maxima
			,DATENAME(MONTH,(TRY_CONVERT(datetime,c.Fecha,3))) as Mes
			,DATEPART(WEEK, TRY_CONVERT(datetime,c.Fecha,3))  - 
				DATEPART(WEEK, DATEADD(MM, DATEDIFF(MM,0,TRY_CONVERT(datetime,c.Fecha,3)), 0))+ 1  as Semana
			,CASE WHEN Temperatura_Tunel  <= -18 AND Temperatura_Tunel >= -20 THEN 'Normal'
				WHEN Temperatura_Tunel  = -17 OR Temperatura_Tunel = -21 THEN 'Atención'
				ELSE 'Peligro' END AS Observacion
		FROM @tablaCursor c
		JOIN @tablaTemp t
			ON C.Codigo_Tunel = T.Codigo_Tunel
			AND C.Codigo_Bascula = T.Codigo_Bascula
	end
END
