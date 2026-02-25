var builder = DistributedApplication.CreateBuilder(args);

var postsgres = builder.AddPostgres("postgres")
                 .WithDataVolume()
                 .WithLifetime(ContainerLifetime.Persistent);

var postgresdb = postsgres.AddDatabase("postgresdb");

builder.AddProject<Projects.OrderingSystemMenza_DbManager>("ordering-system-Menza-dbmanager")
       .WithReference(postgresdb)
       .WithHttpCommand("reset-db", "Reset Database")
       .WaitFor(postgresdb);

builder.Build().Run();