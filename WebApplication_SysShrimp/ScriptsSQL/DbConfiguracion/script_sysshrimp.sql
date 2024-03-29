USE [master]
GO
/****** Object:  Database [SysShrimp]    Script Date: 30/9/2022 22:48:39 ******/
CREATE DATABASE [SysShrimp]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'SysShrimp', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\SysShrimp.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'SysShrimp_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\SysShrimp_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [SysShrimp] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [SysShrimp].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [SysShrimp] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [SysShrimp] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [SysShrimp] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [SysShrimp] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [SysShrimp] SET ARITHABORT OFF 
GO
ALTER DATABASE [SysShrimp] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [SysShrimp] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [SysShrimp] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [SysShrimp] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [SysShrimp] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [SysShrimp] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [SysShrimp] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [SysShrimp] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [SysShrimp] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [SysShrimp] SET  DISABLE_BROKER 
GO
ALTER DATABASE [SysShrimp] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [SysShrimp] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [SysShrimp] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [SysShrimp] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [SysShrimp] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [SysShrimp] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [SysShrimp] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [SysShrimp] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [SysShrimp] SET  MULTI_USER 
GO
ALTER DATABASE [SysShrimp] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [SysShrimp] SET DB_CHAINING OFF 
GO
ALTER DATABASE [SysShrimp] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [SysShrimp] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [SysShrimp] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [SysShrimp] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [SysShrimp] SET QUERY_STORE = OFF
GO
USE [SysShrimp]
GO
/****** Object:  User [UserSysShrimp]    Script Date: 30/9/2022 22:48:39 ******/
CREATE USER [UserSysShrimp] FOR LOGIN [UserSysShrimp] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [UserSyshimp]    Script Date: 30/9/2022 22:48:39 ******/
CREATE USER [UserSyshimp] WITHOUT LOGIN WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  Table [dbo].[tb_bascula]    Script Date: 30/9/2022 22:48:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tb_bascula](
	[id_bascula] [int] IDENTITY(1,1) NOT NULL,
	[codigo] [varchar](10) NOT NULL,
	[nombre] [varchar](30) NOT NULL,
	[codigo_serie] [varchar](20) NULL,
	[direccion_ip] [varchar](15) NOT NULL,
	[puerto] [int] NOT NULL,
	[activo] [bit] NOT NULL,
 CONSTRAINT [PK_id_bascula] PRIMARY KEY CLUSTERED 
(
	[id_bascula] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UK_codigo_bascula] UNIQUE NONCLUSTERED 
(
	[codigo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tb_bitacora_bascula]    Script Date: 30/9/2022 22:48:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tb_bitacora_bascula](
	[id_bitacora_bascula] [int] NOT NULL,
	[id_bascula] [int] NOT NULL,
	[fecha] [datetime] NOT NULL,
	[fecha_entero] [int] NOT NULL,
	[peso] [decimal](18, 2) NOT NULL,
	[codigo_rfid] [varchar](30) NOT NULL,
	[procesado] [bit] NOT NULL,
 CONSTRAINT [PK_id_bitacora_bascula] PRIMARY KEY CLUSTERED 
(
	[id_bitacora_bascula] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tb_bitacora_tunel]    Script Date: 30/9/2022 22:48:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tb_bitacora_tunel](
	[id_bitacora_tunel] [int] NOT NULL,
	[id_bitacora_bascula_peso] [int] NOT NULL,
	[id_tunel] [int] NOT NULL,
	[fecha] [datetime] NOT NULL,
	[fecha_entero] [int] NOT NULL,
	[fecha_ingreso] [datetime] NOT NULL,
	[fecha_salida] [datetime] NULL,
	[procesado_completo] [bit] NOT NULL,
	[temperatura_actual] [decimal](18, 0) NULL,
 CONSTRAINT [PK_id_bitacora_tunel] PRIMARY KEY CLUSTERED 
(
	[id_bitacora_tunel] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tb_parametro]    Script Date: 30/9/2022 22:48:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tb_parametro](
	[id_parametro] [int] IDENTITY(1,1) NOT NULL,
	[codigo] [varchar](10) NOT NULL,
	[descripcion] [varchar](100) NOT NULL,
	[tipo] [char](1) NOT NULL,
	[cadena] [varchar](100) NULL,
	[entero] [int] NULL,
	[moneda] [money] NULL,
	[booleano] [bit] NULL,
	[fecha] [datetime] NULL,
	[activo] [bit] NOT NULL,
 CONSTRAINT [PK_id_parametro] PRIMARY KEY CLUSTERED 
(
	[id_parametro] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UK_codigo_parametro] UNIQUE NONCLUSTERED 
(
	[codigo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tb_tunel]    Script Date: 30/9/2022 22:48:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tb_tunel](
	[id_tunel] [int] IDENTITY(1,1) NOT NULL,
	[codigo] [varchar](10) NOT NULL,
	[nombre] [varchar](30) NOT NULL,
	[cantidad_min_peso] [decimal](18, 2) NOT NULL,
	[cantidad_max_peso] [decimal](18, 2) NOT NULL,
	[peso_actual] [decimal](18, 2) NOT NULL,
	[temperatura_actual] [decimal](18, 2) NOT NULL,
	[alarma_peso] [bit] NOT NULL,
	[direccion_ip_entrada] [varchar](15) NOT NULL,
	[puerto_entrada] [int] NOT NULL,
	[direccion_ip_salida] [varchar](15) NULL,
	[puerto_salida] [int] NULL,
	[activo] [bit] NOT NULL,
 CONSTRAINT [PK_id_tunel] PRIMARY KEY CLUSTERED 
(
	[id_tunel] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [IX_codigo_tunel] UNIQUE NONCLUSTERED 
(
	[codigo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  StoredProcedure [dbo].[sp_bascula]    Script Date: 30/9/2022 22:48:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

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
GO
/****** Object:  StoredProcedure [dbo].[sp_bitacora_bascula]    Script Date: 30/9/2022 22:48:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_bitacora_bascula]
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
/****** Object:  StoredProcedure [dbo].[sp_bitacora_tunel]    Script Date: 30/9/2022 22:48:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_bitacora_tunel]
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
/****** Object:  StoredProcedure [dbo].[sp_imprimir_error]    Script Date: 30/9/2022 22:48:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE procedure [dbo].[sp_imprimir_error]
(
	@i_mensaje_error	varchar(300)
)
as
	select @i_mensaje_error as [o_mensaje_error]
	return 0

GO
/****** Object:  StoredProcedure [dbo].[sp_parametro]    Script Date: 30/9/2022 22:48:39 ******/
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


GO
/****** Object:  StoredProcedure [dbo].[sp_reporte_bascula_tunel]    Script Date: 30/9/2022 22:48:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[sp_reporte_bascula_tunel]
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
GO
/****** Object:  StoredProcedure [dbo].[sp_reporte_dashboard]    Script Date: 30/9/2022 22:48:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[sp_reporte_dashboard]
	@i_accion				char(1),
	@i_usuario				varchar(20)	= null,
	@i_id_tunel				int = null,
	@i_fecha_ingreso		datetime = null,
	@i_fecha_salida			datetime = null

AS
BEGIN
	
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
		Fecha_Ingreso		datetime
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
		FROM @tablaCursor c
		JOIN @tablaTemp t
			ON C.Codigo_Tunel = T.Codigo_Tunel
			AND C.Codigo_Bascula = T.Codigo_Bascula
	
	end
END
GO
/****** Object:  StoredProcedure [dbo].[sp_test]    Script Date: 30/9/2022 22:48:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[sp_test]
(
	@i_accion		char(1),
	@i_nombre		varchar(30)
)
as
	declare @t_mensaje_error	varchar(300)

	set	@t_mensaje_error = 'Error jajaja' 
	exec sp_imprimir_error
		@i_mensaje_error = @t_mensaje_error
	return 1

	return 0
GO
/****** Object:  StoredProcedure [dbo].[sp_tunel]    Script Date: 30/9/2022 22:48:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_tunel]
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
	  AND nombre like '%'+ISNULL(@i_nombre, nombre)+'%' 

	  return 1
	end
	return 1
END
GO
USE [master]
GO
ALTER DATABASE [SysShrimp] SET  READ_WRITE 
GO
