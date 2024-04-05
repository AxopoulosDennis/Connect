using System.Collections.Generic;
using Umbraco.Cms.Core.Events;
using Umbraco.Cms.Core.Models.Blocks;
using Umbraco.Cms.Core.Notifications;
using Umbraco.Cms.Web.Common;

namespace Connect.Infrastructure
{
    public class PublishedEvent : INotificationHandler<ContentPublishedNotification>
    {
        UmbracoHelper _umbracoHelper;


        public PublishedEvent(UmbracoHelper umbracoHelper)
        {
            _umbracoHelper = umbracoHelper;

        }

        public void Handle(ContentPublishedNotification notification)
        {
            //if(notification != null)
            //{
            //    var store = notification?.PublishedEntities?.FirstOrDefault();


            //    foreach (var node in notification.PublishedEntities)
            //    {
            //        if (node.ContentType.Alias.Equals("digitalMenu"))
            //        {
            //            var storeId = node?.Id;
            //            var storeName = node?.Name;

            //            var home = _umbracoHelper.ContentAtRoot().
            //                Where(x => x.IsDocumentType("digitalMenu")).Where(x => x.Id == storeId).FirstOrDefault();

            //            var menuSection = home?.Value<IEnumerable<BlockListItem>>("menuSections");

            //            //if (menuSections ?? false)
            //            //{
            //            //    menuSections = menuSections.Where(x => !x.Content.Value<bool>("hide"));
            //            //}/u
            //        }
            //    }
            //}

        }
    }


    public class RecycledEvent : INotificationHandler<ContentMovedToRecycleBinNotification>
    {

        public void Handle(ContentMovedToRecycleBinNotification notification)
        {
            if (notification != null)
            {

                foreach (var node in notification.MoveInfoCollection)
                {
                    if (node.Entity.ContentType.Alias.Equals("digitalMenu"))
                    {
                        var storeId = node?.Entity?.Id;
                        var storeName = node?.Entity?.Name;


                    }
                }

            }

        }


    }

}
