using System;
using System.Collections.Generic;

namespace Exam_dotnet_api.Models;

public partial class Member
{
    public string MemId { get; set; } = null!;

    public string? TitleId { get; set; }

    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public DateTime? BirthDate { get; set; }

    public string? Nationality { get; set; }

    public string? Address { get; set; }

    public string? TamId { get; set; }

    public string? AmpId { get; set; }

    public string? ProvId { get; set; }

    public string? ZipCode { get; set; }

    public string? Tel { get; set; }

    public string? Email { get; set; }

    public string? Imgfile { get; set; }
}
