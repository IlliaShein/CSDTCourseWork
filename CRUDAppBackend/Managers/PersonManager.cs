using AutoMapper;
using CRUDAppBackend.DTOs;
using CRUDAppBackend.Interfaces;
using DbLib.Models.EntityFramework;
using Microsoft.EntityFrameworkCore;
using ReactCRUD.DB;

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
            var people = await _dbContext.Person.ToListAsync();
            return _mapper.Map<List<PersonDTO>>(people);
        }

        public async Task<PersonDTO> GetById(int id)
        {
            var person = await _dbContext.Person.FindAsync(id);
            return _mapper.Map<PersonDTO>(person);
        }

        public async Task Create(PersonDTO personDto)
        {
            var person = _mapper.Map<Person>(personDto);
            await _dbContext.Person.AddAsync(person);
            await _dbContext.SaveChangesAsync();
        }

        public async Task Delete(int id)
        {
            var person = await _dbContext.Person.FindAsync(id);
            if (person == null)
            {
                throw new InvalidOperationException($"Person with id \"{id}\" not found");
            }

            _dbContext.Person.Remove(person);
            await _dbContext.SaveChangesAsync();
        }

        public async Task Change(PersonDTO changedPersonDto)
        {
            var existingPerson = await _dbContext.Person.FindAsync(changedPersonDto.Id);
            if (existingPerson == null)
            {
                throw new InvalidOperationException($"Person with id \"{changedPersonDto.Id}\" not found");
            }

            _mapper.Map(changedPersonDto, existingPerson);
            await _dbContext.SaveChangesAsync();
        }
    }
}
