using System.Data;

namespace WebApplication_SysShrimp.Models
{
    public class DBParameter
    {
        private string p_Parameter = string.Empty;
        private object p_Data = null;
        private int p_Size = 0;
        private SqlDbType p_Type = SqlDbType.Int;
        private DBParameterDirection p_ParameterDirection = DBParameterDirection.InPut;

        public string Parameter
        {
            set { this.p_Parameter = value; }
            get { return p_Parameter; }
        }

        public object Data
        {
            set { this.p_Data = value; }
            get { return p_Data; }
        }

        public int Size
        {
            set { this.p_Size = value; }
            get { return p_Size; }
        }

        public SqlDbType SqlDbType
        {
            set { this.p_Type = value; }
            get { return p_Type; }
        }

        public DBParameterDirection ParameterDirection
        {
            set { this.p_ParameterDirection = value; }
            get { return p_ParameterDirection; }
        }

        public DBParameter()
        { }

        public DBParameter(string parameter, object data, SqlDbType sqlDbType, int size, DBParameterDirection parameterDirection)
        {
            this.p_Parameter = parameter;
            this.p_Data = data;
            this.p_Size = size;
            this.p_Type = sqlDbType;
            this.p_ParameterDirection = parameterDirection;
        }
    }
}
