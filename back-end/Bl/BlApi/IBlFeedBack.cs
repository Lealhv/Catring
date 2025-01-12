using Bl.Bo;

namespace Bl.BlApi
{
    public interface IBlFeedBack
    {
        public List<BlFeedBack> ReadAll();
        public BlFeedBack Create(BlFeedBack feedBack);
        public bool Delete(int code);

    }
}
