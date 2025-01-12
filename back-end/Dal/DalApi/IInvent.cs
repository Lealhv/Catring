using Dal.Do;

namespace Dal.DalApi
{
    public interface IInvent : Icrud<Invent>
    {
        public bool Create (Invent item, int codeOrder);
    }
}
