using AutoMapper;
using CRUDAppBackend.DTOs;
using CRUDAppBackend.Interfaces;
using DbLib.Models.EntityFramework;
using Microsoft.EntityFrameworkCore;
using ReactCRUD.DB;
using System.Transactions;

namespace CRUDAppBackend.Managers
{
    public class PersonManager : IPersonManager
    {
        private readonly MyDbContext _dbContext;
        private readonly IMapper _mapper;

        public PersonManager(MyDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<List<PersonDTO>> GetAll()
        {
            var people = await _dbContext.Persons.ToListAsync();
            return _mapper.Map<List<PersonDTO>>(people);
        }

        public async Task<PersonDTO> GetById(int id)
        {
            var person = await _dbContext.Persons.FindAsync(id);
            return _mapper.Map<PersonDTO>(person);
        }

        public async Task Create(PersonDTO personDto)
        {
            var person = _mapper.Map<Person>(personDto);
            await _dbContext.Persons.AddAsync(person);
            await _dbContext.SaveChangesAsync();
        }

        public async Task Delete(int id)
        {
            var person = await _dbContext.Persons.FindAsync(id);
            if (person == null)
            {
                throw new InvalidOperationException($"Person with id \"{id}\" not found");
            }

            _dbContext.Persons.Remove(person);
            await _dbContext.SaveChangesAsync();
        }

        public async Task Change(PersonDTO changedPersonDto)
        {
            var existingPerson = await _dbContext.Persons.FindAsync(changedPersonDto.Id);
            if (existingPerson == null)
            {
                throw new InvalidOperationException($"Person with id \"{changedPersonDto.Id}\" not found");
            }

            _mapper.Map(changedPersonDto, existingPerson);
            await _dbContext.SaveChangesAsync();
        }
    }
}
