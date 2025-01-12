using Bl;
using Bl.BlApi;
using Bl.Bo;
using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        BlManager BlManager;
        IBlCustomer IblCus;

        public CustomerController(BlManager blManager) {
            this.BlManager = blManager;
            IblCus = blManager.BlCustomer;   
        }

        [Route("GetAllCustomer")]
        [HttpGet()]
        public List<BlCustomer> GetList()=>
           BlManager.BlCustomer.ReadAll();
         
        
        [Route("GetCustomerById/Id")]
        [HttpGet()]
        public BlCustomer GetById(int Id)=>
            BlManager.BlCustomer.GetById(Id);
        
        [Route("DeleteCustomerById/Id")]
        [HttpDelete()]
        public bool Delete(int Id)=>
             BlManager.BlCustomer.Delete(Id);
       
        [Route("UpDateCustomerById/Id")]
        [HttpPut()]
        public bool UpDate(BlCustomer customer)=>
            BlManager.BlCustomer.UpDate(customer);

        [Route("addCustomer/MyCustomer")]
        [HttpPost()]
        public bool Create(BlCustomer myCustomer) =>
            BlManager.BlCustomer.Create(myCustomer);

}
}
