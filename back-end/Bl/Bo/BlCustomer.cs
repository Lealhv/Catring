
using Bl.BlApi;

namespace Bl.Bo
{
    public class BlCustomer
    {
        public int CodeCustomer { get; set; }
        public string? NameCustomer { get; set; }
        public string? TelCustomer { get; set; }
        public string? CardCustomer { get; set; }
        public string? FamilyCustomer { get; set;}
        public List<BlFeedBack>? FeedBacks { get; set; }=new List<BlFeedBack>();
        public List<BlOrder>? Orders { get; set; } = new List<BlOrder>();


    }
}
