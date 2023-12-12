import { Button, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import * as Api from '../../../APIs/HistoryApi';
import { Transaction } from '../../../Interfaces/Transaction';
import { CreateContext } from '../../../context/context';
import { GetTransactionsContext } from './HistoryPage';
import React from 'react';

interface TransactionsTableActionButtonsProps {
  transaction: Transaction;
}

const TransactionsTableActionButtons = ({ transaction }: TransactionsTableActionButtonsProps) => {
  const { updateTransactions } = CreateContext(GetTransactionsContext);
  const navigate = useNavigate();

  const deleteTransaction = async () => {
    await Api.deleteTransaction(transaction.id);
    updateTransactions();
  };

  const viewTransaction = () => {
    navigate(`/History/${transaction.id}`);
  };

  return (
    <Stack direction="row" spacing={2}>
      <Button variant="contained" color="error" startIcon={<DeleteIcon />} onClick={deleteTransaction}>
        Delete
      </Button>
      <Button variant="contained" onClick={viewTransaction}>
        View
      </Button>
    </Stack>
  );
};

export default TransactionsTableActionButtons;
