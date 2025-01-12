using Bl.BlApi;
using Bl.Bo;
using Dal;
using Dal.Do;

namespace Bl.Blimplemention
{
    public class BlOrderServer : IBlOrder
    {
        DalManager dal;
        IBlInvent _iblInvent;
        public BlOrderServer(DalManager manager, IBlInvent invent)
        {
            dal = manager;
            _iblInvent = invent ;
        }
        public BlOrder CastingToBl(Order dalO) {
            BlOrder o = new BlOrder()
            {
                CodeOrder = dalO.CodeOrder,
                CodeCatering = dalO.CodeCatering,
                DateOfOrder = DateTime.Now,
                DateEvent= dalO.DateEvent,
                CountOrder = dalO.CountOrder,
                CodeCustomer = dalO.CodeCustomer,
                TypeOfEvent = dalO.TypeOfEvent,
                TimeOfEvent = dalO.TimeOfEvent, 
            };
            dalO.Invents.ToList().ForEach(x => o.Invents.Add(((BlInventServer)_iblInvent).CastingToBl(x)));

            return o;
        }
        public List<BlOrder> CastListToBl(List<Order> dalOrder) {

            List<BlOrder> lst= new List<BlOrder>();
            dalOrder.ForEach(x => lst.Add(CastingToBl(x)) ) ;
            return lst ;
        }

        public Order CastingToDal(BlOrder blO)
        {
            Order O = new Order()
            {
                CodeOrder = blO.CodeOrder,
                CodeCatering = blO.CodeCatering,
                DateOfOrder = DateTime.Now,
                DateEvent = blO.DateEvent,
                CountOrder = blO.CountOrder,
                CodeCustomer = blO.CodeCustomer,
                TypeOfEvent = blO.TypeOfEvent,
                TimeOfEvent = blO.TimeOfEvent
            };
         return O;
        }

        public List<BlOrder> ReadAll() =>
            CastListToBl(dal.Order.ReadAll());

        public BlOrder GetById(int codeOrder) =>
            CastingToBl(dal.Order.ReadAll().Find(x => x.CodeOrder == codeOrder));

        public bool Delete(int codeOrder) =>
            dal.Order.Delete(dal.Order.ReadAll().Find(x => x.CodeOrder == codeOrder));

        public bool UpDate(BlOrder order)=>
            dal.Order.Update(CastingToDal(order));

        public int Create(BlOrder order) =>
            dal.Order.Create(CastingToDal(order));
    }
}
