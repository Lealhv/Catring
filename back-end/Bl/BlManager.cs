using Bl.BlApi;
using Bl.Blimplemention;
using Bl.Bo;
using Dal;
using Microsoft.Extensions.DependencyInjection;

namespace Bl;

public class BlManager
{
    public IBlCatering BlCatering { get; }
    public IBlCustomer BlCustomer { get; }
    public IBlFood BlFood { get; }
    public IBlOrder BlOrder { get; }
    public IBlFeedBack BlFeedBack { get; }  
    public IBlInvent BlInvent { get; }
    public BlEnumsServer EnumEntity { get; }
    
    public BlManager()
    {
        // רשימת מחלקות שרות
        ServiceCollection collections = new ServiceCollection();
        // יצירת אוביקט מטיפוס מחלקת שרות כלשהי
        // בדוגמא שלנו דל
        collections.AddSingleton<DalManager>();
        collections.AddSingleton<IBlCustomer, BlCustomerServer>();
        collections.AddSingleton<IBlCatering, BlCateringServer>();
        collections.AddSingleton<IBlFood, BlFoodServer>();
        collections.AddSingleton<IBlOrder, BlOrderServer>();
        collections.AddSingleton<IBlFeedBack, BlFeedBackServer>();
        collections.AddSingleton<BlEnumsServer>(); 
        collections.AddSingleton<IBlInvent, BlInventServer>();

        //// ספק שרות
        var ServiceProvider = collections.BuildServiceProvider();

        BlCustomer = ServiceProvider.GetRequiredService<IBlCustomer>();
        BlCatering = ServiceProvider.GetRequiredService<IBlCatering>();
        BlFood = ServiceProvider.GetRequiredService<IBlFood>();
        BlOrder = ServiceProvider.GetRequiredService<IBlOrder>();
        BlInvent = ServiceProvider.GetRequiredService<IBlInvent>();
        BlFeedBack = ServiceProvider.GetRequiredService<IBlFeedBack>();
        EnumEntity = ServiceProvider.GetRequiredService<BlEnumsServer>();
    }

}

