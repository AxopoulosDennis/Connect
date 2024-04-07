using Umbraco.Cms.Core.Models.Blocks;

namespace Connect.Models
{
    public class ProductModel
    {
        //the parent node of product
        public string PageId { get; set; }
        public string SectionKey { get; set; }
        public string ProductKey { get; set; }
        public string? ProductName { get; set; }
        public decimal QuantityInBasket { get; set; }
        public List<ProductIngredient> Ingredients { get; set; } = new List<ProductIngredient>();
        public List<ProductExtra> Extras { get; set; } = new List<ProductExtra>();
        public string Comments { get; set; } = "";
        public decimal OriginalPrice { get; set; }
        public string DiscountType { get; set; }
        public decimal DiscountAmount { get; set; }
        public decimal FinalPrice { get; set; }
        public decimal TotalPrice { get; set; }
        public bool IsFood { get; set; } = false;

        public ProductModel()
        {
            
        }


        public ProductModel(BlockListItem product, string pageId, string sectionKey, string productKey)
        {
            var productName = product.Content.Value<string>("itemName") ?? "";
            decimal originalPrice = product.Content.Value<decimal>("originalPrice");
            bool activateDiscount = product.Content.Value<bool>("activateDiscount");
            string discountType = product.Content.Value<string>("discountType") ?? "";
            decimal discountAmount = product.Content.Value<decimal>("discountAmount");
            decimal finalPrice = originalPrice;
            var alias = product.Content.ContentType.Alias;
            var ingredients = product.Content.Value<string[]>("itemIngredients");
            var addExtra = product.Content.Value<IEnumerable<BlockListItem>>("addExtra");


            if (discountType == "Final Price")
            {
                finalPrice = discountAmount;
            }
            else if (discountType == "Fixed Price")
            {
                finalPrice = originalPrice - discountAmount;
            }
            else if (discountType == "Percentage")
            {
                var discountPercentage = (discountAmount / 100) * (originalPrice / 1);
                finalPrice = Math.Ceiling((finalPrice - discountPercentage) * 20) / 20;

            }


            PageId = pageId ?? "";
            SectionKey = sectionKey ?? "";
            ProductKey = productKey ?? "";
            ProductName = productName ?? "";
            QuantityInBasket = 1;
            OriginalPrice = originalPrice;
            DiscountType = discountType;
            DiscountAmount = discountAmount;
            FinalPrice = finalPrice;
            TotalPrice = finalPrice * QuantityInBasket;
            
            if (ingredients?.Any() ?? false)
            {
                foreach (var ingredient in ingredients)
                {
                    var ing = new ProductIngredient(ingredient);
                    Ingredients.Add(ing);
                }
            }

            if (addExtra?.Any() ?? false)
            {
                foreach (var extra in addExtra)
                {
                    var ex = new ProductExtra(extra);
                    Extras.Add(ex);
                }
            }



            if (alias == "foodItem")
            {
                IsFood = true;
            }
        }

        public class ProductIngredient
        {
            public string IngredientName { get; set; }
            public bool IsIngredientSelected { get; set; }

            public ProductIngredient(string name)
            {
                IngredientName = name;
                IsIngredientSelected = true;
            }
        }

        public class ProductExtra
        {
            public string ExtraName { get; set; }
            public decimal ExtraPrice { get; set; }
            public bool IsExtraSelected { get; set; }

            public ProductExtra()
            {
                
            }

            public ProductExtra(BlockListItem item)
            {
                var extraName = item.Content.Value<string>("ingredientName");
                var extraCost = item.Content.Value<decimal>("extraCost");

                ExtraName = extraName ?? "";
                ExtraPrice = extraCost;
                IsExtraSelected = false;
            }
        }
    }

}
