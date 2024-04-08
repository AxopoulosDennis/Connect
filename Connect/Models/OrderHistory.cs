namespace Connect.Models
{
    public class OrderHistory
    {
        public int OrderHistoryId { get; set; }
        public string Action { get; set; } 

        public DateTime CreateDateTime { get; set; }
    }
}
