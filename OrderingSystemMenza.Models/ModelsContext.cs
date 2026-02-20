using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;

namespace OrderingSystemMenza.Models
{
    public class ModelsContext(DbContextOptions<ModelsContext> options) : DbContext(options)
    {
        public DbSet<Person> Person { get; set; }
    }
}
