import React, { useState } from 'react';
import { Button, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Person } from '../../Interfaces/Person';
import * as Api from '../../APIs/Api';
import { CreateContext } from '../../context/context';
import { GetPersonsContext } from '../../Pages/PeoplePage';
import PeopleTableModalsComponent from './PeopleTableModalsComponent';

interface ActionButtonsProps {
    person: Person;
}

const PeopleTableActionButtons: React.FC<ActionButtonsProps> = ({ person}) => {
    const { updatePersons } = CreateContext(GetPersonsContext);
    const [modalType, setModalType] = useState<string | null>(null);
    const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

    const deletePerson = async () => {
        await Api.RemovePerson(person.id);
        updatePersons();
    };

    const handleOpenModal = (type: string, person: Person) => {
        setModalType(type);
        setSelectedPerson(person);
    };

    const handleCloseModal = () => {
        setModalType(null);
        setSelectedPerson(null);
        updatePersons();
    };

    return (
        <div>
            <Stack direction="row" spacing={2}>
                <Button variant="contained" onClick={() => handleOpenModal("edit",person)}>
                    Edit
                </Button>
                <Button variant="contained" color="error" startIcon={<DeleteIcon />} onClick={deletePerson}>
                    Delete
                </Button>
                <Button variant="contained" onClick={() => handleOpenModal("view",person)}>
                    View
                </Button>
            </Stack>
            <PeopleTableModalsComponent
                modalType={modalType}
                selectedPerson={selectedPerson}
                onClose={handleCloseModal}
            />
        </div>

    );
};

export default PeopleTableActionButtons;
