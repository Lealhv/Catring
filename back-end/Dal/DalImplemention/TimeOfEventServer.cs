using Dal.DalApi;
using Dal.Do;

namespace Dal.DalImplemention
{
    public class TimeOfEventServer : ITimeOfEvent
    {
        private dbcontext db;
        public TimeOfEventServer(dbcontext db)
        {
            this.db = db;
        }
        public TimeOfEventServer()
        {
            if (this.db == null) db = new dbcontext();
        }
        public bool Create(EnumEntity item)
        {
            try
            {
                db.TimeOfEvents.Add(CastingToTimeOfEvent(item));
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
                db.TimeOfEvents.Remove(CastingToTimeOfEvent(item));
                db.SaveChanges();
                return true;
            }
            catch
            { return false; }
        }

        public List<TimeOfEvent> Read(Predicate<TimeOfEvent> filter)
        {
            return db.TimeOfEvents.ToList().FindAll(x => filter(x));
        }

        public EnumEntity CastingToEnumEntity(TimeOfEvent e)
        {
            EnumEntity ee = new EnumEntity();
            ee.Code = e.CodeTimeOfEvent;
            ee.Typy = e.TimeOfEvent1;
            return ee;
        }

        public TimeOfEvent CastingToTimeOfEvent(EnumEntity e)
        {
            TimeOfEvent t = new ();
            t.CodeTimeOfEvent = e.Code;
            t.TimeOfEvent1 = e.Typy;
            return t;
        }

        public List<EnumEntity> ReadAll()
        {
            List<EnumEntity> list = new List<EnumEntity>();
            db.TimeOfEvents.ToList().ForEach(x => list.Add(CastingToEnumEntity(x)));
            return list;
        }

        public bool Update(TimeOfEvent item)
        {
            try
            {
                int index = db.TimeOfEvents.ToList().FindIndex(x => x.CodeTimeOfEvent == item.CodeTimeOfEvent);
                if (index == -1)
                    throw new Exception("Catering does not exist in DB");
                db.TimeOfEvents.ToList()[index] = item;
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
