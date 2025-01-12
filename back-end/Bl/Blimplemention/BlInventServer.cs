using Bl.BlApi;
using Bl.Bo;
using Dal;
using Dal.DalApi;
using Dal.Do;

namespace Bl.Blimplemention
{
    public class BlInventServer : IBlInvent
    {
        DalManager dal;
        public BlInventServer(DalManager manager)
        {
            dal = manager;
        }

        public BlInvent CastingToBl(Invent dali)
        {
            BlInvent cu = new BlInvent()
            {
                Id = dali.Id,
                CodeFood = dali.CodeFood,
                CodeOrder = dali.CodeOrder,
                Count = dali.Count,
            };
            return cu;
        }
        public List<BlInvent> CastListToBl(List<Invent> dali)
        {
            List<BlInvent> lst = new List<BlInvent>();
            dali.ForEach(x => lst.Add(CastingToBl(x)));
            return lst;
        }

        public Invent CastingToDal(BlInvent bli)
        {
            Invent ca = new Invent()
            {
                Id = bli.Id,
                CodeFood = bli.CodeFood,
                Count = bli.Count,
                CodeOrder = bli.CodeOrder
            };
            return ca;
        }

        public bool Create(BlInvent [] invent, int codeOrder)
        {
            bool b = true;
            bool b2 = false;
            foreach (var item in invent)
            {
                b2 = dal.Invent.Create(CastingToDal(item), codeOrder);
                if (!b2)
                    b = false;
            }
            return b;
        }

        public bool Delete(int code) =>
              dal.Invent.Delete(dal.Invent.ReadAll().Find(x => x.Id == code));

        public BlInvent GetById(int code) =>
                   CastingToBl(dal.Invent.ReadAll().Find(x => x.CodeOrder == code));

        public List<BlInvent> ReadAll() =>
            CastListToBl(dal.Invent.ReadAll());

        public bool UpDate(BlInvent invent) =>
            dal.Invent.Update(CastingToDal(invent));
    }
}
