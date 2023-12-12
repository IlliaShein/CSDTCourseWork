import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import React, { useEffect, useState } from "react";
import * as Api from '../../../APIs/HistoryApi'
import { PersonPayment } from "../../../Interfaces/PersonPayment";

interface TransactionInfoTableProps {
    id: string | undefined
}

function PaymentsTable({ id }: TransactionInfoTableProps) {
    const [transactionPayments, setTransactionPayments] = useState<PersonPayment[]>([]);
    

    useEffect(() => {
        updateTransactionPayments();
    }, [id]);

    const updateTransactionPayments = async () => {
        const transactions = await Api.getTransactionPayments(Number(id));
        setTransactionPayments(transactions);
    };

    return (
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Percent/Rate</TableCell>
                        <TableCell>Hryvnia</TableCell>
                        <TableCell>Dollar</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {transactionPayments.map((payment: PersonPayment) => (
                        <TableRow
                            key={payment.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell>{payment.name}</TableCell>
                            {payment.isPercent ? (
                                <TableCell>{payment.rate} %</TableCell>
                            ) : (
                                <TableCell>{payment.rate}</TableCell>
                            )}
                            <TableCell>{payment.hryvnia}</TableCell>
                            <TableCell>{payment.dollar}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
    );
}

export default PaymentsTable;
