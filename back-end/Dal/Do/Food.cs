using System;
using System.Collections.Generic;

namespace Dal.Do
{
    public partial class Food
    {
        public Food()
        {
            Invents = new HashSet<Invent>();
        }

        public int CodeFood { get; set; }
        public int CodeCatering { get; set; }
        public string TypeOfCourse { get; set; } = null!;
        public string TypeOfFood { get; set; } = null!;
        public string? NameOfFod { get; set; }
        public int CountOrder { get; set; }
        public double Price { get; set; }

        public virtual Catering CodeCateringNavigation { get; set; } = null!;
        public virtual ICollection<Invent> Invents { get; set; }
    }
}
