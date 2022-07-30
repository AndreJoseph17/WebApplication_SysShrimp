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
    public interface ITunelOperaciones
    {
        Task<IEnumerable<Tunel>> Consultar(TunelRequest request);
        Task CrearTunel(Tunel request);
        Task<IEnumerable<Tunel>> Listar();
        Task Editar(Tunel request);
    }

    public class TunelOperaciones : ITunelOperaciones
    {
        private readonly string connectionString;
        private readonly string store_procedure;

        public TunelOperaciones(IConfiguration configuration)
        {
            connectionString = configuration.GetConnectionString("ConexionSysShrimp");

            store_procedure = Db_Procedures.SpTunel;
        }
        public async Task<IEnumerable<Tunel>> Consultar(TunelRequest request)
        {
            try
            {
                using var connection = new SqlConnection(connectionString);
                {
                    var results = await connection.QueryAsync<Tunel>
                        (store_procedure, new
                        {
                            i_accion = "C",
                            i_nombre = request.Nombre,
                            i_codigo = request.Codigo
                        }, commandType: CommandType.StoredProcedure);
                    return results;
                }
            }
            catch (SqlException ex)
            {
                throw ex;
            }
        }

        public async Task CrearTunel(Tunel request)
        {
            try
            {
                using var connection = new SqlConnection(connectionString);
                {
                    var results = await connection.ExecuteAsync
                        (store_procedure, new
                        {
                            i_accion = "I"
                            ,i_codigo            = request.Codigo
                            ,i_nombre            = request.Nombre
                            ,i_cantidad_min_peso = request.Cantidad_Min_Peso
                            ,i_cantidad_max_peso = request.Cantidad_Max_Peso
                            ,i_peso_actual       = request.Peso_Actual
                            ,i_temp_actual       = request.Temperatura_Actual
                            ,i_alarma_peso       = request.Alarma_Peso
                            ,i_direccionIpEntrada= request.Direccion_Ip_Entrada
                            ,i_puerto_entrada    = request.Puerto_Entrada
                            ,i_direccionIpSalida = request.Direccion_Ip_Salida
                            ,i_puerto_salida     = request.Puerto_Salida
                            ,i_activo            = request.Activo
                        }, commandType: CommandType.StoredProcedure);
                }
            }
            catch (SqlException ex)
            {
                throw ex;
            }
        }

        public async Task Editar(Tunel request)
        {
            try
            {
                using var connection = new SqlConnection(connectionString);
                {
                    var results = await connection.ExecuteAsync
                        (store_procedure, new
                        {
                            i_accion = "M"
                            ,i_id_tunel          = request.Id_Tunel 
                            ,i_codigo            = request.Codigo
                            ,i_nombre            = request.Nombre
                            ,i_cantidad_min_peso = request.Cantidad_Min_Peso
                            ,i_cantidad_max_peso = request.Cantidad_Max_Peso
                            ,i_peso_actual       = request.Peso_Actual
                            ,i_temp_actual       = request.Temperatura_Actual
                            ,i_alarma_peso       = request.Alarma_Peso
                            ,i_direccionIpEntrada= request.Direccion_Ip_Entrada
                            ,i_puerto_entrada    = request.Puerto_Entrada
                            ,i_direccionIpSalida = request.Direccion_Ip_Salida
                            ,i_puerto_salida     = request.Puerto_Salida
                            ,i_activo            = request.Activo
                        }, commandType: CommandType.StoredProcedure);
                }
            }
            catch (SqlException ex)
            {
                throw ex;
            }
        }

        public async Task<IEnumerable<Tunel>> Listar()
        {
            try
            {
                using var connection = new SqlConnection(connectionString);
                {
                    return await connection.QueryAsync<Tunel>
                        (store_procedure, new
                        {
                            i_accion = "G",
                        }, commandType: CommandType.StoredProcedure);
                }
            }
            catch (SqlException ex)
            {
                throw ex;
            }
        }
    }
}
