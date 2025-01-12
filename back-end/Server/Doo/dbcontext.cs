using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Server.Do
{
    public partial class dbcontext : DbContext
    {
        public dbcontext()
        {
        }

        public dbcontext(DbContextOptions<dbcontext> options)
            : base(options)
        {
        }

        public virtual DbSet<Catering> Caterings { get; set; } = null!;
        public virtual DbSet<Customer> Customers { get; set; } = null!;
        public virtual DbSet<Event> Events { get; set; } = null!;
        public virtual DbSet<Food> Foods { get; set; } = null!;
        public virtual DbSet<HechsherEnum> HechsherEnums { get; set; } = null!;
        public virtual DbSet<Order> Orders { get; set; } = null!;
        public virtual DbSet<TimeOfEvent> TimeOfEvents { get; set; } = null!;
        public virtual DbSet<TypeOfCatering> TypeOfCaterings { get; set; } = null!;
        public virtual DbSet<TypeOfCourse> TypeOfCourses { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Data Source=STD-HASH\\PROGB;Initial Catalog=CateringData;Initial Catalog=CateringData;Integrated Security=True");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Catering>(entity =>
            {
                entity.HasKey(e => e.CodeCatering);

                entity.ToTable("Catering");

                entity.Property(e => e.NameCatering).HasMaxLength(10);

                entity.Property(e => e.NameHechsher).HasMaxLength(10);

                entity.Property(e => e.TypeOfCatering).HasMaxLength(10);
            });

            modelBuilder.Entity<Customer>(entity =>
            {
                entity.HasKey(e => e.CodeCustomer);

                entity.ToTable("Customer");

                entity.Property(e => e.CodeCustomer).ValueGeneratedNever();

                entity.Property(e => e.CardCustomer).HasMaxLength(16);

                entity.Property(e => e.NameCustomer).HasMaxLength(10);

                entity.Property(e => e.TelCustomer).HasMaxLength(10);
            });

            modelBuilder.Entity<Event>(entity =>
            {
                entity.HasKey(e => e.TypeOfEvent);

                entity.ToTable("Event");

                entity.Property(e => e.NameOfEvent).HasMaxLength(10);
            });

            modelBuilder.Entity<Food>(entity =>
            {
                entity.HasKey(e => e.CodeFood);

                entity.ToTable("Food");

                entity.Property(e => e.NameOfFod).HasMaxLength(30);

                entity.Property(e => e.TypeOfCourse).HasMaxLength(10);

                entity.Property(e => e.TypeOfFood).HasMaxLength(10);
            });

            modelBuilder.Entity<HechsherEnum>(entity =>
            {
                entity.HasKey(e => e.CodeHechsher)
                    .HasName("PK_HechsherEnum_1");

                entity.ToTable("HechsherEnum");

                entity.Property(e => e.NameHechsher).HasMaxLength(10);
            });

            modelBuilder.Entity<Order>(entity =>
            {
                entity.HasKey(e => e.CodeOrder);

                entity.ToTable("Order");

                entity.Property(e => e.CountOrder).HasColumnName("countOrder");

                entity.Property(e => e.Date).HasColumnType("date");

                entity.Property(e => e.DateOfOrder).HasColumnType("date");

                entity.Property(e => e.TimeOfEvent).HasMaxLength(10);

                entity.Property(e => e.TypeOfEvent).HasMaxLength(10);
            });

            modelBuilder.Entity<TimeOfEvent>(entity =>
            {
                entity.HasKey(e => e.CodeTimeOfEvent);

                entity.ToTable("TimeOfEvent");

                entity.Property(e => e.TimeOfEvent1)
                    .HasMaxLength(10)
                    .HasColumnName("TimeOfEvent");
            });

            modelBuilder.Entity<TypeOfCatering>(entity =>
            {
                entity.HasKey(e => e.CodeTypeOfCatering)
                    .HasName("PK_TypeOfCatering_1");

                entity.ToTable("TypeOfCatering");

                entity.Property(e => e.TypeOfCatering1)
                    .HasMaxLength(10)
                    .HasColumnName("TypeOfCatering");
            });

            modelBuilder.Entity<TypeOfCourse>(entity =>
            {
                entity.HasKey(e => e.CodeCourse)
                    .HasName("PK_TypeOfCourse_1");

                entity.ToTable("TypeOfCourse");

                entity.Property(e => e.NameCourse).HasMaxLength(10);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
