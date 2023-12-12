import { useState } from "react";
import { Box, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, Button, } from "@mui/material";
import { GetPersonsContext } from "../../App";
import { CreateContext } from "../../context/context";
import { Person } from "../../Interfaces/Person";
import '../../Styles/PeoplePageModals.css';
import React from "react";

interface AddPersonModalProps {
  open: boolean;
  onClose: () => void;
  getSelectedPersons: (persons: Person[]) => void;
}

export default function AddMembersModal({
  open,
  onClose,
  getSelectedPersons,
}: AddPersonModalProps) {
  const [selectedPersons, setSelectedPersons] = useState<Person[]>([]);
  const { persons } = CreateContext(GetPersonsContext);
  const [selectAll, setSelectAll] = useState(false);

  const handleClose = () => {
    onClose();
  };

  const addButtonClicked = () => {
    selectedPersons.sort((a) => (a.isPercent ? 1 : -1));
    getSelectedPersons(selectedPersons);
    handleClose();
  };

  const handleCheckboxChange = (person: Person) => {
    const isPersonSelected = selectedPersons.some(
      (selectedPerson) => selectedPerson.id === person.id
    );

    if (isPersonSelected) {
      setSelectedPersons((prevSelectedPersons) =>
        prevSelectedPersons.filter(
          (selectedPerson) => selectedPerson.id !== person.id
        )
      );
    } else {
      setSelectedPersons((prevSelectedPersons) => [
        ...prevSelectedPersons,
        person,
      ]);
    }
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
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box className="modal-container-md">
          <div className="Caption">
            Add Members
          </div>
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
          <Button
            variant="contained"
            color="success"
            size="large"
            sx={{ marginTop: "9px" }}
            onClick={addButtonClicked}
          >
            Add
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
