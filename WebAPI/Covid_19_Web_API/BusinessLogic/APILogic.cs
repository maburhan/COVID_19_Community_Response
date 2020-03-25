using Covid_19_BusinessObjects.Hospital;
using Covid_19_DAL;

namespace Covid_19_Web_API.BusinessLogic
{
  public static class APILogic
  {
    private static Covid_19_Hospital_Repository repository = new Covid_19_Hospital_Repository();

    public static bool SaveHospitals(Hospital hospitals)
    {
      return repository.SaveHospital(hospitals);
    }

  }
}
