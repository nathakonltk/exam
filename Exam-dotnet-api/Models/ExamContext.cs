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
            entity.Property(e => e.TamId)
                .HasMaxLength(6)
                .IsUnicode(false)
                .HasColumnName("tam_id");
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
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
