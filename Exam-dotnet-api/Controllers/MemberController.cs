using Microsoft.AspNetCore.Mvc;
using Exam_dotnet_api.Models;

namespace Exam_dotnet_api.Controllers;

[ApiController]
[Route("[controller]")]
public class MemberController : ControllerBase
{
    private readonly ExamContext con_db;
     private bool _status = false;
    private string _message = "";
    private string _error = "";
    public MemberController(ExamContext conn_db){
        this.con_db=conn_db;       
    }
   

    [HttpGet("GetAll")]
    public IActionResult GetAll()
    {
      try
      {
        var condb=this.con_db;
        var member= ( from m in condb.Members 
                        join p in condb.TblProvince on m.ProvId equals p.ProvId
                        join a in condb.TblAmphur on m.AmpId equals a.AmpId
                        join t in condb.TblTumbol on m.TumId equals t.TumId
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
                          TumId=m.TumId,
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
        if (member != null && member.Count > 0)
        {
          _status = true;
          _message = "";
        }else{
          _status = false;
          _message = "ไม่พบข้อมูล";
        }
        return StatusCode(200, new { status = _status, message = _message, error = _error, results = member });
      }catch(Exception ex){
        return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
      }
    }



    [HttpGet("GetId/{id}")]
    public IActionResult GetId( string id)
    {
      try{        
        var member=this.con_db.Members.FirstOrDefault(i=>i.MemId==id);
        if (member != null )
        {
          _status = true;
          _message = "";
        }else{
          _status = false;
          _message = "ไม่พบข้อมูล";
        }
        return StatusCode(200, new { status = _status, message = _message, error = _error, results = member });
      }catch(Exception ex){
        return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
      }
    }



    [HttpDelete("Delete/{id}")]
    public ActionResult Delete(string id){
      try{ 
        var member=this.con_db.Members.FirstOrDefault(i=>i.MemId==id);
        if(member!=null){
          this.con_db.Remove(member);
          this.con_db.SaveChanges();
          _status = true;
          _message = "ลบข้อมูลสำเร็จ";
        }else{
          _status = false;
          _message = "ไม่พบข้อมูล";
        }
       return StatusCode(200, new { status = _status, message = _message, error = _error, results = member });
      }catch(Exception ex){
        return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
      }
    }



     [HttpPost("Insert")]
    public ActionResult Insert([FromBody] Member member){
      try{
        var res=this.con_db.Members.FirstOrDefault(i=>i.MemId==member.MemId);
        if(res!=null){
          res.MemId=member.MemId;
          res.TitleId=member.TitleId;
          res.FirstName=member.FirstName;
          res.LastName=member.LastName;
          res.Nationality=member.Nationality;
          res.BirthDate=Convert.ToDateTime(member.BirthDate);
          res.Address=member.Address;
          res.TumId=member.TumId;
          res.AmpId=member.AmpId;
          res.ProvId=member.ProvId;
          res.ZipCode=member.ZipCode;
          res.Tel=member.Tel;
          res.Email=member.Email;
          res.Imgfile=member.Imgfile;
        
        }else{
          //this.con_db.Members.Add(member);
          
        }
        this.con_db.SaveChanges();
        _status = true;
        _message = "บันทึกข้อมูลสำเร็จ";
       return StatusCode(200, new { status = _status, message = _message, error = _error, results = member });
      }catch(Exception ex){
        return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
      }
    }
}
