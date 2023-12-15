import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox } from "@mui/material";
import { Person } from "../../../Interfaces/Person";
import { CreateContext } from "../../../context/context";
import { GetPersonsContext } from "../../../App";
import { useState } from "react";

interface AddMembersModalTableProps {
    selectedPersons: Person[];
    setSelectedPersons: (persons: Person[] | any) => void;
}

const AddMembersModalTable = ({ selectedPersons, setSelectedPersons }: AddMembersModalTableProps) => {
    const { persons } = CreateContext(GetPersonsContext);
    const [selectAll, setSelectAll] = useState(false);

    const handleCheckboxChange = (person: Person) => {
        const isPersonSelected = selectedPersons.some(
            (selectedPerson) => selectedPerson.id === person.id
        );
    
        const updateSelectedPersons = (newSelectedPersons: Person[]) => {
            if (newSelectedPersons.length === persons.length) {
                setSelectAll(true);
            } else {
                setSelectAll(false);
            }
            setSelectedPersons(newSelectedPersons);
        };
    
        setSelectedPersons((prevSelectedPersons: Person[]) => {
            const updatedPersons = isPersonSelected
                ? prevSelectedPersons.filter(
                    (selectedPerson) => selectedPerson.id !== person.id
                )
                : [...prevSelectedPersons, person];
    
            updateSelectedPersons(updatedPersons);
    
            return updatedPersons;
        });
    };



    const handleSelectAllChange = () => {
        if (!selectAll) {
            setSelectedPersons(persons);
        } else {
            setSelectedPersons([]);
        }
        setSelectAll(!selectAll);
    };

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Checkbox
                                checked={selectAll}
                                onChange={handleSelectAllChange}
                            />
                        </TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Percent</TableCell>
                        <TableCell>Rate</TableCell>
                        <TableCell>Role</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {persons.map((row: Person) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell>
                                <Checkbox
                                    checked={selectedPersons.some(
                                        (selectedPerson) => selectedPerson.id === row.id
                                    )}
                                    onChange={() => handleCheckboxChange(row)}
                                />
                            </TableCell>
                            <TableCell>{row.name}</TableCell>
                            {row.isPercent ? (
                                <>
                                    <TableCell>{row.rate}</TableCell>
                                    <TableCell>-</TableCell>
                                </>
                            ) : (
                                <>
                                    <TableCell>-</TableCell>
                                    <TableCell>{row.rate}</TableCell>
                                </>
                            )}
                            <TableCell>{row.role}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default AddMembersModalTable;