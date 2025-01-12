using Dal.DalApi;
using Dal.DalImplemention;
using Dal.Do;
using Microsoft.Extensions.DependencyInjection;

namespace Dal
{  
    public class DalManager : IDal
    {
        public ICatering Catering { get; }
        public IFeedBack FeedBack { get; }
        public IInvent Invent { get; }
        public ICustomer Customer { get; }
        public IFood Food { get; }
        public IOrder Order { get; }
        public ITimeOfEvent TimeOfEvent { get; }
        public IEvent Event { get; }
        public ITypeOfCatering   TypeOfCatering { get; }
        public ITypeOfCourse TypeOfCourse { get; }
        public IHechsherEnum HechsherEnum { get; }
        public dbcontext dbcontext { get; }

        public DalManager()
        { 
            // אספנו את כל השרותים שצריך לרשימה אחת
            ServiceCollection collections = new ServiceCollection();
            // פה מיצרים אוביקט יחיד מכל מחלקה ואז יוכלו להזריק אותו לאן שצריך
            collections.AddSingleton<ICatering, CateringServer>();
            collections.AddSingleton<IFeedBack, FeedBackServer>();
            collections.AddSingleton<IInvent, InventServer>();
            collections.AddSingleton<IFood, FoodServer>();
            collections.AddSingleton<IOrder, OrderServer>();
            collections.AddSingleton<ICustomer, CustomerServer>();
            collections.AddSingleton<dbcontext>();

            // בנינו מנהל של סרויסים
            var serviceprovider = collections.BuildServiceProvider();

            // נגשת לאוביקט שהפרווידר מנהל
            Catering = serviceprovider.GetRequiredService<ICatering>();
            FeedBack = serviceprovider.GetRequiredService<IFeedBack>();
            Invent = serviceprovider.GetRequiredService<IInvent>();
            Food = serviceprovider.GetRequiredService<IFood>();
            Order = serviceprovider.GetRequiredService<IOrder>();
            Customer = serviceprovider.GetRequiredService<ICustomer>();
            dbcontext= serviceprovider.GetRequiredService<dbcontext>();
        }
    }
}
