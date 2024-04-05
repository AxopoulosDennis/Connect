using Connect.Controllers.BackOffice.Sections;
using Microsoft.Extensions.Options;
using Umbraco.Cms.Core;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.Configuration.Models;
using Umbraco.Cms.Core.Sections;
using Umbraco.Cms.Web.Common.ApplicationBuilder;
using IHostingEnvironment = Umbraco.Cms.Core.Hosting.IHostingEnvironment;

namespace Connect.Infrastructure.CustomSections

{
    public class SectionsComposer : IComposer
    {
        public void Compose(IUmbracoBuilder builder)
        {
            builder.Sections().InsertAfter<ContentSection, StoreSection>();


            builder.Services.Configure<UmbracoPipelineOptions>(options =>
            {
                options.AddFilter(new UmbracoPipelineFilter(nameof(StoresController))
                {
                    Endpoints = app => app.UseEndpoints(endpoints =>
                    {
                        var globalSettings = app.ApplicationServices
                            .GetRequiredService<IOptions<GlobalSettings>>().Value;
                        var hostingEnvironment = app.ApplicationServices
                            .GetRequiredService<IHostingEnvironment>();
                        var backofficeArea = Constants.Web.Mvc.BackOfficePathSegment;

                        var rootSegment = $"{globalSettings.GetUmbracoMvcArea(hostingEnvironment)}/{backofficeArea}";
                        var areaName = "BackOffice";

                        endpoints.MapUmbracoRoute<StoresController>(
                            rootSegment,
                            areaName,
                            prefixPathSegment: areaName,
                            defaultAction: "Index",
                            includeControllerNameInRoute: true);


                    })
                });





            });
        }
    }
}
