namespace Connect.Models
{
    public class ContactFormModel
    {
        public string Subject { get; set; } = "";
        public string FirstName { get; set; } = "";
        public string LastName { get; set; } = "";
        public string Tel { get; set; } = "";
        public string Email { get; set; } = "";
        public string Message { get; set; } = "";
        public bool TermsAccepted { get; set; } = false;

    }
}
