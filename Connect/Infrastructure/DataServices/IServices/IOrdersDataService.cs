using Connect.Models;

namespace Connect.Infrastructure.DataServices.IServices
{
    public interface IOrdersDataService
    {
        public int? InitializeNewOrder(StoreTable storeTable);
    }
}
