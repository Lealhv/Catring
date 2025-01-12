using Bl.BlApi;
using Bl.Bo;
using Bl;
using Microsoft.AspNetCore.Mvc;
using Bl.Blimplemention;
using static Dal.Do.EnumFile;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        BlManager BlManager;
        IBlOrder IblOrder;
        public OrderController(BlManager blManager)
        {
            this.BlManager = blManager;
            IblOrder = blManager.BlOrder;
        }

        [Route("GetAllOrder")]
        [HttpGet()]
        public List<BlOrder> GetList()=>
            BlManager.BlOrder.ReadAll();  

        [Route("GetOrderByCode/Code")]
        [HttpGet()]
        public BlOrder GetByCode(int Id) =>
            BlManager.BlOrder.GetById(Id);

        [Route("UpDateOrderByCode/Code")]
        [HttpPut()]
        public bool UpDate(BlOrder order) =>
            BlManager.BlOrder.UpDate(order);

        [Route("DeleteOrderByCode/Code")]
        [HttpDelete()]
        public bool Delete(int Id) =>
            BlManager.BlOrder.Delete(Id);
        
        [Route("addOrder/MyOrder")]
        [HttpPost()]
        public int Create(BlOrder myOrder) =>
           
            BlManager.BlOrder.Create(myOrder);

    }
}
