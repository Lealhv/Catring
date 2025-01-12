using Dal.DalApi;
using Dal.Do;

namespace Dal.DalImplemention
{
    public class EventServer : IEvent
    {
        private dbcontext db;
        public EventServer(dbcontext db)
        {
            this.db =db;
        }
        public EventServer()
        {
            if (this.db == null) db = new dbcontext();
        }
        public bool Create(EnumEntity item)
        {
            try
            {
                db.Events.Add(CastingToEvent(item));
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
                db.Events.Remove(CastingToEvent(item));
                db.SaveChanges();
                return true;
            }
            catch
            { return false; }            
        }

        public List<Event> Read(Predicate<Event> filter)
        {
            return db.Events.ToList().FindAll(x => filter(x));
        }
        public EnumEntity CastingToEnumEntity(Event e)
        {
            EnumEntity ee = new EnumEntity();
            ee.Code = e.TypeOfEvent;
            ee.Typy = e.NameOfEvent;
            return ee;
        }
        public Event CastingToEvent(EnumEntity e)
        {
            Event ee = new ();
            ee.TypeOfEvent = e.Code;
            ee.NameOfEvent = e.Typy;
            return ee;
        }

        public List<EnumEntity> ReadAll()
        {
            List<EnumEntity> list = new List<EnumEntity>();
            db.Events.ToList().ForEach(x => list.Add(CastingToEnumEntity(x)));
            return list;
        }

        public bool Update(Event item)
        {
            try
            {
                int index = db.Events.ToList().FindIndex(x => x.TypeOfEvent == item.TypeOfEvent);
                if (index == -1)
                    throw new Exception("Catering does not exist in DB");
                db.Events.ToList()[index] = item;
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
