namespace CRUDAppBackend.DTOs
{
    public class PersonDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Role { get; set; }
        public double Rate { get; set; }
        public bool IsPercent { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Email { get; set; }
    }
}
