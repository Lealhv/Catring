using Dal.Do;

namespace Dal.DalApi
{
    public interface ICatering : Icrud<Catering>
    {
        public int Create(Catering item);

    }
}
