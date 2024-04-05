using Connect.Models;

namespace Connect.Infrastructure.DataServices.IServices
{
    public interface IUsersStoresDataService
    {
        List<UserStore> getStores(int userId);
        UserStore GetStore(int storeId);
        bool UserIsOwner(int userId, int storeId);
        List<StoreTable> getTables(int storeId);
        bool AddTable(int StoreId,int tableId);

        bool SyncProducts(int storeId);
    }
}
