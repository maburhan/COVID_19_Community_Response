using Covid_19_BusinessObjects.Hospital;
using System;
using System.Data;
using System.Data.SqlServerCe;

namespace Covid_19_DAL
{
  public class Covid_19_Hospital_Repository : BaseRepository
  {
    public bool SaveHospital(Hospital hospital)
    {
      try
      {
        using (IDbConnection connection = OpenConnection())
        {
          string commandText = "";
          SqlCeCommand ceCommand = new SqlCeCommand(commandText, (SqlCeConnection)connection);
          ceCommand.ExecuteNonQuery();
        }
      }
      catch (Exception ex)
      {
        throw ex;
      }
      return true;
    }

  }
}
