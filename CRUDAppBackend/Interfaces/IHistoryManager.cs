using CRUDAppBackend.DTOs;

namespace CRUDAppBackend.Interfaces
{
    public interface IHistoryManager
    {
        Task<List<TransactionDTO>> GetTransactions();
        Task<List<PersonPaymentDTO>> GetPersonPaymentsByTransactionsId(int id);
        Task DeleteTransaction(int id);
        Task CreateTransaction(PersonPaymentDTO[] payments);
    }
}
