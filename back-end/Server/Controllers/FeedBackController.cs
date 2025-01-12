using Bl.BlApi;
using Bl;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Bl.Bo;
using Dal.Do;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeedBackController : ControllerBase
    {
        BlManager BlManager;
        IBlFeedBack Iblf;
        public FeedBackController(BlManager blManager)
        {
            this.BlManager = blManager;
            Iblf = blManager.BlFeedBack;
        }

        [Route("GetAllFeedBack")]
        [HttpGet()]
        public List<BlFeedBack> GetList() =>
            BlManager.BlFeedBack.ReadAll();

        [Route("addFeedBack/MyFeedBack")]
        [HttpPost()]
        public BlFeedBack Create(BlFeedBack feedBack) =>
          BlManager.BlFeedBack.Create(feedBack);

        [Route("DeleteFeedBack/Code")]
        [HttpDelete()]
        public bool Delete(int Id) =>
            BlManager.BlFeedBack.Delete(Id);
    }
}
