using Bl.BlApi;
using Bl.Bo;
using Bl;
using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CateringController : ControllerBase
    {
        BlManager BlManager;
        IBlCatering IblCatering;
        public CateringController(BlManager blManager)
        {
            this.BlManager = blManager;
            this.IblCatering = blManager.BlCatering;
        }

        [Route("GetAllCatering")]
        [HttpGet()]
        public List<BlCatering> GetList()=>
            BlManager.BlCatering.ReadAll();

        [Route("GetCateringByCode/Code")]
        [HttpGet()]
        public BlCatering GetByCode(int Id)=>
             BlManager.BlCatering.GetById(Id);

        [Route("UpDateCateringByCode/Code")]
        [HttpPut()]
        public bool UpDate(BlCatering catering) =>  
            BlManager.BlCatering.UpDate(catering);

        [Route("DeleteCateringByCode/Code")]
        [HttpDelete()]
        public bool Delete(int Id)=>
            BlManager.BlCatering.Delete(Id);

        [Route("addCatering/MyCatering")]
        [HttpPost()]
        public int Create(BlCatering myCatering) =>
           BlManager.BlCatering.Create(myCatering);

        [Route("Date")]
        [HttpGet()]
        public DateTime Date(DateTime d) =>
            d;
    }
}
