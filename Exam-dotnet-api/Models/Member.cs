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

    public string? TumId { get; set; }

    public string? AmpId { get; set; }

    public string? ProvId { get; set; }

    public string? ZipCode { get; set; }

    public string? Tel { get; set; }

    public string? Email { get; set; }

    public string? Imgfile { get; set; }
}

public partial class MemberJoin
{
    public string MemId { get; set; } = null!;

    public string? TitleId { get; set; }

    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public DateTime? BirthDate { get; set; }

    public string? Nationality { get; set; }

    public string? Address { get; set; }

    public string? TumId { get; set; }
    public string? TumName { get; set; }

    public string? AmpId { get; set; }
    public string? AmpName { get; set; }

    public string? ProvId { get; set; }
    public string? ProvName { get; set; }

    public string? ZipCode { get; set; }

    public string? Tel { get; set; }

    public string? Email { get; set; }

    public string? Imgfile { get; set; }
}

public partial class MemberInsert
{
    public string MemId { get; set; } = null!;

    public string? TitleId { get; set; }

    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public string? BirthDate { get; set; }

    public string? Nationality { get; set; }

    public string? Address { get; set; }

    public string? TumId { get; set; }

    public string? AmpId { get; set; }

    public string? ProvId { get; set; }

    public string? ZipCode { get; set; }

    public string? Tel { get; set; }

    public string? Email { get; set; }

    public string? Imgfile { get; set; }
}