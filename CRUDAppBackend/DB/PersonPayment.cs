namespace CRUDAppBackend.DB
{
    public class PersonPayment
    {
        public int Id { get; set; }
        public Transaction Transaction { get; set; }
        public string Name { get; set; }
        public bool IsPercent { get; set; }
        public double Rate { get; set; }
        public double Dollar { get; set; }
        public double Hryvnia { get; set; }

        public PersonPayment( string name, bool isPercent, double rate, double dollar, double hryvnia)
        {
            Name = name;
            IsPercent = isPercent;
            Rate = rate;
            Dollar = dollar;
            Hryvnia = hryvnia;
        }
    }
}
