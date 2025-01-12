using Dal.DalApi;
using Dal.Do;

namespace Dal.DalImplemention
{
    public class TypeOfCateringServer : ITypeOfCatering 
    {
        private dbcontext db;
        public TypeOfCateringServer(dbcontext db)
        {
            this.db = db;
        }
        public TypeOfCateringServer()
        {
            if (this.db == null) db = new dbcontext();
        }
        public bool Create(EnumEntity item)
        {
            try
            {
                db.TypeOfCaterings.Add(CastingToTypeOfCatering(item));
                db.SaveChanges();
                return true;
            }
            catch
            { return false; }
           
        }

        public bool Delete(EnumEntity item)
        {
            try
            {
                db.TypeOfCaterings.Remove(CastingToTypeOfCatering(item));
                db.SaveChanges();
                return true;
            }
            catch
            { return false; }
        }

        public List<TypeOfCatering> Read(Predicate<TypeOfCatering> filter)
        {
            return db.TypeOfCaterings.ToList().FindAll(x => filter(x));
        }

        public EnumEntity CastingToEnumEntity(TypeOfCatering e)
        {
            EnumEntity ee = new EnumEntity();
            ee.Code = e.CodeTypeOfCatering;
            ee.Typy = e.TypeOfCatering1;
            return ee;
        }
        public TypeOfCatering CastingToTypeOfCatering(EnumEntity e)
        {
            TypeOfCatering t = new ();
            t.CodeTypeOfCatering = e.Code;
            t.TypeOfCatering1 = e.Typy;
            return t;
        }

        public List<EnumEntity> ReadAll()
        {
            List<EnumEntity> list = new List<EnumEntity>();
            db.TypeOfCaterings.ToList().ForEach(x => list.Add(CastingToEnumEntity(x)));
            return list;
        }

        public bool Update(TypeOfCatering item)
        {
            try
            {
                int index = db.TypeOfCaterings.ToList().FindIndex(x => x.CodeTypeOfCatering == item.CodeTypeOfCatering);
                if (index == -1)
                    throw new Exception("Catering does not exist in DB");
                db.TypeOfCaterings.ToList()[index] = item;
                db.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }
       
    }
}
