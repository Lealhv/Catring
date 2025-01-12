using Dal.DalApi;
using Dal.Do;

namespace Dal.DalImplemention
{
    internal class InventServer : IInvent
    {
        private dbcontext db;
        public InventServer(dbcontext db)
        {
            this.db = db;
        }
        public bool Create(Invent item, int codeOrder)
        {
           item.CodeOrder = codeOrder;
           try
            {
                db.Invents.Add(item);
                db.SaveChanges();
                return true;
            }
            catch
            { return false; }
        }

        public bool Delete(Invent item)
        {
            try
            {
                db.Invents.Remove(item);
                db.SaveChanges();
                return true;
            }
            catch
            { return false; }
        }

        public List<Invent> Read(Predicate<Invent> filter) =>
            db.Invents.ToList().FindAll(x => filter(x));


        public List<Invent> ReadAll() =>
             db.Invents.ToList();

        public bool Update(Invent item)
        {
            try
            {
                int index = db.Invents.ToList().FindIndex(x => x.CodeOrder == item.CodeOrder);
                if (index == -1)
                    throw new Exception("Catering does not exist in DB");
                db.Invents.ToList()[index] = item;
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
