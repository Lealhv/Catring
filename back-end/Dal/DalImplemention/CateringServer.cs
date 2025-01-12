using Dal.DalApi;
using Dal.Do;
using Microsoft.EntityFrameworkCore;

namespace Dal.DalImplemention
{
    public class CateringServer : ICatering
    {
        private dbcontext db;
        public CateringServer(dbcontext db)
        {
            this.db = db;   
        }
        public int Create(Catering item)
        {
            try
            {
                var code= db.Caterings.Add(item);
                db.SaveChanges();
                return code.Entity.CodeCatering;
            }
            catch
            { return -1; }
        }

        public bool Delete(Catering item)
        {
            try
            {
                db.Caterings.Remove(item);
                db.SaveChanges();
                return true;
            }
            catch
            { return false; }
        }

        public List<Catering> Read(Predicate<Catering> filter)=>
            db.Caterings.ToList().FindAll(x => filter(x));


        public List<Catering> ReadAll()=>
             db.Caterings.Include(x=> x.Foods).Include(x=> x.Orders).ThenInclude(y=> y.Invents).ToList();

        public bool Update(Catering item)
        {
            try
            {
                int index = db.Caterings.ToList().FindIndex(x => x.CodeCatering == item.CodeCatering);
                if (index == -1)
                    throw new Exception("Catering does not exist in DB");
                Catering c = db.Caterings.ToList()[index];
                c.CodeCatering = item.CodeCatering;
                c.NameCatering = item.NameCatering;
                c.NameHechsher = item.NameHechsher;
                c.TypeOfCatering = item.TypeOfCatering;
                c.MinimumCount = item.MinimumCount;  
                db.Caterings.ToList()[index] = c;
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


