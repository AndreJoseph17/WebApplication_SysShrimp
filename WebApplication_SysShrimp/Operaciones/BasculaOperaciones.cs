using Dapper;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using WebApplication_SysShrimp.DAO;
using WebApplication_SysShrimp.Models;

namespace WebApplication_SysShrimp.Operaciones
{
    public interface IBasculaOperaciones
    {
        Task<Bascula> Consultar(BasculaRequest request);
        Task CrearBascula(Bascula request);
        Task<IEnumerable<Bascula>> Listar();
        Task Editar(Bascula request);
    }

    public class BasculaOperaciones : IBasculaOperaciones
    {
        private readonly string connectionString;
        private readonly string store_procedure;

        public BasculaOperaciones(IConfiguration configuration)
        {
            connectionString = configuration.GetConnectionString("ConexionSysShrimp");

            store_procedure = Db_Procedures.SpBascula;
        }

        public async Task<IEnumerable<Bascula>>Listar()
        {
            try
            {
                using var connection = new SqlConnection(connectionString);
                {
                    return  await connection.QueryAsync<Bascula>
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

        public async Task<Bascula> Consultar(BasculaRequest request)
        {
            try
            {
                using var connection = new SqlConnection(connectionString);
                {
                    var results = await connection.QueryFirstOrDefaultAsync<Bascula>
                        (store_procedure, new
                        {
                            i_accion = "C",
                            i_codigo_serie = request.Codigo,
                            i_nombre = request.Nombre
                        }, commandType: CommandType.StoredProcedure);
                    return results;
                }
            }
            catch(SqlException ex)
            {
                throw ex;
            }
        }

        public async Task Editar(Bascula request)
        {
            try
            {
                using var connection = new SqlConnection(connectionString);
                {
                    var results = await connection.ExecuteAsync
                        (store_procedure, new
                        {
                            i_accion = "M",
                            i_id_bascula = request.Id_Bascula,
                            i_codigo = request.Codigo,
                            i_nombre = request.Nombre,
                            i_codigo_serie = request.Codigo_Serie,
                            i_direccionIp = request.Direccion_Ip,
                            i_puerto = request.Puerto,
                            i_estado = request.Estado
                        }, commandType: CommandType.StoredProcedure);
                }
            }
            catch (SqlException ex)
            {
                throw ex;
            }
        }

        public async Task CrearBascula(Bascula request)
        {
            try
            {
                using var connection = new SqlConnection(connectionString);
                {
                    var results = await connection.ExecuteAsync
                        (store_procedure, new
                        {
                            i_accion = "I",
                            i_codigo = request.Codigo,
                            i_nombre = request.Nombre,
                            i_codigo_serie = request.Codigo_Serie,
                            i_direccionIp = request.Direccion_Ip,
                            i_puerto = request.Puerto,
                            i_estado = request.Estado
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
