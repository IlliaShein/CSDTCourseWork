using AutoMapper;
using CRUDAppBackend.DB;
using CRUDAppBackend.DTOs;
using CRUDAppBackend.Interfaces;
using DbLib.Models.EntityFramework;
using Microsoft.EntityFrameworkCore;

namespace CRUDAppBackend.Managers
{
    public class HistoryManager : IHistoryManager
    {
        private readonly MyDbContext _dbContext;
        private readonly IMapper _mapper;

        public HistoryManager(MyDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<List<TransactionDTO>> GetTransactions()
        {
           var transactions = await _dbContext.Transactions.ToListAsync();
           return _mapper.Map<List<TransactionDTO>>(transactions);
        }

        public async Task<TransactionDTO> GetTransaction(int id)
        {
            var transaction = await _dbContext.Transactions.FindAsync(id);
            if (transaction == null)
            {
                throw new InvalidOperationException($"Person with id \"{id}\" not found");
            }

            return _mapper.Map<TransactionDTO>(transaction);
        }

        public async Task<List<PersonPaymentDTO>> GetPersonPaymentsByTransactionId(int id)
        {
            var personPayments = await _dbContext.PersonPayments
                .Where(payment => payment.Transaction.Id == id)
                .ToListAsync();

            var personPaymentDTOs = personPayments.Select(payment => _mapper.Map<PersonPaymentDTO>(payment)).ToList();

            return personPaymentDTOs;
        }


        public async Task DeleteTransaction(int id)
        {
            var transactions = await _dbContext.Transactions.FindAsync(id);
            if (transactions == null)
            {
                throw new InvalidOperationException($"Person with id \"{id}\" not found");
            }

            _dbContext.Transactions.Remove(transactions);
            await _dbContext.SaveChangesAsync();
        }

        public async Task CreateTransaction(PersonPaymentDTO[] payments)
        {
            double dollarSum = payments.Sum(payment => payment.Dollar);
            double hryvniaSum = payments.Sum(payment => payment.Hryvnia);
            int participantsCount = payments.Length;

            Transaction newTransaction = new Transaction(dollarSum, hryvniaSum, participantsCount, DateTime.Now);
            await _dbContext.Transactions.AddAsync(newTransaction);
            await _dbContext.SaveChangesAsync();

            foreach (var payment in payments)
            {
                var newPersonPayment = _mapper.Map<PersonPayment>(payment);
                newPersonPayment.Transaction = newTransaction;
                await _dbContext.PersonPayments.AddAsync(newPersonPayment);
            }

            await _dbContext.SaveChangesAsync();
        }
    }
}