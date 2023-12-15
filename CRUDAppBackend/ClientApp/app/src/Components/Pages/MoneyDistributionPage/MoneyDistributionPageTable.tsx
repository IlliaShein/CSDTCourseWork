import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { PersonPayment } from '../../../Interfaces/PersonPayment';

interface MoneyDistributionPageButtonsProps {
    selectedPersons: PersonPayment[];
}

const MoneyDistributionPageTable = ({ selectedPersons }: MoneyDistributionPageButtonsProps) => {

    return (
        <TableContainer component={Paper}>
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
                    {selectedPersons.map((row: PersonPayment) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell>{row.name}</TableCell>
                            {row.isPercent ? (
                                <TableCell>{row.rate} %</TableCell>
                            ) : (
                                <TableCell>{row.rate}</TableCell>
                            )}
                            <TableCell>{row.hryvnia}</TableCell>
                            <TableCell>{row.dollar}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default MoneyDistributionPageTable;
