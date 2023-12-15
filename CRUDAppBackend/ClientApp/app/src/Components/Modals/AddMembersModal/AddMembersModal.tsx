import { useState } from "react";
import { Box, Modal, Button } from "@mui/material";
import { Person } from "../../../Interfaces/Person";
import '../../../Styles/PeoplePageModals.css';
import AddMembersModalTable from "./AddMembersModalTable";

interface AddPersonModalProps {
  open: boolean;
  onClose: () => void;
  getSelectedPersons: (persons: Person[]) => void;
}

export default function AddMembersModal({ open, onClose, getSelectedPersons, }: AddPersonModalProps) {
  const [selectedPersons, setSelectedPersons] = useState<Person[]>([]);

  const handleClose = () => {
    onClose();
  };

  const addButtonClicked = () => {
    selectedPersons.sort((a) => (a.isPercent ? 1 : -1));
    getSelectedPersons(selectedPersons);
    setSelectedPersons([]);
    handleClose();
  };

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box className="modal-container-md">
          <div className="Caption">
            Add Members
          </div>
          <AddMembersModalTable
          selectedPersons={selectedPersons}
          setSelectedPersons={setSelectedPersons}
          />
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
