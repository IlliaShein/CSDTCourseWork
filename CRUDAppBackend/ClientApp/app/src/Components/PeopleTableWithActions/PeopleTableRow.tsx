import { TableCell, TableRow } from '@mui/material';
import { Person } from '../../Interfaces/Person';
import PeopleTableActionButtons from './PeopleTableActionButtons';
import * as Api from '../../APIs/Api';
import { useState } from 'react';
import PeopleTableModalsComponent from './PeopleTableModalsComponent';
import { CreateContext } from '../../context/context';
import { GetPersonsContext } from '../../Pages/PeoplePage';

interface PersonRowProps {
  person: Person;
}

function PeopleTableRow({ person }: PersonRowProps) {
  const { updatePersons } = CreateContext(GetPersonsContext);
  const [modalType, setModalType] = useState<string | null>(null);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  const handleOpenModal = (type: string, person: Person) => {
    setModalType(type);
    setSelectedPerson(person);
  };

  const handleCloseModal = () => {
    setModalType(null);
    setSelectedPerson(null);
    updatePersons();
  };

  const deletePerson = async () => {
    await Api.RemovePerson(person.id);
    updatePersons();
  };

  return (
    <TableRow key={person.id}>
      <TableCell>{person.name}</TableCell>
      {person.isPercent ? (
        <>
          <TableCell>{person.rate}</TableCell>
          <TableCell>{'-'}</TableCell>
        </>
      ) : (
        <>
          <TableCell>{'-'}</TableCell>
          <TableCell>{person.rate}</TableCell>
        </>
      )}
      <TableCell>{person.role}</TableCell>
      <TableCell>
        <PeopleTableActionButtons
          onEditClick={() => handleOpenModal("edit", person)}
          onViewClick={() => handleOpenModal("view", person)}
          onDeleteClick={deletePerson}
        />
      </TableCell>
      <PeopleTableModalsComponent
        modalType={modalType}
        selectedPerson={selectedPerson}
        onClose={handleCloseModal}
      />
    </TableRow>
  );
}

export default PeopleTableRow;
