using CRUDAppBackend.DB;

namespace CRUDAppBackend.DTOs
{
    public class PersonPaymentDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool IsPercent { get; set; }
        public double Rate { get; set; }
        public double Dollar { get; set; }
        public double Hryvnia { get; set; }
    }
}
