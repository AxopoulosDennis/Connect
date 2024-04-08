namespace Connect.Infrastructure
{
    public static class OrdersHistoryActions
    {
        public const string InitializedOrder = "INITIALIZED ORDER";
        public const string BindedHistory = "BINDED HISTORY TO ODER";
        public const string BindedOrderToTable = "BINDED ODER TO TABLE";

    }

    public static class OrdersHistoryTypes
    {
        public const string Success = "SUCCESS";
        public const string Warning = "WARNING";
        public const string Error = "ERROR";
    }
}
