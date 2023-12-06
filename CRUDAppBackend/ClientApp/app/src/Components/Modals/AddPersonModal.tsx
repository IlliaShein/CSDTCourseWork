import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import SaveCancelButtonsGroup from '../SaveCancelButtonsGroup';
import * as Api from '../../APIs/PeopleApi';
import { Person } from '../../Interfaces/Person';
import { FormControl, MenuItem, Select, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import InputLabel from '@mui/material/InputLabel';
import { CreateContext } from '../../context/context';
import { GetPersonsContext } from '../../App';
import '../../Styles/PeoplePageModals.css';

interface AddPersonModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AddPersonModel({ open, onClose }: AddPersonModalProps) {
  const { updatePersons } = CreateContext(GetPersonsContext);
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Person>();

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
        <div className="Caption">
          Add new Person
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register('name', { required: true })}
            id="outlined-basic"
            label="Name"
            variant="outlined"
            error={!!errors.name}
            helperText={errors.name?.type === 'required' && 'Name is required'}
          />
          <TextField
            {...register('role', { required: true })}
            id="outlined-basic"
            label="Role"
            variant="outlined"
            error={!!errors.role}
            helperText={errors.role?.type === 'required' && 'Role is required'}
          />
          <FormControl fullWidth >
            <InputLabel id="demo-simple-select-label">Salary type</InputLabel>
            <Controller
              name="isPercent"
              control={control}
              rules={{ required: 'Salary type is required' }}
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
          <TextField
            {...register('rate', {
              required: true,
              validate: (value) => !isNaN(Number(value)) || 'Rate must be a number',
            })}
            id="outlined-basic"
            label="Rate"
            variant="outlined"
            error={!!errors.rate}
            helperText={
              (errors.rate?.type === 'required' && 'Rate is required') ||
              (errors.rate?.type === 'validate' && errors.rate.message)
            }
          />
          <TextField
            {...register('phoneNumber')}
            id="outlined-basic"
            label="Phone"
            variant="outlined"
          />
          <TextField
            {...register('email')}
            id="outlined-basic"
            label="Email"
            variant="outlined"
          />
          <SaveCancelButtonsGroup SaveClick={handleSubmit(onSubmit)} CancelClick={handleClose} />
        </form>
      </Box>
    </Modal>
  );
}
