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
        public async Task<IActionResult> GetTransactions()
        {
            var transactions = await _historyManager.GetTransactions();
            return Ok(transactions);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTransaction(int id)
        {
            var transaction = await _historyManager.GetTransactionById(id);
            return Ok(transaction);
        }

        [HttpGet("{id}/payments")]
        public async Task<IActionResult> GetPersonPaymentsByTransactionId(int id)
        {
            var payments = await _historyManager.GetPersonPaymentsByTransactionId(id);
            return Ok(payments);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTransaction(int id)
        {
            await _historyManager.DeleteTransaction(id);
            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> CreateTransaction(PersonPaymentDTO[] payments)
        {
            await _historyManager.CreateTransaction(payments);
            return Ok();
        }
    }
}
