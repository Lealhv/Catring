using Bl.BlApi;
using Bl.Bo;
using Dal;
using Dal.Do;

namespace Bl.Blimplemention
{
    public class BlCustomerServer : IBlCustomer
    {
        DalManager dal;
        IBlFeedBack _iblFeedback;
        IBlOrder _order;
        public BlCustomerServer(DalManager manager, IBlFeedBack iblfeedback, IBlOrder order)
        {
            dal = manager;
            _iblFeedback = iblfeedback;
            _order = order;
        }

        public BlCustomer CastingToBl(Customer dalCu)
        {
            BlCustomer cu = new BlCustomer()
            {
                CodeCustomer = dalCu.CodeCustomer,
                NameCustomer = dalCu.NameCustomer,
                TelCustomer = dalCu.TelCustomer,
                CardCustomer = dalCu.CardCustomer,
                FamilyCustomer  = dalCu.FemilyCustomer,
            };
            dalCu.FeedBacks.ToList().ForEach(x=> cu.FeedBacks.Add(((BlFeedBackServer)_iblFeedback).CastingToBl(x)));
            dalCu.Orders.ToList().ForEach(x => cu.Orders.Add(((BlOrderServer)_order).CastingToBl(x)));

            return cu;
        }

        public Customer CastingToDal(BlCustomer blCu)
        {
            Customer cu = new Customer()
            {
                CodeCustomer = blCu.CodeCustomer,
                NameCustomer = blCu.NameCustomer,
                TelCustomer = blCu.TelCustomer,
                CardCustomer = blCu.CardCustomer,
                FemilyCustomer = blCu.FamilyCustomer,
            };
            return cu;
        }

        public List<BlCustomer> CastListToBl(List<Customer> dalCustomer)
        {
            List<BlCustomer> lst = new List<BlCustomer>();
            dalCustomer.ForEach(x => lst.Add(CastingToBl(x)));
            return lst;
        }

        public List<BlCustomer> ReadAll() =>
            CastListToBl(dal.Customer.ReadAll());
        
        public BlCustomer GetById(int customerId)
        {
            Customer temp = dal.Customer.ReadAll().Find(x => x.CodeCustomer == customerId);
            if (temp == null) 
                return null;      
            return CastingToBl(temp);
        }
     
        public bool Delete(int customerId)=>
            dal.Customer.Delete(dal.Customer.ReadAll().Find(x => x.CodeCustomer == customerId));

        public bool UpDate(BlCustomer customer) =>
            dal.Customer.Update(CastingToDal(customer));

        public bool Create(BlCustomer customer) =>
             dal.Customer.Create(CastingToDal(customer));

    }
}
