namespace CRUDAppBackend.DB
{
    public class Transaction
    {
        public int Id { get; set; }
        public double DollarsSum { get; set; }
        public double HryvniaSum { get; set; }
        public int ParticipantsCount { get; set; }
        public DateTime CreationTime { get; set; }
        public List<PersonPayment> Payments { get; set; }

        public Transaction(double dollarsSum, double hryvniaSum, int participantsCount, DateTime creationTime)
        {
            DollarsSum = dollarsSum;
            HryvniaSum = hryvniaSum;
            ParticipantsCount = participantsCount;
            CreationTime = creationTime;
        }
    }
}
