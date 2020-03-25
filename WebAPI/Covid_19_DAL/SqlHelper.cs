using System;
using System.Configuration;
using System.Data;
using System.Data.SqlServerCe;


namespace Covid_19_DAL
{
  public class SqlHelper
  {
    string connectionString = string.Empty;

    public SqlHelper()
    {
      try
      {
        connectionString = ConfigurationManager.ConnectionStrings["IDM"].ConnectionString;

      }
      catch (Exception)
      {
        //todo error handling  mechanism
        throw;
      }
    }
    public void ExecuteNonQuery(string commandText, CommandType commandType, params SqlCeParameter[] commandParameters)
    {
      using (var connection = new SqlCeConnection(connectionString))
      using (var command = new SqlCeCommand(commandText, connection))
      {
        command.CommandType = commandType;
        command.Parameters.AddRange(commandParameters);
        connection.Open();
        command.ExecuteNonQuery();
      }
    }

    public DataSet ExecuteQuery(string commandText, CommandType commandType, params SqlCeParameter[] parameters)
    {
      using (var connection = new SqlCeConnection(connectionString))
      using (var command = new SqlCeCommand(commandText, connection))
      {
        DataSet ds = new DataSet();
        command.CommandType = commandType;
        command.Parameters.AddRange(parameters);
        SqlCeDataAdapter da = new SqlCeDataAdapter(command);
        da.Fill(ds);
        connection.Close();
        return ds;
      }
    }
  }
}
