using System;
using System.Collections.Generic;

namespace Dal.Do
{
    public partial class Catering
    {
        public Catering()
        {
            Foods = new HashSet<Food>();
            Orders = new HashSet<Order>();
        }

        public int CodeCatering { get; set; }
        public string TypeOfCatering { get; set; } = null!;
        public string NameCatering { get; set; } = null!;
        public string NameHechsher { get; set; } = null!;
        public int? MinimumCount { get; set; }
        public int? CountInvents { get; set; }

        public virtual ICollection<Food> Foods { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
    }
}
