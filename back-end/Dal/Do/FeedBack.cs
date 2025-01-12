using System;
using System.Collections.Generic;

namespace Dal.Do
{
    public partial class FeedBack
    {
        public int Id { get; set; }
        public int? CodeCustomer { get; set; }
        public int CodeCatering { get; set; }
        public string FeedBack1 { get; set; } = null!;

        public virtual Customer? CodeCustomerNavigation { get; set; }
    }
}
