
using Microsoft.AspNetCore.Http;

namespace Bl.Bo
{
    public class BlFood
    {
        public int CodeFood { get; init; }
        public int CodeCatering { get; set; }
        public string? TypeOfCourse { get; set;}
        public string? TypeOfFood { get; set;}
        public string? NameOfFood { get; set;}
        public double Price { get; set; }
    }
}
