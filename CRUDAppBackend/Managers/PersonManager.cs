using AutoMapper;
using CRUDAppBackend.DB;
using CRUDAppBackend.DTOs;
using CRUDAppBackend.Interfaces;
using DbLib.Models.EntityFramework;
using Microsoft.EntityFrameworkCore;

namespace CRUDAppBackend.Managers
{
    public class PersonManager : Manager, IPersonManager
    {
        public PersonManager(MyDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
        {
        }

        public async Task<List<PersonDTO>> GetAll()
        {
            var people = await DbContext.Persons.ToListAsync();
            return Mapper.Map<List<PersonDTO>>(people);
        }

        public async Task<PersonDTO> GetById(int id)
        {
            var person = await DbContext.Persons.FindAsync(id);
            return Mapper.Map<PersonDTO>(person);
        }

        public async Task Create(PersonDTO personDto)
        {
            var person = Mapper.Map<Person>(personDto);
            await DbContext.Persons.AddAsync(person);
            await DbContext.SaveChangesAsync();
        }

        public async Task Delete(int id)
        {
            var person = await DbContext.Persons.FindAsync(id);
            if (person == null)
            {
                throw new InvalidOperationException($"Person with id \"{id}\" not found");
            }

            DbContext.Persons.Remove(person);
            await DbContext.SaveChangesAsync();
        }

        public async Task Change(PersonDTO changedPersonDto)
        {
            var existingPerson = await DbContext.Persons.FindAsync(changedPersonDto.Id);
            if (existingPerson == null)
            {
                throw new InvalidOperationException($"Person with id \"{changedPersonDto.Id}\" not found");
            }

            Mapper.Map(changedPersonDto, existingPerson);
            await DbContext.SaveChangesAsync();
        }
    }
}
