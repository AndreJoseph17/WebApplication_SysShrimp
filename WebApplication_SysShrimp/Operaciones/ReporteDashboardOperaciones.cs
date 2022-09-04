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

    public interface IReporteDashboardOperaciones
    {
        Task<IEnumerable<ReporteDashboard>> Consultar(ReporteBasculaTunelRequest request);
    }

    public class ReporteDashboardOperaciones : IReporteDashboardOperaciones
    {
        private readonly string connectionString;
        private readonly string store_procedure;

        public ReporteDashboardOperaciones(IConfiguration configuration)
        {
            connectionString = configuration.GetConnectionString("ConexionSysShrimp");
            store_procedure = Db_Procedures.SpReporteDashboard;
        }
        public async Task<IEnumerable<ReporteDashboard>> Consultar(ReporteBasculaTunelRequest request)
        {
            try
            {
                using var connection = new SqlConnection(connectionString);
                {
                    var fechaI = request.Fecha_Inicio.ToString("yyyyMMdd");
                    var fechaF = request.Fecha_Fin.ToString("yyyyMMdd");

                    var results = await connection.QueryAsync<ReporteDashboard>
                        (store_procedure, new
                        {
                            i_accion = "D",
                            i_id_tunel = request.Id_Tunel,
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
