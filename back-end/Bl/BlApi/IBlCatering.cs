using Bl.Bo;

namespace Bl.BlApi
{
    public interface IBlCatering
    {
        public List <BlCatering> ReadAll();
        public BlCatering GetById(int codeCatering);
        public bool Delete(int codeCatering);
        public bool UpDate(BlCatering catering);
        public int Create(BlCatering catering);
    }
}
