import axios, { AxiosResponse } from 'axios';
import { Person } from '../Interfaces/Person';
import HandleErrors from './ErrorsHandling';


const baseUrl = 'https://localhost:7265/Person';

async function GetPersons(): Promise<Person[]> {
  return await HandleErrors<Person[]>(() => axios.get(baseUrl));
}

async function GetPersonById(personId: number): Promise<Person> {
  return await HandleErrors<Person>(() => axios.get(`${baseUrl}/${personId}`));
}

async function CreatePerson(newPerson: Person): Promise<Person> {
  return await HandleErrors<Person>(() => axios.post(baseUrl, newPerson));
}

async function RemovePerson(personId: number): Promise<void> {
  return await HandleErrors<void>(() => axios.delete(`${baseUrl}/${personId}`));
}

async function SavePersonEditing(person: Person): Promise<Person> {
  return await HandleErrors<Person>(() => axios.put(baseUrl, person));
}

export { GetPersons, GetPersonById, CreatePerson, RemovePerson, SavePersonEditing };
