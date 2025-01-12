
namespace Bl.Bo
{
    public class BlOrder
    {
        public int CodeOrder { get; init; }
        public int CodeCatering { get; set; }
        public DateTime DateOfOrder { get; set;}
        public DateTime DateEvent { get; set;}
        public int CountOrder { get; set;}
        public int CodeCustomer { get; set; }
        public string? TypeOfEvent { get; set;}
        public string? TimeOfEvent { get; set; }
        public List<BlInvent>? Invents { get; set; } = new List<BlInvent>();

    }
}
