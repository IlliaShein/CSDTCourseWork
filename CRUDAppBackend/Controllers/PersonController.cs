using CRUDAppBackend.DTOs;
using CRUDAppBackend.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ReactCRUD.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PersonController : ControllerBase
    {
        IPersonManager _personManager;

        public PersonController(IPersonManager personManager)
        {
            _personManager = personManager;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var people = await _personManager.GetAll();
            return Ok(people);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var person = await _personManager.GetById(id);
            return Ok(person);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] PersonDTO person)
        {
            await _personManager.Create(person);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _personManager.Delete(id);
            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> Put([FromBody] PersonDTO changedPerson)
        {
            await _personManager.Change(changedPerson);
            return Ok();
        }
    }
}
