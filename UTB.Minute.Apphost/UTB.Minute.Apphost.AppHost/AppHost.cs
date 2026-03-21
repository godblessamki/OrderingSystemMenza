var builder = DistributedApplication.CreateBuilder(args);

builder.AddProject<Projects.UTB_Minute_WebApi>("utb-minute-webapi");

builder.Build().Run();
