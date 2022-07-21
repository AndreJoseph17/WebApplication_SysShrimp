using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using WebApplication_SysShrimp.Models;

namespace WebApplication_SysShrimp.DAO
{
    public class DBOperator
    {
        public string ConnectioString { get; set; }
        public string ProcedureName { get; set; }
        public List<DBParameter> DBParameters { get; set; }

        public DBOperator()
        {
            
        }

        public DBResponse Execute()
        {
            DBResponse dbResponse = null;
            DataSet dsResponse = null;

            SqlConnection connection = null;
            SqlCommand command = null;
            SqlDataAdapter adapter = null;

            string errorMessage = string.Empty;
            bool bReturn = false;

            List<OutputParameter> list = null;

            try
            {
                dbResponse = new DBResponse();

                connection = new SqlConnection(this.ConnectioString);
                command = new SqlCommand(this.ProcedureName, connection);
                command.CommandType = CommandType.StoredProcedure;

                if (this.DBParameters != null && this.DBParameters.Count > 0)
                {
                    foreach (DBParameter dbParameter in this.DBParameters)
                    {
                        if (dbParameter.ParameterDirection == DBParameterDirection.OutPut)
                        {
                            if (list == null)
                                list = new List<OutputParameter>();

                            if (dbParameter.Size != 0)
                                command.Parameters.Add(dbParameter.Parameter, dbParameter.SqlDbType, dbParameter.Size).Direction = System.Data.ParameterDirection.Output;
                            else
                                command.Parameters.Add(dbParameter.Parameter, dbParameter.SqlDbType).Direction = System.Data.ParameterDirection.Output;

                            OutputParameter op = new OutputParameter();
                            op.Parameter = dbParameter.Parameter.ToLower();
                            list.Add(op);
                        }
                        else
                        {
                            if (dbParameter.ParameterDirection == DBParameterDirection.InPut)
                            {
                                if (dbParameter.Size != 0)
                                    command.Parameters.Add(dbParameter.Parameter, dbParameter.SqlDbType, dbParameter.Size).Value = dbParameter.Data == null ? DBNull.Value : dbParameter.Data;
                                else
                                    command.Parameters.Add(dbParameter.Parameter, dbParameter.SqlDbType).Value = dbParameter.Data == null ? DBNull.Value : dbParameter.Data;
                            }
                        }
                    }
                }
                command.Parameters.Add("@Returned", SqlDbType.Int, 0).Direction = System.Data.ParameterDirection.ReturnValue;
                connection.Open();
                adapter = new SqlDataAdapter(command);
                dsResponse = new DataSet();
                adapter.Fill(dsResponse);
                if (list != null)
                    if (list.Count > 0)
                    {
                        foreach (OutputParameter op in list)
                        {
                            string parameterName = op.Parameter;
                            object obj = command.Parameters.Contains(parameterName) == true ? command.Parameters[parameterName].Value : null;
                            op.Data = obj;
                        }
                    }
                bReturn = (int)command.Parameters["@Returned"].Value == 0 ? true : false;
                if (bReturn)
                    errorMessage = "OK";
                else
                {
                    if (dsResponse != null)
                        if (dsResponse.Tables.Count > 0)
                        {
                            foreach (DataTable table in dsResponse.Tables)
                            {
                                if (table != null)
                                    if (table.Columns.Contains("t_mensaje_error"))
                                    {
                                        if (table.Rows.Count > 0)
                                            errorMessage = table.Rows[0]["t_mensaje_error"].ToString();
                                        else
                                            errorMessage = "ERROR GENERAL - PROCEDIMIENTO [" + this.ProcedureName + "]";
                                    }
                            }
                        }
                }
            }
            catch (SqlException ex)
            {
                errorMessage = ex.ErrorCode + ": " + ex.Message;
                dsResponse = null;
                list = null;
                bReturn = false;
            }
            catch (Exception ex)
            {
                errorMessage = ex.Message;
                dsResponse = null;
                list = null;
                bReturn = false;
            }
            finally
            {
                if (connection != null)
                    connection.Close();
                if (command != null)
                    command.Dispose();
                if (adapter != null)
                    adapter.Dispose();

                dbResponse.DsResponse = dsResponse;
                dbResponse.ErrorMessage = errorMessage;
                dbResponse.BReturn = bReturn;
                dbResponse.ListOutputParameter = list;
            }
            return dbResponse;
        }
    }
}
