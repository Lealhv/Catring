using Bl.BlApi;
using Bl.Bo;
using Bl;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FoodController : ControllerBase
    {
        BlManager BlManager;
        IBlFood IblFood;
        static string _pic = "../D/p1.jpg";  
        public FoodController(BlManager blManager)
        {
            this.BlManager = blManager;
            IblFood = blManager.BlFood;
        }

        [Route("GetAllFood")]
        [HttpGet()]
        public List<BlFood> GetList()=>
              BlManager.BlFood.ReadAll();
        

        [Route("GetFoodByCode/Code")]
        [HttpGet()]
        public BlFood GetFoodByCode(int Id) =>
            BlManager.BlFood.GetById(Id);

        [Route("addFood/MyFood")]
        [HttpPost()]
        public bool Create(BlFood [] myFood) =>
            BlManager.BlFood.Create(myFood);

        [Route("UpDateFoodByCode/Code")]
        [HttpPut()]
        public bool UpDate(BlFood food) =>
            BlManager.BlFood.UpDate(food);

        [Route("DeleteFoodByCode/Code")]
        [HttpDelete()]
        public bool Delete(int Id) =>
            BlManager.BlFood.Delete(Id);

    }

}

