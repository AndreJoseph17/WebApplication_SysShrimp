using Dapper;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using WebApplication_SysShrimp.DAO;
using WebApplication_SysShrimp.Models;

namespace WebApplication_SysShrimp.Operaciones
{

    public interface IReporteBasculaTunelOperaciones
    {
        Task<IEnumerable<ReporteBasculaTunel>> Consultar(ReporteBasculaTunelRequest request);
        Task<IEnumerable<ReporteBasculaTunel>> ConsultarPesajeTunel(ReporteBasculaTunelRequest request);
        Task<IEnumerable<ReporteBasculaTunel>> ConsultarPesajeTunelTabla(ReporteBasculaTunelRequest request);
    }

    public class ReporteBasculaTunelOperaciones : IReporteBasculaTunelOperaciones
    {
        private readonly string connectionString;
        private readonly string store_procedure;

        public ReporteBasculaTunelOperaciones(IConfiguration configuration)
        {
            connectionString = configuration.GetConnectionString("ConexionSysShrimp");
            store_procedure = Db_Procedures.SpReportBasculaTunel;
        }
        public async Task<IEnumerable<ReporteBasculaTunel>> Consultar(ReporteBasculaTunelRequest request)
        {
            try
            {
                using var connection = new SqlConnection(connectionString);
                {
                    var fechaI = request.Fecha_Inicio.ToString("yyyyMMdd");
                    var fechaF = request.Fecha_Fin.ToString("yyyyMMdd");

                    var results = await connection.QueryAsync<ReporteBasculaTunel>
                        (store_procedure, new
                        {
                            i_accion = "C",
                            i_id_tunel = request.Id_Tunel,
                            i_id_bascula = request.Id_Bascula,
                            i_fecha_ingreso = fechaI,
                            i_fecha_salida = fechaF
                        }, commandType: CommandType.StoredProcedure);
                    return results;
                }
            }
            catch (SqlException ex)
            {
                throw ex;
            }
        }

        public async Task<IEnumerable<ReporteBasculaTunel>> ConsultarPesajeTunel(ReporteBasculaTunelRequest request)
        {

            try
            {
                using var connection = new SqlConnection(connectionString);
                {
                    var fechaI = request.Fecha_Inicio.ToString("yyyyMMdd");
                    var fechaF = request.Fecha_Fin.ToString("yyyyMMdd");

                    var results = await connection.QueryAsync<ReporteBasculaTunel>
                        (store_procedure, new
                        {
                            i_accion = "D",
                            i_id_tunel = request.Id_Tunel,
                            i_id_bascula = request.Id_Bascula,
                            i_fecha_ingreso = fechaI,
                            i_fecha_salida = fechaF
                        }, commandType: CommandType.StoredProcedure);
                    return results;
                }
            }
            catch (SqlException ex)
            {
                throw ex;
            }
        }

        public async Task<IEnumerable<ReporteBasculaTunel>> ConsultarPesajeTunelTabla (ReporteBasculaTunelRequest request)
        {

            try
            {
                using var connection = new SqlConnection(connectionString);
                {
                    var fechaI = request.Fecha_Inicio.ToString("yyyyMMdd");
                    var fechaF = request.Fecha_Fin.ToString("yyyyMMdd");

                    var results = await connection.QueryAsync<ReporteBasculaTunel>
                        (store_procedure, new
                        {
                            i_accion = "R",
                            i_id_tunel = request.Id_Tunel,
                            i_id_bascula = request.Id_Bascula,
                            i_fecha_ingreso = fechaI,
                            i_fecha_salida = fechaF
                        }, commandType: CommandType.StoredProcedure);
                    return results;
                }
            }
            catch (SqlException ex)
            {
                throw ex;
            }
        }
    }
}
