using Connect.Infrastructure.DataServices.IServices;
using Connect.Models;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Options;
using Serilog;
using System;
using System.Data;
using Umbraco.Cms.Core.Configuration.Models;

namespace Connect.Infrastructure.DataServices.Services
{
    public class OrdersDataService : IOrdersDataService
    {
        private string _connectionString;


        public OrdersDataService(IOptions<ConnectionStrings> connectionStrings)
        {
            _connectionString = connectionStrings.Value.ConnectionString ?? "";

            Log.Logger = new LoggerConfiguration()
            .MinimumLevel.Debug()
            .WriteTo.File("logs/orders.txt", rollingInterval: RollingInterval.Day)
            .CreateLogger();
        }

        public int? InitializeNewOrder(StoreTable storeTable)
        {

            var orderId = InitializeOrder(storeTable);
            storeTable.OrderId = orderId;
            var historyId = InitializeOrderHistory(storeTable);

            if(orderId != null && historyId != null)
            {
               bool historyBinded  = BindHistoryToOrder(orderId, historyId);
               if(historyBinded)
               {
                    var bindHistoryMessage = OrdersHistoryActions.BindedHistory;
                    WriteMessage(storeTable.StoreId, historyId, orderId, bindHistoryMessage, OrdersHistoryTypes.Success);

                    var bindedOrderToTable = BindOrderToTable(storeTable.StoreId, storeTable.TableId, orderId);
                    if(bindedOrderToTable)
                    {
                        var bindOrderToTableMessage = OrdersHistoryActions.BindedOrderToTable;
                        WriteMessage(storeTable.StoreId, historyId, orderId, bindOrderToTableMessage, OrdersHistoryTypes.Success);

                    }

                }
            }

              

            return orderId;

        }

