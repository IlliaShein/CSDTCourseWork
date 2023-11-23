import React from 'react';
import { Button, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface ActionButtonsProps {
    onEditClick: () => void;
    onDeleteClick: () => void;
    onViewClick: () => void;
}

const PeopleTableActionButtons: React.FC<ActionButtonsProps> = ({ onEditClick, onDeleteClick, onViewClick }) => {

    return (
        <Stack direction="row" spacing={2}>
            <Button variant="contained" onClick={onEditClick}>
                Edit
            </Button>
            <Button variant="contained" color="error" startIcon={<DeleteIcon />} onClick={onDeleteClick}>
                Delete
            </Button>
            <Button variant="contained" onClick={onViewClick}>
                View
            </Button>
        </Stack>
    );
};

export default PeopleTableActionButtons;
