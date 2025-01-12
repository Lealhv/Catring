using System;
using System.Collections.Generic;

namespace Dal.Do
{
    public partial class Customer
    {
        public Customer()
        {
            FeedBacks = new HashSet<FeedBack>();
            Orders = new HashSet<Order>();
        }

        public int CodeCustomer { get; set; }
        public string? NameCustomer { get; set; }
        public string TelCustomer { get; set; } = null!;
        public string CardCustomer { get; set; } = null!;
        public string? FemilyCustomer { get; set; }

        public virtual ICollection<FeedBack> FeedBacks { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
    }
}
