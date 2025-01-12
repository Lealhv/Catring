using Bl.BlApi;
using Bl.Bo;
using Dal;
using Dal.Do;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Blimplemention
{
    public class BlFeedBackServer : IBlFeedBack
    {

        DalManager dal;
        public BlFeedBackServer(DalManager manager)
        {
            dal = manager;
        }

        public BlFeedBack CastingToBl(FeedBack dalf)
        {
            BlFeedBack cu = new BlFeedBack()
            {
                Id = dalf.Id,
                CodeCatering = dalf.CodeCatering,
                CodeCustomer = dalf.CodeCustomer,
                FeedBack1 = dalf.FeedBack1,
            };
            return cu;
        }
        public List<BlFeedBack> CastListToBl(List<FeedBack> dalF)
        {
            List<BlFeedBack> lst = new List<BlFeedBack>();
            dalF.ForEach(x => lst.Add(CastingToBl(x)));
            return lst;
        }

        public FeedBack CastingToDal(BlFeedBack blf)
        {
            FeedBack ca = new FeedBack()
            {
                Id = blf.Id,
                CodeCatering = blf.CodeCatering,
                CodeCustomer = blf.CodeCustomer,
                FeedBack1 = blf.FeedBack1,
             };
            return ca;
        }


        public bool Delete(int code) =>
            dal.FeedBack.Delete(dal.FeedBack.ReadAll().Find(x => x.Id == code));

        public List<BlFeedBack> ReadAll() =>
            CastListToBl(dal.FeedBack.ReadAll());

        public BlFeedBack Create(BlFeedBack feedBack)
        {
           FeedBack f =  dal.FeedBack.Create(CastingToDal(feedBack));
            return CastingToBl(f);
        }
           

    }
}
