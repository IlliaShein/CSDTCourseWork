using AutoMapper;
using CRUDAppBackend.DB;
using CRUDAppBackend.DTOs;
using CRUDAppBackend.Interfaces;
using DbLib.Models.EntityFramework;
using Microsoft.EntityFrameworkCore;

namespace CRUDAppBackend.Managers
{
    public class HistoryManager : Manager , IHistoryManager
    {
        public HistoryManager(MyDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
        {
        }

        public async Task<List<TransactionDTO>> GetTransactions()
        {
           var transactions = await DbContext.Transactions.ToListAsync();
           return Mapper.Map<List<TransactionDTO>>(transactions);
        }

        public async Task<TransactionDTO> GetTransactionById(int id)
        {
            var transaction = await DbContext.Transactions.FindAsync(id);
            if (transaction == null)
            {
                throw new InvalidOperationException($"Person with id \"{id}\" not found");
            }

            return Mapper.Map<TransactionDTO>(transaction);
        }

        public async Task<List<PersonPaymentDTO>> GetPersonPaymentsByTransactionId(int id)
        {
            var personPayments = await DbContext.PersonPayments
                .Where(p => p.Transaction.Id == id)
                .ToListAsync();

            var personPaymentDTOs = personPayments.Select(Mapper.Map<PersonPaymentDTO>).ToList();

            return personPaymentDTOs;
        }


        public async Task DeleteTransaction(int id)
        {
            var transaction = await DbContext.Transactions.FindAsync(id);
            if (transaction == null)
            {
                throw new InvalidOperationException($"Transaction with id \"{id}\" not found");
            }

            DbContext.Transactions.Remove(transaction);
            await DbContext.SaveChangesAsync();
        }

        public async Task CreateTransaction(PersonPaymentDTO[] paymentsDTO)
        {
            var payments = Mapper.Map<List<PersonPayment>>(paymentsDTO);

            Transaction newTransaction = CreateTransactionFromPayments(payments);
            await ConnectPaymentsToTransaction(payments, newTransaction);

            await DbContext.SaveChangesAsync();
        }

        private Transaction CreateTransactionFromPayments(List<PersonPayment> payments)
        {
            double dollarSum = payments.Sum(p => p.Dollar);
            double hryvniaSum = payments.Sum(p => p.Hryvnia);
            int participantsCount = payments.Count;

            return new Transaction(dollarSum, hryvniaSum, participantsCount, DateTime.Now);
        }

        private async Task ConnectPaymentsToTransaction(List<PersonPayment> payments, Transaction transaction)
        {
            foreach (var p in payments)
            {
                var newPersonPayment = Mapper.Map<PersonPayment>(p);
                newPersonPayment.Transaction = transaction;
                await DbContext.PersonPayments.AddAsync(newPersonPayment);
            }
        }
    }
}