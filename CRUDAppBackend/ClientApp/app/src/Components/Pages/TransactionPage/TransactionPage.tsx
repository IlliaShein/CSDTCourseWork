import { useParams } from "react-router-dom";
import "../../../Styles/PeoplePageModals.css";
import { Paper,TableContainer,} from "@mui/material";
import '../../../Styles/PeoplePageModals.css';
import React from "react";
import TransactionInfoTable from "./TransactionInfoTable";
import PaymentsTable from "./PaymentsTable";

function TransactionPage() {
    const { id } = useParams<{ id: string }>();

    return (
        <TableContainer component={Paper}>
            <hr />
            <div className="Caption">Transaction info</div>
            <TransactionInfoTable id={id}/>
            <hr />
            <div className="Caption">Payments</div>
            <PaymentsTable id={id}/>
        </TableContainer>
    );
}

export default TransactionPage;
