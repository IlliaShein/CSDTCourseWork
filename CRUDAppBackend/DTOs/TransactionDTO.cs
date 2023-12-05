using CRUDAppBackend.DB;

namespace CRUDAppBackend.DTOs
{
    public class TransactionDTO
    {
        public int Id { get; set; }
        public double DollarsSum { get; set; }
        public double HryvniaSum { get; set; }
        public int ParticipantsCount { get; set; }
        public DateTime CreationTime { get; set; }
    }
}
