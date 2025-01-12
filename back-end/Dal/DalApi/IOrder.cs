using Dal.Do;

namespace Dal.DalApi
{
    public interface IOrder : Icrud<Order>
    {
        public int Create(Order item);

    }
}
