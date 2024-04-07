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
        public DigitalMenuController(ILogger<RenderController> logger, ICompositeViewEngine compositeViewEngine, IUmbracoContextAccessor umbracoContextAccessor) : base(logger, compositeViewEngine, umbracoContextAccessor)
        {
        }

        public override IActionResult Index()
        {
            var url = HttpContext.Request.GetDisplayUrl();
            Uri myUri = new Uri(url);
            string? table = HttpUtility.ParseQueryString(myUri.Query)?.Get("table")?? null;
            if(table != null)
            {

                string enableOrders = CurrentPage?.Value<bool>("enableOrders").ToString() ?? "false";

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
