
namespace Dal.DalApi
{
    public class IDal
    {
        public ICatering? Catering { get; }
        public IOrder? Order { get; }
        public IFood? Food { get; }
        public ICustomer? Customer { get; }
        public IEvent? Event { get; }
        public ITimeOfEvent? TimeOfEvent { get; }
        public ITypeOfCatering? TypeOfCatering { get; }
        public ITypeOfCourse? TypeOfCourse { get; }
        public IHechsherEnum? HechsherEnum { get; }
    }
}
