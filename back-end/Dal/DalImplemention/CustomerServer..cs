using Dal.DalApi;
using Dal.Do;
using Microsoft.EntityFrameworkCore;

namespace Dal.DalImplemention
{
    public class CustomerServer : ICustomer
    {
        private dbcontext db;
        public CustomerServer(dbcontext db)
        {
            this.db = db;
        }
        public bool Create(Customer item)
        {
            try
            {
                db.Customers.Add(item);
                db.SaveChanges();
                return true;
            }
            catch
            { db.Remove(item); return false;  }
        }

        public bool Delete(Customer item)
        {
            try
            {
                db.Customers.Remove(item);        
                db.SaveChanges();
                return true;
            }
            catch
            { return false; }
        }

        public List<Customer> Read(Predicate<Customer> filter)=>
            db.Customers.Include(y=> y.FeedBacks).ToList().FindAll(x => filter(x));

        public List<Customer> ReadAll()=>   
             db.Customers.Include(x=> x.FeedBacks).Include(x=> x.Orders).ThenInclude(x=> x.Invents).ToList();

        public bool Update(Customer item)
        {
            try
            {
                int index = db.Customers.ToList().FindIndex(x => x.CodeCustomer == item.CodeCustomer);
                if (index == -1)
                    throw new Exception("Customer does not exist in DB");
                Customer c = db.Customers.ToList()[index];
                c.CodeCustomer = item.CodeCustomer;
                c.NameCustomer = item.NameCustomer;
                c.TelCustomer = item.TelCustomer;
                c.CardCustomer = item.CardCustomer;
                c.FemilyCustomer = item.FemilyCustomer;
                db.Customers.ToList()[index] = c;
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
