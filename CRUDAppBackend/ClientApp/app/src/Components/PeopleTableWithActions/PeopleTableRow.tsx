import { TableCell, TableRow } from '@mui/material';
import { Person } from '../../Interfaces/Person';
import PeopleTableActionButtons from './PeopleTableActionButtons';

interface PersonRowProps {
  person: Person;
}

function PeopleTableRow({ person }: PersonRowProps) {
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
        <PeopleTableActionButtons person = {person}/>
      </TableCell>
    </TableRow>
  );
}

export default PeopleTableRow;
