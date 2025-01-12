using Bl.Bo;
using Dal.DalApi;
using Dal.DalImplemention;
using Dal.Do;
using static Dal.Do.EnumFile;

namespace Bl.Blimplemention
{
    public class BlEnumsServer {
        
        
        public IEnumEntity getService(EType eType)
        {
            IEnumEntity service=null;

            if (eType == EType.HechsherEnum)
                service = new HechsherEnumServer();
                
            else if (eType == EType.Event)
                service = new EventServer();

            else if (eType == EType.TypeOfCatering)
                service = new TypeOfCateringServer();
               
            else if (eType == EType.TypeOfCourse)
                service = new TypeOfCourseServer();
      
            else if (eType == EType.TimeOfEvent)
                service = new TimeOfEventServer();

            else if (eType == EType.TypeOfFood)
                service = new TypeOfFoodServer();

            return service;
        }
        public List<BlEnumEntity> getList(EType eType) { 
            List<BlEnumEntity> las = new List<BlEnumEntity>();            
            getService(eType).ReadAll().ForEach(x => las.Add(CastingToBlEnumEntity(x)));
               return las;

        }
        public BlEnumEntity CastingToBlEnumEntity(EnumEntity e)
        {
            BlEnumEntity ee = new BlEnumEntity();
            ee.Code = e.Code;
            ee.Typy = e.Typy;
            return ee;
        }

        public EnumEntity CastingToDal(BlEnumEntity ble)
        {
            EnumEntity e = new EnumEntity()
            {
                Code = ble.Code,
                Typy = ble.Typy
            };
            return e;
        }

        public List<BlEnumEntity>  GetAllList(EType eType) =>
            getList(eType);

        public BlEnumEntity GetByCode(EType eType, int codeItem)=>
            getList(eType).Find(x => x.Code == codeItem);



        public bool Create(EType eType, BlEnumEntity item) =>
            getService(eType).Create(CastingToDal(item));


        public bool Delete(EType eType, int codeItem) =>
            getService(eType).Delete(CastingToDal( GetByCode(eType, codeItem)));

    }
}
