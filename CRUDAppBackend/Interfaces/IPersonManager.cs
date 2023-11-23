using CRUDAppBackend.DTOs;

namespace CRUDAppBackend.Interfaces
{
    public interface IPersonManager
    {
        Task<List<PersonDTO>> GetAll();
        Task<PersonDTO> GetById(int id);
        Task Create(PersonDTO person);
        Task Delete(int id);
        Task Change(PersonDTO changedPerson);
    }
}
