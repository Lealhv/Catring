using Dal.Do;

namespace Dal.DalApi
{
    public interface IFood : Icrud<Food>
    {
        public bool Create(Food item);

    }
}
