using System;
using System.Collections.Generic;

namespace Server.Do
{
    public partial class Food
    {
        public int CodeFood { get; set; }
        public int CodeCatering { get; set; }
        public string TypeOfCourse { get; set; } = null!;
        public string TypeOfFood { get; set; } = null!;
        public string? NameOfFod { get; set; }
    }
}
