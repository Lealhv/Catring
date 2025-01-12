using Bl.Bo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.BlApi
{
    public interface IBlInvent
    {         
        public List<BlInvent> ReadAll();
        public BlInvent GetById(int code);
        public bool Create(BlInvent [] invent, int codeOrder);
        public bool UpDate(BlInvent invent);
        public bool Delete(int code);
    }
}
