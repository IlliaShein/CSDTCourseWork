using CRUDAppBackend.DTOs;
using CRUDAppBackend.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CRUDAppBackend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HistoryController : ControllerBase
    {
        private IHistoryManager _historyManager;

        public HistoryController(IHistoryManager historyManager)
        {
            _historyManager = historyManager;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var transactions = await _historyManager.GetTransactions();
            return Ok(transactions);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPersonPaymentsByTransactionId(int id)
        {
            var payments = await _historyManager.GetPersonPaymentsByTransactionsId(id);
            return Ok(payments);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _historyManager.DeleteTransaction(id);
            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> Post(PersonPaymentDTO[] payments)
        {
            await _historyManager.CreateTransaction(payments);
            return Ok();
        }
    }
}
