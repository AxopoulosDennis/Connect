using Connect.Models;
using Microsoft.AspNetCore.Mvc;
using Polly;
using Umbraco.Cms.Core.Cache;
using Umbraco.Cms.Core.Logging;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Models.Blocks;
using Umbraco.Cms.Core.Routing;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Web;
using Umbraco.Cms.Infrastructure.Persistence;
using Umbraco.Cms.Web.Common;
using Umbraco.Cms.Web.Common.UmbracoContext;
using Umbraco.Cms.Web.Website.Controllers;

namespace Connect.Controllers
{
    public class ProductsController : SurfaceController
    {
        IWebHostEnvironment _webHostEnvironment;
        private readonly UmbracoHelper _umbracoHelper;
        IHttpContextAccessor _httpContextAccessor;
        IUmbracoContextAccessor _umbracoContext;
        ServiceContext _services;

        public ProductsController(
            IHttpContextAccessor httpContextAccessor,
            UmbracoHelper umbracoHelper,
            IWebHostEnvironment webHostEnvironment,
            IUmbracoContextAccessor
            umbracoContextAccessor,
            IUmbracoDatabaseFactory
            databaseFactory, ServiceContext
            services, AppCaches appCaches,
            IProfilingLogger profilingLogger,
            IPublishedUrlProvider publishedUrlProvider) : base(umbracoContextAccessor, databaseFactory, services, appCaches, profilingLogger, publishedUrlProvider)
        {
            _umbracoHelper = umbracoHelper;
            _webHostEnvironment = webHostEnvironment;
            _httpContextAccessor = httpContextAccessor;
            _umbracoContext = umbracoContextAccessor;
            _services = services;
        }

        [HttpGet]
        public ActionResult GetItemInfo(string pageId,string sKey, string pKey)
        {
            BlockListItem? item = null;

            var document = _umbracoHelper.Content(pageId);
            var sections = document.Value<IEnumerable<BlockListItem>>("menuSections");
            if(sections?.Any() ?? false)
            {
                var section = sections.Where(x => x.Content.Key.ToString() == sKey).FirstOrDefault();
                if(section != null)
                {
                    item = section?.Content?.Value<IEnumerable<BlockListItem>>("sectionItems")?.Where(x => x.Content.Key.ToString() == pKey).FirstOrDefault();

                    if(item != null)
                    {
                        var model = new ProductModel(item, pageId, sKey, pKey);
                        ViewBag.Item = model;

                        //save product to db as object and have a reference number later
                    }

                }
            }


            return PartialView("_Product");
        }
    }


}
