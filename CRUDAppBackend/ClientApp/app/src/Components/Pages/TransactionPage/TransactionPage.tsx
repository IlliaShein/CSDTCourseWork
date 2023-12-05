import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../../Styles/PeoplePageModals.css";
import { PersonPayment } from "../../../Interfaces/PersonPayment";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import * as Api from '../../../APIs/HistoryApi';

function TransactionPage() {
    const { id } = useParams<{ id: string }>();
    const [transactionPayments, setTransactionPayments] = useState<PersonPayment[]>([]);

    useEffect(() => {
        updateTransactionPayments();
    }, [id]);

    const updateTransactionPayments = async () => {
        const transactions = await Api.getTransactionPayments(Number(id));
        setTransactionPayments(transactions);
    };

    return (
        <div>
            <TableContainer component={Paper}>
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
                                <TableCell>{payment.hryvnia/payment.dollar}</TableCell>
                                <TableCell>{payment.hryvnia}</TableCell>
                                <TableCell>{payment.dollar}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default TransactionPage;
