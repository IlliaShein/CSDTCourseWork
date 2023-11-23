import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';
import { Person } from '../../Interfaces/Person';

interface ViewPersonModalProps {
  person: Person;
  open: boolean;
  onClose: () => void;
}

export default function ViewPersonModal({ person, open, onClose }: ViewPersonModalProps) {
  const handleClose = () => onClose();

  return (
    <Modal open={open} onClose={handleClose}>
      <Box className="modal-container">
        <Typography className="modal-title" sx={{ mt: 2 }}>
          View Person
        </Typography>
        <div className="info-block">
          <hr />
          <div>Id: {person.id}</div>
          <div>Name: {person.name}</div>
          <div>Role: {person.role}</div>
          <div>Salary type: {person.isPercent ? ' percent' : ' rate'}</div>
          <div>Rate: {person.rate}</div>
          <hr />
          <div>Phone: {person.phoneNumber}</div>
          <div>Email: {person.email}</div>
          <hr />
        </div>
        <Button variant="contained" onClick={handleClose}>
          Back
        </Button>
      </Box>
    </Modal>
  );
}
