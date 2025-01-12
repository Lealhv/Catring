using Bl.Bo;

namespace Bl.BlApi
{
    public interface IBlFood
    {
        public List <BlFood> ReadAll();
        public BlFood GetById(int codeFood);
        public bool Delete(int codeFood);
        public bool UpDate(BlFood food);
        public bool Create (BlFood [] food);
    }
}
