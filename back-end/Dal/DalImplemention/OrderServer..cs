using Dal.DalApi;
using Dal.Do;
using Microsoft.EntityFrameworkCore;

namespace Dal.DalImplemention
{
    public class OrderServer : IOrder
    {
        private dbcontext db;
        public OrderServer(dbcontext db)
        {
            this.db = db;
        }
        public int Create(Order item)
        {
            try
            {
                var temp = db.Orders.Add(item);
                db.SaveChanges();
                return temp.Entity.CodeOrder;
            }
            catch
            { db.Remove(item); return -1; }
        }

        public bool Delete(Order item)
        {
            try
            {
                db.Orders.Remove(item);
                db.SaveChanges();
                return true;
            }
            catch
            { return false; }
        }

        public List<Order> Read(Predicate<Order> filter) =>
            db.Orders.Include(y => y.Invents).ToList().FindAll(x => filter(x));

        public List<Order> ReadAll()=>
            db.Orders.Include(x=> x.Invents).ToList();

        public bool Update(Order item)
        {
            try
            {
                int index = db.Orders.ToList().FindIndex(x => x.CodeOrder == item.CodeOrder);
                if (index == -1)
                    throw new Exception("Catering does not exist in DB");
                db.Orders.ToList()[index] = item;
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
