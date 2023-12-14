namespace CRUDAppBackend.DB
{
    public class Person
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Role { get; set; }
        public double Rate { get; set; }
        public bool IsPercent { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Email { get; set; }

        public Person(int id, string name, string role, double rate, bool isPercent, string? phoneNumber, string? email)
        {
            Id = id;
            Name = name;
            Role = role;
            Rate = rate;
            IsPercent = isPercent;
            PhoneNumber = phoneNumber;
            Email = email;
        }
    }
}
