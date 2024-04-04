using Microsoft.AspNetCore.Mvc;
using Net.Codecrete.QrCodeGenerator;
using Umbraco.Cms.Core.Cache;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Net.Codecrete.QrCodeGenerator;
using System.Net;
using System.Text;
using System.Web;
using Umbraco.Cms.Core.Cache;
using Umbraco.Cms.Core.Logging;
using Umbraco.Cms.Core.Routing;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Web;
using Umbraco.Cms.Infrastructure.Persistence;
using Umbraco.Cms.Web.Website.Controllers;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Umbraco.Cms.Web.Common.Controllers;

namespace Connect.Controllers
{
    public class QRRedirectController : UmbracoApiController
    {
        public QRRedirectController()
        {

        }


        [HttpGet]
        public ActionResult RedirectQRCode([FromQuery] string num, [FromQuery] string? table)
        {
            var config = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();

            var redirectUrl = "https://tonny.gr/";

            var mapping = config[$"WebsitesMapping:{num}"];

            if(!string.IsNullOrEmpty(mapping))
            {
                redirectUrl += mapping;
                if (table != null)
                {
                    redirectUrl = redirectUrl + "?table=" + table;
                }
            }




            return Redirect(redirectUrl);

        }

    }
}
