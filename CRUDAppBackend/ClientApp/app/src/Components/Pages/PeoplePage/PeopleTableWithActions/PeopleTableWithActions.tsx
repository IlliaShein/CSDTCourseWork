import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, } from '@mui/material';
import PeopleTableRow from './PeopleTableRow';
import { CreateContext } from '../../../../context/context';
import { GetPersonsContext } from '../../../../App';
import { Person } from '../../../../Interfaces/Person';

function ParentComponent() {
  const { persons } = CreateContext(GetPersonsContext);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Percent</TableCell>
            <TableCell>Rate</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {persons.map((person: Person) => (
            <PeopleTableRow
              key={person.id}
              person={person}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ParentComponent;
