import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../../Styles/PeoplePageModals.css";
import { PersonPayment } from "../../../Interfaces/PersonPayment";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import * as Api from '../../../APIs/HistoryApi';
import { Transaction } from "../../../Interfaces/Transaction";
import { format, parseISO } from 'date-fns';
import '../../../Styles/PeoplePageModals.css';

function TransactionPage() {
    const { id } = useParams<{ id: string }>();
    const [transactionPayments, setTransactionPayments] = useState<PersonPayment[]>([]);
    const [transactionInfo, setTransacrionInfo] = useState<Transaction>();

    useEffect(() => {
        updateTransactionPayments();
        updateTransactionInfo();
    }, [id]);

    const updateTransactionPayments = async () => {
        const transactions = await Api.getTransactionPayments(Number(id));
        setTransactionPayments(transactions);
    };

    const updateTransactionInfo = async () => {
        const transactions = await Api.getTransaction(Number(id));
        setTransacrionInfo(transactions);
    };

    return (
        <TableContainer component={Paper}>
            <hr />
            <div className="Caption">Transaction info</div>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Transaction ID</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Participants Count</TableCell>
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
                        <TableCell>{transactionInfo?.dollarsSum}</TableCell>
                        <TableCell>{transactionInfo?.hryvniaSum}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <hr />
            <div className="Caption">Payments</div>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Percent/Rate</TableCell>
                        <TableCell>Currency</TableCell>
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
                            <TableCell>{payment.hryvnia / payment.dollar}</TableCell>
                            <TableCell>{payment.hryvnia}</TableCell>
                            <TableCell>{payment.dollar}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default TransactionPage;
