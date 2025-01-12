using Dal.DalApi;
using Dal.Do;
using Microsoft.EntityFrameworkCore;

namespace Dal.DalImplemention
{
    internal class FeedBackServer : IFeedBack
    {
        private dbcontext db;
        public FeedBackServer(dbcontext db)
        {
            this.db = db;
        }
        public FeedBack Create(FeedBack item)
        {
            try
            {
                var feed = db.FeedBacks.Add(item);
                db.SaveChanges();
                return feed.Entity;
            }
            catch
            { return null; }
        }

        public bool Delete(FeedBack item)
        {
            try
            {
                db.FeedBacks.Remove(item);
                db.SaveChanges();
                return true;
            }
            catch
            { return false; }
        }

        public List<FeedBack> Read(Predicate<FeedBack> filter) =>
        db.FeedBacks.Include(y=> y.CodeCustomerNavigation).ToList().FindAll(x => filter(x));


        public List<FeedBack> ReadAll() =>
             db.FeedBacks.ToList();
    }
}
