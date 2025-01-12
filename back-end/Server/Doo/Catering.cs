using System;
using System.Collections.Generic;

namespace Server.Do
{
    public partial class Catering
    {
        public int CodeCatering { get; set; }
        public string TypeOfCatering { get; set; } = null!;
        public string NameCatering { get; set; } = null!;
        public string NameHechsher { get; set; } = null!;
        public int? MinimumCount { get; set; }
    }
}
