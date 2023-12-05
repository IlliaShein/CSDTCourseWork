import axios from 'axios';
import { Transaction } from '../Interfaces/Transaction';
import HandleErrors from './ErrorsHandling';
import { PersonPayment } from '../Interfaces/PersonPayment';

const baseUrl = 'https://localhost:7265/History';

async function getTransactions(): Promise<Transaction[]> {
  return await HandleErrors<Transaction[]>(() => axios.get(baseUrl));
}

async function getTransactionPayments(id: number): Promise<PersonPayment[]> {
  return await HandleErrors<PersonPayment[]>(() => axios.get(`${baseUrl}/${id}`));
}

async function deleteTransaction(transactionId: number): Promise<void> {
  return await HandleErrors<void>(() => axios.delete(`${baseUrl}/${transactionId}`));
}

async function createTransaction(payments: PersonPayment[]): Promise<void> {
  return await HandleErrors<void>(() => axios.post(baseUrl, payments));
}

export { getTransactions, deleteTransaction, createTransaction, getTransactionPayments };