using Bl.BlApi;
using Bl.Bo;
using Bl;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Bl.Blimplemention;
using static Dal.Do.EnumFile;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InventsController : ControllerBase
    {

        BlManager BlManager;
        IBlCustomer IblCus;

        public InventsController(BlManager blManager)
        {
            this.BlManager = blManager;
            IblCus = blManager.BlCustomer;
        }

        [Route("GetAllInvent")]
        [HttpGet()]
        public List<BlInvent> GetList() =>
           BlManager.BlInvent.ReadAll();


        [Route("GetInventById/Id")]
        [HttpGet()]
        public BlInvent GetById(int Id) =>
            BlManager.BlInvent.GetById(Id);

        [Route("DeleteInventById/Id")]
        [HttpDelete()]
        public bool Delet(int Id) =>
             BlManager.BlInvent.Delete(Id);

        [Route("UpDateInventById/Id")]
        [HttpPut()]
        public bool UpDate(BlInvent invent) =>
            BlManager.BlInvent.UpDate(invent);

        [Route("addInvent/MyInvent")]
        [HttpPost()]
        public bool Create( int codeOrder, BlInvent [] myInvent) =>
            BlManager.BlInvent.Create(myInvent, codeOrder);

    }
}
