using Bl.BlApi;
using Bl.Bo;
using Dal;
using Dal.Do;

namespace Bl.Blimplemention
{
    public class BlCateringServer : IBlCatering
    {
        DalManager dal;
        IBlOrder _iblOrder;
        IBlFood _iblFood;
        public BlCateringServer(DalManager manager, IBlOrder order, IBlFood food)
        {
            dal = manager;
            _iblOrder = order;
            _iblFood = food;
        }
   
        public BlCatering CastingToBl(Catering dalCa)
        {
            BlCatering ca = new BlCatering()
            {  
                CodeCatering = dalCa.CodeCatering,
                TypeOfCatering = dalCa.TypeOfCatering,
                NameCatering = dalCa.NameCatering,
                NameHechsher = dalCa.NameHechsher,
                MinimumCount = dalCa.MinimumCount,  
            };
            dalCa.Orders.ToList().ForEach(x => ca.Orders?.Add(((BlOrderServer)_iblOrder).CastingToBl(x)));
            dalCa.Foods.ToList().ForEach(x => ca.Foods?.Add(((BlFoodServer)_iblFood).CastingToBl(x)));
            return ca;
        }
        
        public List<BlCatering> CastListToBl(List<Catering> dalCatering)
        {
            List<BlCatering> lst = new List<BlCatering>();
            dalCatering.ForEach(x => lst.Add(CastingToBl(x)));
            return lst;
        }
        
        public Catering CastingToDal(BlCatering blCa)
        {
            Catering ca = new Catering()
            {
                CodeCatering = blCa.CodeCatering,
                TypeOfCatering = blCa.TypeOfCatering,
                NameCatering = blCa.NameCatering,
                NameHechsher = blCa.NameHechsher,
                MinimumCount = blCa.MinimumCount
            };
            return ca;
        }
        
        public List<BlCatering> ReadAll()=>
            CastListToBl(dal.Catering.ReadAll());    
        
        public BlCatering GetById(int codeCatering)
        {
            Catering temp = dal.Catering.ReadAll().Find(x => x.CodeCatering == codeCatering);
            if (temp == null)
                return null;
            return CastingToBl(temp);
        }        
        public bool Delete(int codeCatering)=> 
            dal.Catering.Delete(dal.Catering.ReadAll().Find(x => x.CodeCatering == codeCatering));
        
        public bool UpDate(BlCatering catering)=>
            dal.Catering.Update(CastingToDal(catering));

        public int Create(BlCatering Catering) =>
             dal.Catering.Create(CastingToDal(Catering));
    }
}
