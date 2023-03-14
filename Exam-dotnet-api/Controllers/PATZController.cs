using Microsoft.AspNetCore.Mvc;
using Exam_dotnet_api.Models;

namespace Exam_dotnet_api.Controllers;

[ApiController]
[Route("[controller]")]
public class PADZController : ControllerBase
{
    private readonly ExamContext con_db;
    public PADZController(ExamContext conn_db){
        this.con_db=conn_db;
    }
    // private static readonly string[] Summaries = new[]
    // {
    //     "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    // };

    // private readonly ILogger<WeatherForecastController> _logger;

    // public WeatherForecastController(ILogger<WeatherForecastController> logger)
    // {
    //     _logger = logger;
    // }


    //TblProvince
    [HttpGet("Prov/GetAll")]
    public IActionResult ProvGetAll()
    {
      var prov=this.con_db.TblProvince.ToList();
      return Ok(prov);
    }
    [HttpGet("ProvGetId/{id}")]
    public IActionResult ProvGetId( string id)
    {
      var prov=this.con_db.TblProvince.FirstOrDefault(i=>i.ProvId==id);
      return Ok(prov);
    }

    // TblAmphur
    [HttpGet("AmpGetProvId/{ProvId}")]
    public IActionResult AmpGetProvId( string ProvId)
    {
      var amp=this.con_db.TblAmphur.Where(i=>i.ProvId==ProvId);
      return Ok(amp);
    }
    [HttpGet("AmpGetAmpId/{AmpId}")]
    public IActionResult AmpGetAmpId( string AmpId)
    {
      var amp=this.con_db.TblAmphur.Where(i=>i.AmpId==AmpId);
      return Ok(amp);
    }

    // TblTumbol
    [HttpGet("TumbGetAmpId/{AmpId}")]
    public IActionResult TumbGetAmpId( string AmpId)
    {
      var tumb=this.con_db.TblTumbol.Where(i=>i.AmpId==AmpId);
      return Ok(tumb);
    }
    [HttpGet("TumbGetTumId/{TumId}")]
    public IActionResult TumbGetTumId( string TumId)
    {
      var tumb=this.con_db.TblTumbol.Where(i=>i.TumId==TumId);
      return Ok(tumb);
    }

    // TblZipCode
    [HttpGet("ZipCodeGetTumId/{TumId}")]
    public IActionResult ZipCodeGetTumId( string TumId)
    {
      var tumb=this.con_db.TblZipCode.Where(i=>i.TumId==TumId);
      return Ok(tumb);
    }
}
