using Dal.DalApi;
using Dal.Do;

namespace Dal.DalImplemention
{
    public class TypeOfCourseServer : ITypeOfCourse
    {
        private dbcontext db;
        public TypeOfCourseServer(dbcontext db)
        {
            this.db = db;
        }
        public TypeOfCourseServer()
        {
            if (this.db == null) db = new dbcontext();
        }
        public bool Create(EnumEntity item)
        {
            try
            {
                db.TypeOfCourses.Add(CastingToTypeOfCourse(item));
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
                db.TypeOfCourses.Remove(CastingToTypeOfCourse(item));
                db.SaveChanges();
                return true;
            }
            catch
            { return false; }
        }

        public List<TypeOfCourse> Read(Predicate<TypeOfCourse> filter)
        {
            return db.TypeOfCourses.ToList().FindAll(x => filter(x));
        }

        public EnumEntity CastingToEnumEntity(TypeOfCourse e)
        {
            EnumEntity ee = new EnumEntity();
            ee.Code = e.CodeCourse;
            ee.Typy = e.NameCourse;
            return ee;
        }
        public TypeOfCourse CastingToTypeOfCourse(EnumEntity e)
        {
            TypeOfCourse t = new ();
            t.CodeCourse = e.Code;
            t.NameCourse = e.Typy;
            return t;
        }

        public List<EnumEntity> ReadAll()
        {
            List<EnumEntity> list = new List<EnumEntity>();
            db.TypeOfCourses.ToList().ForEach(x => list.Add(CastingToEnumEntity(x)));
            return list;
        }

        public bool Update(TypeOfCourse item)
        {
            try
            {
                int index = db.TypeOfCourses.ToList().FindIndex(x => x.CodeCourse == item.CodeCourse);
                if (index == -1)
                    throw new Exception("Catering does not exist in DB");
                db.TypeOfCourses.ToList()[index] = item;
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
