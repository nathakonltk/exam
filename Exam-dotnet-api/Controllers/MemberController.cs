using Microsoft.AspNetCore.Mvc;
using Exam_dotnet_api.Models;

namespace Exam_dotnet_api.Controllers;

[ApiController]
[Route("[controller]")]
public class MemberController : ControllerBase
{
    private readonly ExamContext con_db;
    public MemberController(ExamContext conn_db){
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

    [HttpGet("GetAll")]
    public IActionResult GetAll()
    {
      var member=this.con_db.Members.ToList();
      return Ok(member);
    }
    [HttpGet("GetId/{id}")]
    public IActionResult GetId( string id)
    {
      var member=this.con_db.Members.FirstOrDefault(i=>i.MemId==id);
      return Ok(member);
    }
}
