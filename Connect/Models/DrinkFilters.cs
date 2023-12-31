namespace Connect.Models
{
    public class DrinkFilters
    {
        public List<decimal> Alcohol { get; set; } = new();
        public List<int> IBU { get; set; } = new();
        public List<int> ML { get; set; } = new();
        public List<string> ServedIn { get; set; } = new();
        public List<string> Countries { get; set; } = new();
        public List<int> Spiciness { get; set; } = new();
        public List<int> Vintage { get; set; } = new();

    }
}
