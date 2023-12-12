import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { format, parseISO } from 'date-fns';
import React, { useEffect, useState } from "react";
import { Transaction } from "../../../Interfaces/Transaction";
import * as Api from '../../../APIs/HistoryApi'

interface TransactionInfoTableProps {
    id: string | undefined
}

function TransactionInfoTable({ id }: TransactionInfoTableProps) {
    const [transactionInfo, setTransacrionInfo] = useState<Transaction>();

    useEffect(() => {
        updateTransactionInfo();
    }, [id]);

    const updateTransactionInfo = async () => {
        const transactions = await Api.getTransaction(Number(id));
        setTransacrionInfo(transactions);
    };

    return (
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell>Transaction ID</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Participants Count</TableCell>
                    <TableCell>Currency</TableCell>
                    <TableCell>Dollar</TableCell>
                    <TableCell>Hryvnia</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow
                    key={transactionInfo?.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell>{transactionInfo?.id}</TableCell>
                    <TableCell>{transactionInfo?.creationTime ? format(parseISO(transactionInfo.creationTime.toString()), 'MM/dd/yyyy HH:mm') : ''}</TableCell>
                    <TableCell>{transactionInfo?.participantsCount}</TableCell>
                    <TableCell>
                        {transactionInfo?.dollarsSum && transactionInfo?.dollarsSum !== 0
                            ? (transactionInfo.hryvniaSum / transactionInfo.dollarsSum).toFixed(2)
                            : '-'}
                    </TableCell>
                    <TableCell>{transactionInfo?.dollarsSum}</TableCell>
                    <TableCell>{transactionInfo?.hryvniaSum}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
}

export default TransactionInfoTable;
