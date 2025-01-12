using System;
using System.Collections.Generic;

namespace Dal.Do
{
    public partial class Order
    {
        public Order()
        {
            Invents = new HashSet<Invent>();
        }

        public int CodeOrder { get; set; }
        public int CodeCatering { get; set; }
        public DateTime? DateOfOrder { get; set; }
        public DateTime DateEvent { get; set; }
        public int CountOrder { get; set; }
        public int CodeCustomer { get; set; }
        public string TypeOfEvent { get; set; } = null!;
        public string TimeOfEvent { get; set; } = null!;

        public virtual Catering CodeCateringNavigation { get; set; } = null!;
        public virtual Customer CodeCustomerNavigation { get; set; } = null!;
        public virtual ICollection<Invent> Invents { get; set; }
    }
}
