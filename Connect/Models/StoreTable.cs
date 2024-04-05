namespace Connect.Models
{
    public class StoreTable
    {
        public int StoreId { get; set; }
        public int TableId { get; set; }
        public Guid? OrderId { get; set; }
    }

    public class TablerOrder
    {
        public Guid? OrderId { get; set; }
        public List<OrderItem> OrderItems { get; set; }
    }

    public class OrderItem
    {
        public string ItemName { get; set; }
        public string ItemDescription { get; set; }
        public int ItemQuantity { get; set; }


    }
}
