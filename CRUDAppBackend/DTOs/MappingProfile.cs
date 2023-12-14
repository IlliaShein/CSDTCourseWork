using AutoMapper;
using CRUDAppBackend.DB;

namespace CRUDAppBackend.DTOs
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<PersonDTO, Person>().ReverseMap();
            CreateMap<Transaction, TransactionDTO>().ReverseMap();
            CreateMap<PersonPayment, PersonPaymentDTO>().ReverseMap();
        }


    }
}
