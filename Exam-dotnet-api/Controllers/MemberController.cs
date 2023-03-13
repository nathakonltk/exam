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
      var condb=this.con_db;
      var member= ( from m in condb.Members 
                      join p in condb.TblProvince on m.ProvId equals p.ProvId
                      join a in condb.TblAmphur on m.AmpId equals a.AmpId
                      join t in condb.TblTumbol on m.TamId equals t.TumId
                      orderby m.MemId

                      select new MemberJoin
                      {
                        MemId=m.MemId,
                        TitleId=m.TitleId,
                        FirstName=m.FirstName,
                        LastName=m.LastName,
                        BirthDate=m.BirthDate,
                        Nationality=m.Nationality,
                        Address=m.Address,
                        TamId=m.TamId,
                        TumName=t.TumName,
                        AmpId=m.AmpId,
                        AmpName=a.AmpName,
                        ProvId=m.ProvId,
                        ProvName=p.ProvName,
                        ZipCode=m.ZipCode,
                        Tel=m.Tel,
                        Email=m.Email,
                        Imgfile=m.Imgfile
                      }

                  ).ToList();
      // var member=this.con_db.Members.ToList();
      return Ok(member);
    }
    [HttpGet("GetId/{id}")]
    public IActionResult GetId( string id)
    {
      var member=this.con_db.Members.FirstOrDefault(i=>i.MemId==id);
      return Ok(member);
    }
    [HttpDelete("Delete/{id}")]
    public ActionResult Delete(string id){
      var member=this.con_db.Members.FirstOrDefault(i=>i.MemId==id);
      if(member!=null){
        this.con_db.Remove(member);
        this.con_db.SaveChanges();
        return Ok(true);
      }
      return Ok(false);
    }
     [HttpPost("Insert")]
    public ActionResult Insert([FromBody] Member member){
      var res=this.con_db.Members.FirstOrDefault(i=>i.MemId==member.MemId);
      if(res!=null){
        res.MemId=member.MemId;
        res.TitleId=member.TitleId;
        res.FirstName=member.FirstName;
        res.LastName=member.LastName;
        res.Nationality=member.Nationality;
        res.BirthDate=member.BirthDate;
        res.Address=member.Address;
        res.TamId=member.TamId;
        res.AmpId=member.AmpId;
        res.ProvId=member.ProvId;
        res.ZipCode=member.ZipCode;
        res.Tel=member.Tel;
        res.Email=member.Email;
        res.Imgfile=member.Imgfile;

      }else{
        this.con_db.Members.Add(member);
        
      }
      this.con_db.SaveChanges();
      return Ok(true);
    }
    // [HttpPut("Update/{id}")]
    // public ActionResult Update(string id){

    // }
}
