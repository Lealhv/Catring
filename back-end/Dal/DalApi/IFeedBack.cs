using Dal.Do;

namespace Dal.DalApi
{
    public interface IFeedBack
    {
        public List<FeedBack> ReadAll();
        public bool Delete(FeedBack item);
        public FeedBack Create (FeedBack item);
    }
}