        public int? InitializeOrder(StoreTable storeTable)
        {
            int? id = null;
          
            try
            {

                using (SqlConnection cn = new SqlConnection(_connectionString))
                {
                    cn.Open();
                    using (SqlCommand cm = cn.CreateCommand())
                    {
                        cm.CommandText = @"insert into tablesOrders
                                    (StoreId, TableId) 
                                    values 
                                    (@StoreId,@TableId); SELECT CAST(scope_identity() AS int)";

                        cm.CommandType = CommandType.Text;
                        cm.Parameters.AddWithValue("@StoreId", storeTable.StoreId);
                        cm.Parameters.AddWithValue("@TableId", storeTable.TableId);


                        var obj = cm.ExecuteScalar();
                        if (obj != null)
                        {
                            id = (int)obj;
                        }
                    }
                }

                return id;
            }
            catch (Exception ex)
            {
                Log.Logger.Error("Error Initializing Order For StoredID: {StoreID} AND TableId: {TabledId}. Exception Message: {message}", storeTable.StoreId, storeTable.TableId, ex.Message);
            }


            return id;
        }
        public Guid? InitializeOrderHistory(StoreTable storeTable)
        {
            var rowsAffected = 0;

            int? id = null;
            var datetime = DateTime.Now;
            var action = OrdersHistoryActions.InitializedOrder;
            var type = OrdersHistoryTypes.Success ?? "SUCCESS";

            var uid = Guid.NewGuid();
            try
            {

                using (SqlConnection cn = new SqlConnection(_connectionString))
                {
                    cn.Open();
                    using (SqlCommand cm = cn.CreateCommand())
                    {
                        cm.CommandText = @"insert into ordersHistory 
                                    (OrderHistoryId, OrderId, Action, DateTime, Type) 
                                    values 
                                    (@OrderHistoryId, @OrderId, @Action,@DateTime, @Type);";

                        cm.CommandType = CommandType.Text;
                        cm.Parameters.AddWithValue("@OrderHistoryId", uid);
                        cm.Parameters.AddWithValue("@OrderId", storeTable.OrderId);
                        cm.Parameters.AddWithValue("@Action", action);
                        cm.Parameters.AddWithValue("@DateTime", datetime);
                        cm.Parameters.AddWithValue("@Type", type);


                        rowsAffected = cm.ExecuteNonQuery();

                    }
                }

                if(rowsAffected > 0)
                {
                    return uid;

                }
            }
            catch (Exception ex)
            {
                Log.Logger.Error("Error Initializing OrderHistory For StoredID: {StoreID} AND TableId: {TabledId} AND OrderID: {OrderId}. Exception Message: {message}", storeTable.StoreId, storeTable.TableId, storeTable.OrderId, ex.Message);

            }

            return null;

        }
        public bool BindHistoryToOrder(int? orderId, Guid? historyId)
        {
            var rowsAffected = 0;
            try
            {
                using (SqlConnection cn = new SqlConnection(_connectionString))
                {
                    cn.Open();
                    using (SqlCommand cm = cn.CreateCommand())
                    {
                        cm.CommandText = @"update tablesOrders set
                        OrderHistoryId = @OrderHistoryId

                        WHERE OrderId = @OrderId";
                        cm.CommandType = CommandType.Text;

                        cm.Parameters.AddWithValue("@OrderId", orderId);
                        cm.Parameters.AddWithValue("@OrderHistoryId", historyId);

                        rowsAffected = cm.ExecuteNonQuery();
                    }
                }

                return rowsAffected > 0;
            }
            catch (Exception ex)
            {
                Log.Logger.Error("Error Binding OrderHistory ID:{HistoryId} For OrderID: {OrderId}. Exception Message: {message}", orderId, historyId, ex.Message);

                return false;
            }
        }
        public void WriteMessage(int storeId, Guid? historyId, int? orderId,string action,string type)
        {
            try
            {

                using (SqlConnection cn = new SqlConnection(_connectionString))
                {
                    cn.Open();
                    using (SqlCommand cm = cn.CreateCommand())
                    {
                        cm.CommandText = @"insert into ordersHistory 
                                    (OrderHistoryId, OrderId, Action, DateTime, Type) 
                                    values 
                                    (@OrderHistoryId, @OrderId, @Action,@DateTime, @Type);";

                        cm.CommandType = CommandType.Text;
                        cm.Parameters.AddWithValue("@OrderHistoryId", historyId);
                        cm.Parameters.AddWithValue("@OrderId", orderId);
                        cm.Parameters.AddWithValue("@Action", action);
                        cm.Parameters.AddWithValue("@DateTime", DateTime.Now);
                        cm.Parameters.AddWithValue("@Type", type);


                        var rowsAffected = cm.ExecuteNonQuery();
                    }
                }

            }
            catch (Exception ex)
            {
                Log.Logger.Error("Error Adding OrderHistory For StoreId: {StoreID} AND OrderID: {OrderId} AND Action: {Action} AND Type: {Type}. Exception Message: {message}", storeId, orderId, action, type, ex.Message);

            }

        }

        public bool BindOrderToTable(int storeId, int tableId, int? orderId)
        {
            var rowsAffected = 0;
            try
            {
                using (SqlConnection cn = new SqlConnection(_connectionString))
                {
                    cn.Open();
                    using (SqlCommand cm = cn.CreateCommand())
                    {
                        cm.CommandText = @"update storesTables set
                        OrderId = @OrderId,
                        OrderStartTime = @OrderStartTime

                        WHERE StoreId = @StoreId AND TableId = @TableId";
                        cm.CommandType = CommandType.Text;
                        cm.Parameters.AddWithValue("@OrderId", orderId);
                        cm.Parameters.AddWithValue("@StoreId", storeId);
                        cm.Parameters.AddWithValue("@TableId", tableId);
                        cm.Parameters.AddWithValue("@OrderStartTime", DateTime.Now);

                        rowsAffected = cm.ExecuteNonQuery();
                    }
                }

                return rowsAffected > 0;
            }
            catch (Exception ex)
            {
                Log.Logger.Error("Error Binding Order For StoreID:{StoreId} AND TableID:{TableId} For OrderID: {OrderId}. Exception Message: {message}",storeId, tableId, orderId, ex.Message);

                return false;
            }
        }


    }
}
