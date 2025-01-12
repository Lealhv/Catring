using Bl.BlApi;
using Bl.Blimplemention;
using Bl.Bo;
using Bl;
using Microsoft.AspNetCore.Mvc;
using static Dal.Do.EnumFile;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EnumController : ControllerBase
    {
        BlManager BlManager;
        BlEnumsServer blEnumsServer=new();
        public EnumController(BlManager blManager)
        {
            this.BlManager = blManager;
        }

        [Route("GetAllEnumTable")]
        [HttpGet()]
        public List<BlEnumEntity> GetList(EType e) => 
           blEnumsServer.GetAllList(e);

        [Route("GetEnumByCode/Code")]
        [HttpGet()]
        public BlEnumEntity GetByCode(EType e, int Id) =>
             blEnumsServer.GetByCode(e, Id);


        [Route("DeleteEnumByCode/Code")]
        [HttpDelete()]
        public bool Delete(EType e, int Id) =>
             blEnumsServer.Delete(e, Id);

        [Route("addEnum/MyEnum")]
        [HttpPost()]
        public bool Create(EType e, BlEnumEntity BlE) =>
            blEnumsServer.Create(e, BlE);
    }
}
