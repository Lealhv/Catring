using System;
using System.Collections.Generic;

namespace Server.Do
{
    public partial class Order
    {
        public int CodeOrder { get; set; }
        public int CodeCatering { get; set; }
        public DateTime? DateOfOrder { get; set; }
        public DateTime Date { get; set; }
        public int CountOrder { get; set; }
        public int CodeCustomer { get; set; }
        public string TypeOfEvent { get; set; } = null!;
        public string TimeOfEvent { get; set; } = null!;
    }
}
