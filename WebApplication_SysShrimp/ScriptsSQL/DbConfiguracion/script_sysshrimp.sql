USE [master]
GO
/****** Object:  Database [SysShrimp]    Script Date: 7/19/2022 7:58:48 PM ******/
CREATE DATABASE [SysShrimp]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'SysShrimp', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\SysShrimp.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'SysShrimp_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\SysShrimp_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
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
ALTER DATABASE [SysShrimp] SET QUERY_STORE = OFF
GO
USE [SysShrimp]
GO
ALTER DATABASE SCOPED CONFIGURATION SET IDENTITY_CACHE = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION SET LEGACY_CARDINALITY_ESTIMATION = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET LEGACY_CARDINALITY_ESTIMATION = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET MAXDOP = 0;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET MAXDOP = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET PARAMETER_SNIFFING = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET PARAMETER_SNIFFING = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET QUERY_OPTIMIZER_HOTFIXES = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET QUERY_OPTIMIZER_HOTFIXES = PRIMARY;
GO
USE [SysShrimp]
GO
/****** Object:  Table [dbo].[tb_bascula]    Script Date: 7/19/2022 7:58:48 PM ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [UK_codigo_bascula] UNIQUE NONCLUSTERED 
(
	[codigo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tb_bitacora_bascula]    Script Date: 7/19/2022 7:58:49 PM ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tb_bitacora_tunel]    Script Date: 7/19/2022 7:58:49 PM ******/
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
 CONSTRAINT [PK_id_bitacora_tunel] PRIMARY KEY CLUSTERED 
(
	[id_bitacora_tunel] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tb_parametro]    Script Date: 7/19/2022 7:58:49 PM ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [UK_codigo_parametro] UNIQUE NONCLUSTERED 
(
	[codigo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tb_tunel]    Script Date: 7/19/2022 7:58:49 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tb_tunel](
	[id_tunel] [int] NOT NULL,
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [IX_codigo_tunel] UNIQUE NONCLUSTERED 
(
	[codigo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  StoredProcedure [dbo].[sp_imprimir_error]    Script Date: 7/19/2022 7:58:49 PM ******/
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
/****** Object:  StoredProcedure [dbo].[sp_parametro]    Script Date: 7/19/2022 7:58:49 PM ******/
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
USE [master]
GO
ALTER DATABASE [SysShrimp] SET  READ_WRITE 
GO
