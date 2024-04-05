using Umbraco.Cms.Core.Sections;

namespace Connect.Infrastructure.CustomSections
{
    public class StoreSection : ISection
    {
        public string Alias => "stores";

        public string Name => "Stores";
    }

}
