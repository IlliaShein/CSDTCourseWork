import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { Person } from '../../Interfaces/Person';
import '../../Styles/Modal.css';
import PeopleTableRow from './PeopleTableRow';

interface ParentComponentProps {
  persons: Person[];
}

function ParentComponent({ persons }: ParentComponentProps) {
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
          {persons.map((person) => (
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
