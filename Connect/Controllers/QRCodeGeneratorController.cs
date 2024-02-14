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

namespace Connect.Controllers
{
    public class QRCodeGeneratorController : SurfaceController
    {
        public QRCodeGeneratorController(IWebHostEnvironment webHostEnvironment, IUmbracoContextAccessor umbracoContextAccessor, IUmbracoDatabaseFactory databaseFactory, ServiceContext services, AppCaches appCaches, IProfilingLogger profilingLogger, IPublishedUrlProvider publishedUrlProvider) : base(umbracoContextAccessor, databaseFactory, services, appCaches, profilingLogger, publishedUrlProvider)
        {
           
        }

        [HttpGet]
        public ActionResult GetQRCode(string url)
        {
            var qr = QrCode.EncodeText(url, QrCode.Ecc.Medium);
            string svg = qr.ToSvgString(4);

            return Json(new { result = svg });
        }
    }
}
