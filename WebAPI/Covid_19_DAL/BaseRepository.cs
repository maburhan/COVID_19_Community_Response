using System.Configuration;
using System.Data;
using System.Data.SqlServerCe;

namespace Covid_19_DAL
{
  public abstract class BaseRepository
  {
    protected static IDbConnection OpenConnection()
    {
      IDbConnection connection = new SqlCeConnection(ConfigurationManager.ConnectionStrings["IDM"].ConnectionString);
      connection.Open();
      return connection;
    }
  }
}
