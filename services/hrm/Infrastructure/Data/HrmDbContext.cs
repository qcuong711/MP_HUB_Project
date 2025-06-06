using Microsoft.EntityFrameworkCore;
using HRM.Domain.Entities;

namespace HRM.Infrastructure.Data;

/// <summary>
/// DbContext cho HRM service
/// Quản lý kết nối và mapping với database
/// </summary>
public class HrmDbContext : DbContext
{
    public HrmDbContext(DbContextOptions<HrmDbContext> options) : base(options)
    {
    }
    
    /// <summary>
    /// DbSet cho Employee
    /// </summary>
    public DbSet<Employee> Employees { get; set; }
    
    /// <summary>
    /// DbSet cho Department
    /// </summary>
    public DbSet<Department> Departments { get; set; }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        // Employee configuration
        modelBuilder.Entity<Employee>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.EmployeeCode).IsRequired().HasMaxLength(20);
            entity.Property(e => e.FullName).IsRequired().HasMaxLength(100);
            entity.Property(e => e.Email).IsRequired().HasMaxLength(100);
            entity.Property(e => e.PhoneNumber).HasMaxLength(20);
            entity.Property(e => e.Position).HasMaxLength(50);
            entity.Property(e => e.CreatedBy).HasMaxLength(50);
            entity.Property(e => e.UpdatedBy).HasMaxLength(50);
            
            // Indexes
            entity.HasIndex(e => e.EmployeeCode).IsUnique();
            entity.HasIndex(e => e.Email).IsUnique();
            entity.HasIndex(e => e.DepartmentId);
        });
        
        // Department configuration
        modelBuilder.Entity<Department>(entity =>
        {
            entity.HasKey(d => d.Id);
            entity.Property(d => d.DepartmentCode).IsRequired().HasMaxLength(20);
            entity.Property(d => d.DepartmentName).IsRequired().HasMaxLength(100);
            entity.Property(d => d.Description).HasMaxLength(500);
            entity.Property(d => d.CreatedBy).HasMaxLength(50);
            entity.Property(d => d.UpdatedBy).HasMaxLength(50);
            
            // Self-referencing relationship
            entity.HasOne(d => d.ParentDepartment)
                  .WithMany(d => d.SubDepartments)
                  .HasForeignKey(d => d.ParentDepartmentId)
                  .OnDelete(DeleteBehavior.Restrict);
            
            // One-to-many relationship with Employee
            entity.HasMany(d => d.Employees)
                  .WithOne()
                  .HasForeignKey(e => e.DepartmentId)
                  .OnDelete(DeleteBehavior.SetNull);
            
            // Indexes
            entity.HasIndex(d => d.DepartmentCode).IsUnique();
            entity.HasIndex(d => d.ParentDepartmentId);
        });
    }
} 