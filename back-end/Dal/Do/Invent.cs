using System;
using System.Collections.Generic;

namespace Dal.Do
{
    public partial class Invent
    {
        public int Id { get; set; }
        public int CodeOrder { get; set; }
        public int CodeFood { get; set; }
        public int Count { get; set; }

        public virtual Food CodeFoodNavigation { get; set; } = null!;
        public virtual Order CodeOrderNavigation { get; set; } = null!;
    }
}
