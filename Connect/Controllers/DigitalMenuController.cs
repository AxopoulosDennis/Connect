using Connect.Infrastructure.DataServices.IServices;
using Connect.Infrastructure.DataServices.Services;
using Connect.Models;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ViewEngines;
using System.Web;
using Umbraco.Cms.Core.Web;
using Umbraco.Cms.Web.Common.Controllers;

namespace Connect.Controllers
{
    public class DigitalMenuController : RenderController
    {
        IUsersStoresDataService _storesService;
        IOrdersDataService _ordersService;

        public DigitalMenuController(IOrdersDataService ordersDataService,IUsersStoresDataService storesService,ILogger<RenderController> logger, ICompositeViewEngine compositeViewEngine, IUmbracoContextAccessor umbracoContextAccessor) : base(logger, compositeViewEngine, umbracoContextAccessor)
        {
            _storesService = storesService;
            _ordersService = ordersDataService;
        }

        public override IActionResult Index()
        {
            var url = HttpContext.Request.GetDisplayUrl();
            Uri myUri = new Uri(url);
            string? table = HttpUtility.ParseQueryString(myUri.Query)?.Get("table")?? null;
            if(table != null)
            {

                string enableOrders = CurrentPage?.Value<bool>("enableOrders").ToString() ?? "false";
                if(enableOrders == "True")
                {
                    if(int.TryParse(table, out int tableNum))
                    {
                        var tableObj = _storesService.GetTable(CurrentPage.Id, tableNum);
                        if(tableObj != null  )
                        {
                            //IF TABLE HAS NO ACTIVE ORDER
                            //ELSE WAITER MUST CLOUSE TABLE FROMS HIS END OR ADMIN
                            if (tableObj.OrderId == null)
                            {
                                var storeTable = new StoreTable()
                                {
                                    StoreId = tableObj.StoreId,
                                    TableId = tableObj.TableId
                                };
                                var orderId = _ordersService.InitializeNewOrder(storeTable);
                                //CREATE ORDERITEMS = EMPTY
                                //CREATE ORDERHISTORY = INITIAL

                                //CREATE NEW ORDER


                            }
                            else
                            {
                                //get current order
                            }
                        }


                    }

                }

                ViewBag.EnableOrders = enableOrders;

            }
            return CurrentTemplate(CurrentPage);
        }

        public IActionResult HomePage()
        {
            return CurrentTemplate(CurrentPage);
        }
    }
}
