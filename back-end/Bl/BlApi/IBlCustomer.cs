using Bl.Bo;

namespace Bl.BlApi
{
    public interface IBlCustomer
    {
        public List<BlCustomer> ReadAll();
        public BlCustomer GetById(int customerId);
        public bool Delete(int customerId);
        public bool UpDate(BlCustomer customer);
        public bool Create(BlCustomer customer);
    }
}
