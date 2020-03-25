using Covid_19_BusinessObjects.Hospital;
using Elmah;
using System;
using System.Web.Http;
using Covid_19_Web_API.BusinessLogic;

namespace Covid_19_Web_API.Controllers
{
  public class HomeController : ApiController
  {
    public HomeController()
    {
    }

    [HttpGet]
    public IHttpActionResult UserDetails()
    {
      try
      {
        
        return Ok();
      }
      catch (Exception ex)
      {
        ErrorSignal.FromCurrentContext().Raise(ex);
        return BadRequest("There was an error getting user details. Kestra has been notified of the issue.");
      }
    }   


    [HttpPost]
    public IHttpActionResult SaveHospital([FromBody]Hospital hospital)
    {
      try
      {
        APILogic.SaveHospitals(hospital);
        return Ok(true);
      }
      catch (Exception ex)
      {
        ErrorSignal.FromCurrentContext().Raise(ex);
        return BadRequest("There was an error saving the widget list. Kestra has been notified of the issue.");
      }
    }

   

    [HttpPost]
    public IHttpActionResult MarkAsRead([FromBody]int alertid)
    {
      try
      {
        //return Ok(APILogic.MarkAlertRead(alertid, ActiveUser));
        return Ok();
      }
      catch (Exception ex)
      {
        ErrorSignal.FromCurrentContext().Raise(ex);
        return BadRequest("There was an error when setting the alert as read. Kestra has been notified of the issue.");
      }
    }
   
    //[HttpGet]
    //public async Task<IHttpActionResult> MyBusiness()
    //{
    //  try
    //  {
    //    var result = await APILogic.GetMyBusiness(AppUser, null);
    //    if (result == null)
    //      return BadRequest("There was an error retrieving MyBusiness data");

    //    return Ok(result);
    //  }
    //  catch (Exception ex)
    //  {
    //    ErrorSignal.FromCurrentContext().Raise(ex);
    //    return BadRequest("There was an error retrieving MyBusiness data");
    //  }

    //}

    //[HttpPost]
    //public async Task<IHttpActionResult> MyBusiness(Period period, MeasureType? measure)
    //{
    //  try
    //  {
    //    var result = await APILogic.GetMyBusiness(AppUser, measure, period);
    //    if (result == null)
    //      return BadRequest("There was an error retrieving MyBusiness data");

    //    return Ok(result);
    //  }
    //  catch (Exception ex)
    //  {
    //    ErrorSignal.FromCurrentContext().Raise(ex);
    //    return BadRequest("There was an error retrieving MyBusiness data");
    //  }
    //} 

  }
}
