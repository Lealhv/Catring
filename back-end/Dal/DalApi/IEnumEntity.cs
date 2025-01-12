using Dal.Do;
using static Dal.Do.EnumFile;

namespace Dal.DalApi
{
    public interface IEnumEntity {
        public List<EnumEntity> ReadAll();
        public bool Delete(EnumEntity item);
        public bool Create(EnumEntity item);

    }
}
