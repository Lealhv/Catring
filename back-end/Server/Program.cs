using Bl;

    var builder = WebApplication.CreateBuilder(args);
    builder.Services.AddSingleton<BlManager>();

    // Add services to the container.
    builder.Services.AddCors(options =>
    {
        options.AddPolicy("CorsPolicy", builder => builder.WithOrigins("http://localhost:3000", "development site")
        .AllowAnyHeader().AllowAnyMethod());
    });
    builder.Services.AddControllers();
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen();

    var app = builder.Build();

    // Configure the HTTP request pipeline.
    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI();
    }

    app.UseHttpsRedirection();
    app.UseAuthorization();
    app.UseCors("CorsPolicy");
    app.UseHttpsRedirection();
    app.UseStaticFiles();
    app.UseAuthorization();
    app.MapControllers();
    app.Run();