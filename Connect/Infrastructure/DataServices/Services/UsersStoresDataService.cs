using Connect.Infrastructure.DataServices.IServices;
using Connect.Models;
using Examine;
using Microsoft.AspNetCore.Identity;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Options;
using Org.BouncyCastle.Crypto.Prng;
using System;
using System.Data;
using System.Text;
using Umbraco.Cms.Core.Configuration.Models;
using Umbraco.Cms.Core.Models.Blocks;
using Umbraco.Cms.Core.Models.Membership;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.Web;
using Umbraco.Cms.Web.Common;
using Umbraco.Cms.Web.Common.UmbracoContext;
using static Umbraco.Cms.Core.Constants.HttpContext;

namespace Connect.Infrastructure.DataServices.Services
{
    public class UsersStoresDataService : IUsersStoresDataService
    {
        private string _connectionString;
        private readonly IExamineManager _examineManager;
        private IUmbracoContextFactory _contextFactory;
        private readonly IVariationContextAccessor _variationContextAccessor;
        private readonly UmbracoHelper _umbracoHelper;

        public UsersStoresDataService(UmbracoHelper umbracoHelper,IVariationContextAccessor variationContextAccessor, IUmbracoContextFactory contextFactory,IExamineManager examineManager, IOptions<ConnectionStrings> connectionStrings)
        {
            _connectionString = connectionStrings.Value.ConnectionString ?? "";
            _examineManager = examineManager;
            _contextFactory = contextFactory;
            _variationContextAccessor = variationContextAccessor;
            _umbracoHelper = umbracoHelper;
        }

        public UserStore GetStore(int storeId)
        {
            UserStore userStore = null;

            using (DataTable dt = new DataTable())
            {
                using (SqlConnection cn = new SqlConnection(_connectionString))
                {
                    cn.Open();
                    using (SqlCommand cm = cn.CreateCommand())
                    {
                        cm.CommandType = CommandType.Text;
                        cm.CommandText = "select * from usersStores where StoreId = @StoreId";
                        cm.Parameters.AddWithValue("@StoreId", storeId);

                        using (SqlDataReader dr = cm.ExecuteReader())
                        {
                            dt.Load(dr);
                        }
                    }
                }

                if (dt.Rows.Count > 0)
                {
                    userStore = new UserStore();
                    var dr = dt.Rows[0];
                    PopulateStore(userStore, dr);
                }
            }

            return userStore;

        }

        public List<UserStore> getStores(int userId)
        {
            var results = new List<UserStore>();

            using (DataTable dt = new DataTable())
            {
                using (SqlConnection cn = new SqlConnection(_connectionString))
                {
                    cn.Open();
                    using (SqlCommand cm = cn.CreateCommand())
                    {
                        cm.CommandType = CommandType.Text;
                        cm.CommandText = "select * from usersStores where UserId = @UserId";
                        cm.Parameters.AddWithValue("@UserId", userId);

                        using (SqlDataReader dr = cm.ExecuteReader())
                        {
                            dt.Load(dr);
                        }
                    }
                }
                foreach (DataRow dr in dt.Rows)
                {
                    var store = new UserStore();
                    PopulateStore(store, dr);

                    results.Add(store);
                }
            }

            return results;

        }

        public bool UserIsOwner(int userId, int storeId)
        {
            bool isOwner = false;

            using (DataTable dt = new DataTable())
            {
                using (SqlConnection cn = new SqlConnection(_connectionString))
                {
                    cn.Open();
                    using (SqlCommand cm = cn.CreateCommand())
                    {
                        cm.CommandType = CommandType.Text;
                        cm.CommandText = "select * from usersStores where UserId = @UserId and StoreId = @StoreId";
                        cm.Parameters.AddWithValue("@UserId", userId);
                        cm.Parameters.AddWithValue("@StoreId", storeId);

                        using (SqlDataReader dr = cm.ExecuteReader())
                        {
                            dt.Load(dr);
                        }
                    }
                }

                if (dt.Rows.Count > 0)
                {
                    isOwner = true;
                }

                return isOwner;
            }


        }



        public List<StoreTable> getTables(int storeId)
        {
            List<StoreTable> tables = new List<StoreTable>();

            try
            {

            }
            catch (Exception)
            {

                throw;
            }
            using (DataTable dt = new DataTable())
            {
                using (SqlConnection cn = new SqlConnection(_connectionString))
                {
                    cn.Open();
                    using (SqlCommand cm = cn.CreateCommand())
                    {
                        cm.CommandType = CommandType.Text;
                        cm.CommandText = "select * from storeTables where StoreId = @StoreId";
                        cm.Parameters.AddWithValue("@StoreId", storeId);

                        using (SqlDataReader dr = cm.ExecuteReader())
                        {
                            dt.Load(dr);
                        }
                    }
                }

                foreach (DataRow dr in dt.Rows)
                {
                    var table = new StoreTable();
                    PopulateTable(table, dr);

                    tables.Add(table);
                }



                return tables;
            }
        }

        public bool AddTable(int storeId, int tableId)
        {
            try
            {
                var rowsAffected = 0;

                using (SqlConnection cn = new SqlConnection(_connectionString))
                {
                    cn.Open();
                    using (SqlCommand cm = cn.CreateCommand())
                    {
                        cm.CommandText = @"insert into storeTables 
                                    (StoreId,TableId) 
                                    values 
                                    (@StoreId,@TableId);";
                        cm.CommandType = CommandType.Text;
                        cm.Parameters.AddWithValue("@StoreId", storeId);
                        cm.Parameters.AddWithValue("@TableId", tableId);


                        rowsAffected = cm.ExecuteNonQuery();
   
                    }
                }

                return rowsAffected > 0;
            }
            catch (Exception ex)
            {
                return false;
            }

        }




        public void PopulateStore(UserStore store, DataRow dr)
        {
            store.StoreId = (int)dr["StoreId"];
            store.OrdersEnabled = (bool)dr["OrdersEnabled"];
        }

        public void PopulateTable(StoreTable table, DataRow dr)
        {
            table.StoreId = (int)dr["StoreId"];
            table.TableId = (int)dr["TableId"];
            if (dr.IsNull("OrderId"))
            {
                table.OrderId = null;
            }
            else
            {
                table.OrderId = (Guid)dr["OrderId"];
            }

        }

        private IPublishedContent? GetStoreById(int id)
        {

            const string culture = "el-GR"; // Greek
            _variationContextAccessor.VariationContext = new VariationContext(culture);
            using var context = _contextFactory.EnsureUmbracoContext();
            var content = _umbracoHelper.ContentAtRoot().Where(x=>x.Id ==  id).FirstOrDefault();
            return content;

        }
        //SYNC PRODUCTS
        public bool SyncProducts(int storeId)
        {
            var store = GetStoreById(storeId);
            if(store != null)
            {
                var sections = store.Value<IEnumerable<BlockListItem>>("menuSections");
            }
            return true;
        }


    }
}
