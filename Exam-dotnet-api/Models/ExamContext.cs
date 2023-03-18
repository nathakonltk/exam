using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Exam_dotnet_api.Models;

public partial class ExamContext : DbContext
{
    public ExamContext()
    {
    }

    public ExamContext(DbContextOptions<ExamContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Member> Members { get; set; }
    public virtual DbSet<TblProvince> TblProvince { get; set; }
    public virtual DbSet<TblAmphur> TblAmphur { get; set; }
    public virtual DbSet<TblTumbol> TblTumbol { get; set; }
    public virtual DbSet<TblZipCode> TblZipCode { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder){}
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Member>(entity =>
        {
            entity.HasKey(e => e.MemId).HasName("PK__member__DCE9924D7C35AA52");

            entity.ToTable("member");

            entity.Property(e => e.MemId)
                .HasMaxLength(7)
                .IsUnicode(false)
                .HasColumnName("mem_id");
            entity.Property(e => e.Address)
                .HasMaxLength(200)
                .HasColumnName("address");
            entity.Property(e => e.AmpId)
                .HasMaxLength(4)
                .IsUnicode(false)
                .HasColumnName("amp_id");
            entity.Property(e => e.BirthDate)
                .HasColumnType("date")
                .HasColumnName("birth_date");
            entity.Property(e => e.Email)
                .HasMaxLength(150)
                .HasColumnName("email");
            entity.Property(e => e.FirstName)
                .HasMaxLength(100)
                .HasColumnName("first_name");
            entity.Property(e => e.Imgfile)
                .HasColumnType("ntext")
                .HasColumnName("imgfile");
            entity.Property(e => e.LastName)
                .HasMaxLength(100)
                .HasColumnName("last_name");
            entity.Property(e => e.Nationality)
                .HasMaxLength(100)
                .HasColumnName("nationality");
            entity.Property(e => e.ProvId)
                .HasMaxLength(2)
                .IsUnicode(false)
                .HasColumnName("prov_id");
            entity.Property(e => e.TumId)
                .HasMaxLength(6)
                .IsUnicode(false)
                .HasColumnName("tum_id");
            entity.Property(e => e.Tel)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("tel");
            entity.Property(e => e.TitleId)
                .HasMaxLength(2)
                .IsUnicode(false)
                .HasColumnName("title_id");
            entity.Property(e => e.ZipCode)
                .HasMaxLength(5)
                .IsUnicode(false)
                .HasColumnName("zip_code");
             entity.Property(e => e.SaveDate)
                .HasMaxLength(5)
                .IsUnicode(false)
                .HasColumnName("save_date");
        });

        modelBuilder.Entity<TblAmphur>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("tbl_amphur");

            entity.Property(e => e.AmpId)
                .HasMaxLength(4)
                .IsUnicode(false)
                .HasColumnName("amp_id");
            entity.Property(e => e.AmpName)
                .HasMaxLength(200)
                .IsUnicode(false)
                .HasColumnName("amp_name");
            entity.Property(e => e.ProvId)
                .HasMaxLength(2)
                .IsUnicode(false)
                .HasColumnName("prov_id");
        });

        modelBuilder.Entity<TblProvince>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("tbl_province");

            entity.Property(e => e.DivId)
                .HasMaxLength(1)
                .IsUnicode(false)
                .HasColumnName("div_id");
            entity.Property(e => e.ProvId)
                .HasMaxLength(2)
                .IsUnicode(false)
                .HasColumnName("prov_id");
            entity.Property(e => e.ProvName)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("prov_name");
            entity.Property(e => e.ProvNameEng)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("prov_name_eng");
            entity.Property(e => e.RegId)
                .HasMaxLength(2)
                .IsUnicode(false)
                .HasColumnName("reg_id");
        });

        modelBuilder.Entity<TblTumbol>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("tbl_tumbol");

            entity.Property(e => e.AmpId)
                .HasMaxLength(4)
                .IsUnicode(false)
                .HasColumnName("amp_id");
            entity.Property(e => e.TumId)
                .HasMaxLength(6)
                .IsUnicode(false)
                .HasColumnName("tum_id");
            entity.Property(e => e.TumName)
                .HasMaxLength(200)
                .IsUnicode(false)
                .HasColumnName("tum_name");
        });

        modelBuilder.Entity<TblZipCode>(entity =>
        {
            entity.HasKey(e => new { e.TumId, e.OrderNo }).HasName("PK__tbl_zip___52E8B5A8D8A2D899");

            entity.ToTable("tbl_zip_code");

            entity.Property(e => e.TumId)
                .HasMaxLength(6)
                .HasColumnName("tum_id");
            entity.Property(e => e.OrderNo).HasColumnName("order_no");
            entity.Property(e => e.ZipCode)
                .HasMaxLength(5)
                .HasColumnName("zip_code");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
