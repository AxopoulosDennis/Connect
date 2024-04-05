using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Core.Events;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core;
using Umbraco.Cms.Core.Trees;
using Umbraco.Cms.Web.BackOffice.Trees;
using Umbraco.Cms.Web.Common.ModelBinders;
using Umbraco.Cms.Web.Common.Attributes;

namespace Connect.Controllers.BackOffice.Trees
{
    [Tree("stores", "storesTree", TreeTitle = "Stores tree",
    TreeGroup = "storesMainTree", SortOrder = 1, IsSingleNodeTree = true)]
    [PluginController("storesSection")]
    public class StoresSectionTreeController : TreeController
    {
        private readonly IMenuItemCollectionFactory _menuItemCollectionFactory;

        public StoresSectionTreeController(ILocalizedTextService localizedTextService,
        UmbracoApiControllerTypeCollection umbracoApiControllerTypeCollection,
        IMenuItemCollectionFactory menuItemCollectionFactory,
        IEventAggregator eventAggregator)
        : base(localizedTextService, umbracoApiControllerTypeCollection, eventAggregator)
        {
            _menuItemCollectionFactory = menuItemCollectionFactory ?? throw new ArgumentNullException(nameof(menuItemCollectionFactory));
        }

        protected override ActionResult<MenuItemCollection> GetMenuForNode(string id, [ModelBinder(typeof(HttpQueryStringModelBinder))] FormCollection queryStrings)
        {
            var menu = _menuItemCollectionFactory.Create();
            return menu;

        }

        protected override ActionResult<TreeNodeCollection> GetTreeNodes(string id, [ModelBinder(typeof(HttpQueryStringModelBinder))] FormCollection queryStrings)
        {
            return TreeNodeCollection.Empty;

        }

        protected override ActionResult<TreeNode?> CreateRootNode(FormCollection queryStrings)
        {
            var rootResult = base.CreateRootNode(queryStrings);
            if (!(rootResult.Result is null))
            {
                return rootResult;
            }

            var root = rootResult.Value;

            //optionally setting a routepath would allow you to load in a custom UI instead of the usual behaviour for a tree
            root.RoutePath = "stores/storesTree/overview";
            // set the icon
            root.Icon = "icon-hearts";
            // set to false for a custom tree with a single node.
            root.HasChildren = false;
            //url for menu
            root.MenuUrl = null;

            return root;
        }



    }
}
