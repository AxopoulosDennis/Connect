using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Internal;
using Umbraco.Cms.Core.Models.Membership;
using Umbraco.Cms.Core;
using Umbraco.Cms.Core.Security;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Web;
using Umbraco.Cms.Web.Common;
using Umbraco.Cms.Web.Common.Security;
using Connect.Infrastructure.DataServices.IServices;
using Microsoft.AspNetCore.Identity;
using Connect.Models;
using static Lucene.Net.Documents.Field;
using Examine;

namespace Connect.Controllers.BackOffice.Sections
{
    [Area("BackOffice")]
    [Authorize(Policy = "BackOfficeAccess")]
    public class StoresController : Controller
    {
        IWebHostEnvironment _webHostEnvironment;
        private IUserService _userService;
        private IBackOfficeUserManager _backOfficeUserManager;
        private IBackOfficeSecurityAccessor _backOfficeSecurityAccessor;
        private IUsersStoresDataService _usersStoresDataService;

        public StoresController(IWebHostEnvironment webHostEnvironment,
            IUserService userService,
            IBackOfficeUserManager backOfficeUserManager,
           IBackOfficeSecurityAccessor backOfficeSecurityAccessor,
           IUsersStoresDataService usersStoresDataService,
            IExamineManager examineManager)
        {
            _webHostEnvironment = webHostEnvironment;
            _userService = userService;
            _backOfficeUserManager = backOfficeUserManager;
            _backOfficeSecurityAccessor = backOfficeSecurityAccessor;
            _usersStoresDataService = usersStoresDataService;

        }

        public async Task<IActionResult> Index()
        {
            var user = _backOfficeSecurityAccessor.BackOfficeSecurity?.CurrentUser;
            if (user != null)
            {
                var userStores = _usersStoresDataService.getStores(user.Id);
                ViewBag.UserStores = userStores;

            }

            return View("/Views/BackOffice/Stores/Index.cshtml");
        }

        [HttpPost]
        public async Task<IActionResult> OpenStore(UserStore userStore)
        {
            var user = _backOfficeSecurityAccessor.BackOfficeSecurity?.CurrentUser;


            if (user != null && _usersStoresDataService.UserIsOwner(user.Id, userStore.StoreId))
            {
                var store = _usersStoresDataService.GetStore(userStore.StoreId);
                userStore.OrdersEnabled = store.OrdersEnabled;
                ViewBag.UserStore = userStore;

                return View("/Views/BackOffice/Stores/StoreInner.cshtml");

            }
            else
            {
                return View("/Views/BackOffice/Stores/Index.cshtml");

            }

        }

        [HttpGet]
        public async Task<IActionResult> GetTablesData(UserStore userStore)
        {
            var user = _backOfficeSecurityAccessor.BackOfficeSecurity?.CurrentUser;
            if (user != null && _usersStoresDataService.UserIsOwner(user.Id, userStore.StoreId))
            {
                var tables = _usersStoresDataService.getTables(userStore.StoreId);
                ViewBag.StoreTables = tables;

                return View("/Views/BackOffice/Stores/Partials/_Tables.cshtml");

            }
            else
            {
                return View("/Views/BackOffice/Stores/Index.cshtml");

            }
        }

        [HttpGet]
        public async Task<IActionResult> GetSyncProducts(UserStore userStore)
        {
            var user = _backOfficeSecurityAccessor.BackOfficeSecurity?.CurrentUser;
            if (user != null && _usersStoresDataService.UserIsOwner(user.Id, userStore.StoreId))
            {


                return View("/Views/BackOffice/Stores/Partials/_SyncProducts.cshtml");

            }
            else
            {
                return View("/Views/BackOffice/Stores/Index.cshtml");

            }
        }


        [HttpPost]
        public async Task<IActionResult> SyncProducts(int storeId)
        {
            var user = _backOfficeSecurityAccessor.BackOfficeSecurity?.CurrentUser;
            if (user != null && _usersStoresDataService.UserIsOwner(user.Id, storeId))
            {
                var sync = _usersStoresDataService.SyncProducts(storeId);
                return Json(new { success = true });
            }
            else
            {
                Response.StatusCode = 400;
                return new EmptyResult();

            }
        }


        [HttpPost]
        public async Task<IActionResult> AddTables(int totalTables, int storeId)
        {
            var user = _backOfficeSecurityAccessor.BackOfficeSecurity?.CurrentUser;
            if (user != null && _usersStoresDataService.UserIsOwner(user.Id, storeId))
            {
                var previousTables = _usersStoresDataService.getTables(storeId);
                int lastId = 0;
                if (previousTables?.Any() ?? false)
                {
                    lastId = previousTables.OrderByDescending(x => x.TableId).LastOrDefault().TableId;
                }


                for ( var i = 1; i <= totalTables; i++ )
                {
                    var result = _usersStoresDataService.AddTable(storeId, lastId+i);
                    if(result == false)
                    {
                        break;
                    }
                }

            }
            return Json(new { success = true });

        }
    }
}
