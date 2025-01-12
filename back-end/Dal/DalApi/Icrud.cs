
namespace Dal.DalApi
{
    public interface Icrud<T>
    {       
        public List<T> Read(Predicate<T> filter);
        public List<T> ReadAll();
        public bool Update(T item);
        public bool Delete(T item);
    }
}
