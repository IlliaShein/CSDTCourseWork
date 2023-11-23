import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import SaveCancelButtonsGroup from '../SaveCancelButtonsGroup';
import * as Api from '../../APIs/Api';
import { Person } from '../../Interfaces/Person';
import { FormControl, MenuItem, Select, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import InputLabel from '@mui/material/InputLabel';
import { CreateContext } from '../../context/context';
import { GetPersonsContext } from '../../Pages/PeoplePage';

interface AddPersonModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AddPersonModel({ open, onClose }: AddPersonModalProps) {
  const { updatePersons } = CreateContext(GetPersonsContext);
  const { control, register, handleSubmit, reset } = useForm<Person>();

  const handleClose = () => {
    reset();
    onClose();
  }

  const onSubmit = async (newPersonData: Person) => {
    newPersonData.isPercent = Boolean(newPersonData.isPercent);

    await Api.CreatePerson(newPersonData);
    updatePersons();
    reset();
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box className="modal-container">
        <Typography className="modal-title" sx={{ mt: 2 }}>
          Add new Person
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
        <TextField {...register('name')} id="outlined-basic" label="Name" variant="outlined" />
        <TextField {...register('role')} id="outlined-basic" label="Role" variant="outlined" />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Salary type</InputLabel>
            <Controller
              name="isPercent"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                >
                  <MenuItem value={1}>percent</MenuItem>
                  <MenuItem value={0}>rate</MenuItem>
                </Select>
              )}
            />
          </FormControl>
          <TextField {...register('rate')} id="outlined-basic" label="Rate" variant="outlined" />
          <TextField {...register('phoneNumber')} id="outlined-basic" label="Phone" variant="outlined" />
          <TextField {...register('email')} id="outlined-basic" label="Email" variant="outlined" />
          <SaveCancelButtonsGroup SaveClick={handleSubmit(onSubmit)} CancelClick={handleClose} />
        </form>
      </Box>
    </Modal>
  );
}
