using System;
using System.Collections.Generic;
using System.Text;

namespace OrderingSystemMenza.Models
{
    internal class Student : Person
    {
        public required string StudyProgram { get; set; }
        public int yearOfStudy { get; set; }

    }
}
