import React, { useState } from 'react';
import { Button } from '@mui/material';
import AddPersonModal from './Modals/AddPersonModal';

const AddButtonWithModal: React.FC = () => {
    const [isAddPersonModalOpen, setAddPersonModalOpen] = useState(false);

    const handleAddButtonClick = () => {
        setAddPersonModalOpen(true);
    };

    const handleModalClose = () => {
        setAddPersonModalOpen(false);
    };

    return (
        <div>
            <Button
                variant="contained"
                color="success"
                size="large"
                sx={{ marginTop: '9px' }}
                onClick={handleAddButtonClick}
            >
                Add
            </Button>

            <AddPersonModal
                open={isAddPersonModalOpen}
                onClose={handleModalClose}
            />
        </div>
    );
};

export default AddButtonWithModal;
