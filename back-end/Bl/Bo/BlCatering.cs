
namespace Bl.Bo
{
    public class BlCatering
    {
        public int CodeCatering { get; init; }
        public string? TypeOfCatering { get; set; }
        public string? NameCatering { get; set; }
        public string? NameHechsher { get; set; }
        public int? MinimumCount { get; set; }
        public List<BlOrder>? Orders { get; set; } = new List<BlOrder>();
        public List<BlFood>? Foods { get; set; } = new List<BlFood>();

    }
}
