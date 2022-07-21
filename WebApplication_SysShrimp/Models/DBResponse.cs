using System.Collections.Generic;
using System.Data;

namespace WebApplication_SysShrimp.Models
{
    public class DBResponse
    {
        private bool p_BReturn = false;
        private string p_ErrorMessage = string.Empty;
        private DataSet p_DsResponse = null;
        private List<OutputParameter> p_ListOutputParameter = null;

        public bool BReturn
        {
            set { this.p_BReturn = value; }
            get { return this.p_BReturn; }
        }

        public string ErrorMessage
        {
            set { this.p_ErrorMessage = value; }
            get { return this.p_ErrorMessage; }
        }

        public DataSet DsResponse
        {
            set { this.p_DsResponse = value; }
            get { return this.p_DsResponse; }
        }

        public List<OutputParameter> ListOutputParameter
        {
            set { this.p_ListOutputParameter = value; }
            get { return this.p_ListOutputParameter; }
        }

        public DBResponse()
        {

        }

        public DBResponse(bool bReturn, string exceptionMessage, DataSet dsResponse)
        {
            this.p_BReturn = bReturn;
            this.p_ErrorMessage = exceptionMessage;
            this.p_DsResponse = dsResponse;
        }
    }

    public class OutputParameter
    {
        public string Parameter { get; set; }
        public object Data { get; set; }
    }
}
