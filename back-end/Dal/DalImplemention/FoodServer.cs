using Dal.DalApi;
using Dal.Do;

namespace Dal.DalImplemention
{
    public class FoodServer : IFood
    {
        private dbcontext db;
        
        public FoodServer(dbcontext db)
        {
            this.db = db;
        }
        
        public bool Create(Food item)
        {
            try
            {
                db.Foods.Add(item);
                db.SaveChanges();
                return true;
            }
            catch
            { return false; }
        }

        public bool Delete(Food item)
        {
            try
            {
                db.Foods.Remove(item);
                db.SaveChanges();
                return true;
            }
            catch
            { return false; }
        }

        public List<Food> Read(Predicate<Food> filter)=>
            db.Foods.ToList().FindAll(x => filter(x));

        public List<Food> ReadAll()=>
            db.Foods.ToList();

        public bool Update(Food item)
        {
            try
            {
                int index = db.Foods.ToList().FindIndex(x => x.CodeFood == item.CodeFood);
                if (index == -1)
                    throw new Exception("Catering does not exist in DB");
                db.Foods.ToList()[index] = item;
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
