using Dal.DalApi;
using Dal.Do;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.DalImplemention
{

    public class TypeOfFoodServer : ITypeOffood
    {
        private dbcontext db;
        public TypeOfFoodServer(dbcontext db)
        {
            this.db = db;
        }
        public TypeOfFoodServer()
        {
            if (this.db == null) db = new dbcontext();
        }
        public bool Create(EnumEntity item)
        {
            try
            {
                db.TypeOfFoods.Add(CastingToTypeOfFood(item));
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
                db.TypeOfFoods.Remove(CastingToTypeOfFood(item));
                db.SaveChanges();
                return true;
            }
            catch
            { return false; }
        }

        public List<TypeOfFood> Read(Predicate<TypeOfFood> filter)
        {
            return db.TypeOfFoods.ToList().FindAll(x => filter(x));
        }

        public EnumEntity CastingToEnumEntity(TypeOfFood e)
        {
            EnumEntity ee = new EnumEntity();
            ee.Code = e.Id;
            ee.Typy = e.TypeOfFood1;
            return ee;
        }
        public TypeOfFood CastingToTypeOfFood(EnumEntity e)
        {
            TypeOfFood t = new();
            t.Id = e.Code;
            t.TypeOfFood1 = e.Typy;
            return t;
        }

        public List<EnumEntity> ReadAll()
        {
            List<EnumEntity> list = new List<EnumEntity>();
            db.TypeOfFoods.ToList().ForEach(x => list.Add(CastingToEnumEntity(x)));
            return list;
        }

        public bool Update(TypeOfFood item)
        {
            try
            {
                int index = db.TypeOfFoods.ToList().FindIndex(x => x.Id == item.Id);
                if (index == -1)
                    throw new Exception("Food does not exist in DB");
                db.TypeOfFoods.ToList()[index] = item;
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
