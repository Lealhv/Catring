using System;
using System.Collections.Generic;

namespace Server.Do
{
    public partial class Customer
    {
        public int CodeCustomer { get; set; }
        public string? NameCustomer { get; set; }
        public string TelCustomer { get; set; } = null!;
        public string CardCustomer { get; set; } = null!;
    }
}
