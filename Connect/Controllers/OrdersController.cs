using Connect.Models;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Core.Cache;
using Umbraco.Cms.Core.Logging;
using Umbraco.Cms.Core.Models.Blocks;
using Umbraco.Cms.Core.Routing;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Web;
using Umbraco.Cms.Infrastructure.Persistence;
using Umbraco.Cms.Web.Common;
using Umbraco.Cms.Web.Website.Controllers;
using static Connect.Models.ProductModel;

namespace Connect.Controllers
{
    public class OrdersController : SurfaceController
    {
        IWebHostEnvironment _webHostEnvironment;
        private readonly UmbracoHelper _umbracoHelper;
        IHttpContextAccessor _httpContextAccessor;
        IUmbracoContextAccessor _umbracoContext;
        ServiceContext _services;

        public OrdersController(
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

        [ValidateAntiForgeryToken]
        [HttpPost]
        public ActionResult AddProductToOrder(string model)
        {
            ProductModel converted = new();
            try
            {
                converted = Newtonsoft.Json.JsonConvert.DeserializeObject<ProductModel>(model);

                if(converted != null)
                {
                    BlockListItem? item = null;

                    var document = _umbracoHelper.Content(converted.PageId);
                    var sections = document.Value<IEnumerable<BlockListItem>>("menuSections");
                    if (sections?.Any() ?? false)
                    {
                        var section = sections.Where(x => x.Content.Key.ToString() == converted.SectionKey).FirstOrDefault();
                        if (section != null)
                        {
                            item = section?.Content?.Value<IEnumerable<BlockListItem>>("sectionItems")?.Where(x => x.Content.Key.ToString() == converted.ProductKey).FirstOrDefault();

                            if (item != null)
                            {

                                var databaseProduct = new ProductModel(item, converted.PageId, converted.SectionKey, converted.ProductKey);
                                databaseProduct.Ingredients = converted.Ingredients;
                                databaseProduct.Extras = converted.Extras;
                                databaseProduct.QuantityInBasket = converted.QuantityInBasket;
                                databaseProduct.TotalPrice = databaseProduct.FinalPrice;

                                //if (databaseProduct.Ingredients.Any(x => x.IsIngredientSelected == false))
                                //{
                                //    //to remove ingredients
                                //}

                                if (databaseProduct.Extras.Any(x => x.IsExtraSelected == true))
                                {
                                    foreach (var extra in databaseProduct.Extras.Where(x=> x.IsExtraSelected == true))
                                    {
                                        databaseProduct.TotalPrice += extra.ExtraPrice;
                                    }
                                }

                                databaseProduct.TotalPrice = databaseProduct.TotalPrice * databaseProduct.QuantityInBasket;
                            }

                        }
                    }


                }

            }
            catch (Exception ex)
            {

            }

            return Json("");
        }


    }


}
