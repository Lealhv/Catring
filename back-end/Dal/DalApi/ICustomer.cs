using Dal.Do;

namespace Dal.DalApi
{
    public interface ICustomer : Icrud<Customer>
    {
        public bool Create(Customer item);

    }
}
