using Dal.DalApi;
using Dal.Do;

namespace Dal.DalImplemention
{
    public class HechsherEnumServer :IHechsherEnum
    {
        private dbcontext db;
        public HechsherEnumServer(dbcontext db)
        {
            this.db = db;
        }
        public HechsherEnumServer()
        {
            if(this.db == null) db=new dbcontext();
        }
        public bool Create(EnumEntity item)
        {
            try
            {
                db.HechsherEnums.Add(CastingToHechsherEnum(item));
                db.SaveChanges();
                return true;
            }
            catch
            { db.Remove(item); return false; }
        }

        public bool Delete(EnumEntity item)
        {
            try
            {
                db.HechsherEnums.Remove(CastingToHechsherEnum(item));
                db.SaveChanges();
                return true;
            }
            catch
            { return false; }
        }

        public List<HechsherEnum> Read(Predicate<HechsherEnum> filter)
        {
            return db.HechsherEnums.ToList().FindAll(x => filter(x));
        }

        public EnumEntity CastingToEnumEntity(HechsherEnum e)
        {
            EnumEntity ee = new EnumEntity();
            ee.Code = e.CodeHechsher;
            ee.Typy = e.NameHechsher;
            return ee;
        }

        public HechsherEnum CastingToHechsherEnum(EnumEntity e)
        {
            HechsherEnum h = new ();
            h.CodeHechsher = e.Code;
            h.NameHechsher = e.Typy;
            return h;
        }

        public List<EnumEntity> ReadAll()
        {
            List<EnumEntity> list = new List<EnumEntity>();
            db.HechsherEnums.ToList().ForEach(x => list.Add(CastingToEnumEntity(x)));
            return list;
        }

        public bool Update(HechsherEnum item)
        {
            try
            {
                int index = db.HechsherEnums.ToList().FindIndex(x => x.CodeHechsher == item.CodeHechsher);
                if (index == -1)
                    throw new Exception("Catering does not exist in DB");
                db.HechsherEnums.ToList()[index] = item;
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
