using Bl.Bo;

namespace Bl.BlApi
{
    public interface IBlOrder
    {
        public List<BlOrder> ReadAll();
        public BlOrder GetById(int codeFood);
        public bool Delete(int codeFood);
        public bool UpDate(BlOrder order);
        public int Create(BlOrder order);
    }
}
