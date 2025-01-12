using Bl.Bo;
using Dal;
using Dal.Do;
using Bl.BlApi;
using System.Diagnostics;
using Microsoft.AspNetCore.Http;

namespace Bl.Blimplemention
{
    public class BlFoodServer : IBlFood
    {
        DalManager dal;
        public BlFoodServer(DalManager manager)
        {
            dal = manager;
        }


        public BlFood CastingToBl(Food dalF)
        {
            BlFood F = new BlFood()
            {
                CodeFood = dalF.CodeFood,
                CodeCatering = dalF.CodeCatering,
                TypeOfCourse = dalF.TypeOfCourse,
                TypeOfFood = dalF.TypeOfFood,
                NameOfFood = dalF.NameOfFod,
                Price = dalF.Price,
/*                Img = SavePicInFolder(dalF.Img)
*/            };
            return F;
        }
        public List<BlFood> CastListToBl(List<Food> dalFood)
        {
            List<BlFood> lst = new List<BlFood>();
            dalFood.ForEach(x => lst.Add(CastingToBl(x)));
            return lst;
        }



        public Food CastingToDal(BlFood blF)
        {
            Food F = new()
            {
                CodeFood = blF.CodeFood,
                CodeCatering = blF.CodeCatering,
                TypeOfCourse = blF.TypeOfCourse,
                TypeOfFood = blF.TypeOfFood,
                NameOfFod = blF.NameOfFood,
                Price = blF.Price,
           };
            return F;
        }

        public string SavePicInFolder(IFormFile pic)
        {
            if (pic == null || pic.Length == 0)
            {
                return string.Empty;
            }
            string uniqueFileName = Guid.NewGuid().ToString() + "_" + pic.FileName;
            var folderName = Path.Combine("wwwroot", "Images");
            var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
            var fullPath = Path.Combine(pathToSave, uniqueFileName);
            using (var stream = new FileStream(fullPath, FileMode.Create))
            {
                pic.CopyTo(stream);
            }
            return fullPath;
        }


        public List<BlFood> ReadAll()=>
            CastListToBl(dal.Food.ReadAll());

        public BlFood GetById(int codeFood) =>
           CastingToBl(dal.Food.ReadAll().Find(x => x.CodeFood == codeFood));
        
        public bool Delete(int codeFood)=>
            dal.Food.Delete(dal.Food.ReadAll().Find(x => x.CodeFood == codeFood));
       
        public bool UpDate(BlFood food) =>
            dal.Food.Update(CastingToDal(food));

        public bool Create(BlFood[] food)
        {
            bool b = true;
            bool b2 = false;
            foreach (var item in food)
            {
                b2 = dal.Food.Create(CastingToDal(item));
               if(!b2) b = false;
            }
            return b;
        }
             
    }
}
