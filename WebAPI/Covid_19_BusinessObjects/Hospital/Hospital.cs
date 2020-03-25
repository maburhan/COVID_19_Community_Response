using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Covid_19_BusinessObjects.Hospital
{
  public class Hospital
  {
    public string HospitalName { get; set; }
    public string Address { get; set; }
    public int? StateCityId { get; set; }
    public string PhoneNumber { get; set; }
    public int? IsPrivate { get; set; }
  }
}
