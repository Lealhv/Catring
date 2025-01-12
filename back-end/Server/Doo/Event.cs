using System;
using System.Collections.Generic;

namespace Server.Do
{
    public partial class Event
    {
        public int TypeOfEvent { get; set; }
        public string NameOfEvent { get; set; } = null!;
    }
}
