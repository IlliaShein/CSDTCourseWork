import { Box, Button, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import CurrencyButtons from "./CurrencyButtons";
import { useState } from "react";
import AddMembersModal from "../../Modals/AddMembersModal";
import "../../../Styles/MoneyDistributionPageModals.css";
import { Person } from "../../../Interfaces/Person";
import { PersonPayment } from "../../../Interfaces/PersonPayment";
import * as Api from '../../../APIs/HistoryApi';

function MoneyDistributionPage() {
  const [isAddMembersModalOpen, setAddMembersModalOpen] = useState(false);
  const [selectedPersons, setSelectedPersons] = useState<PersonPayment[]>([]);
  const [dollarValue, setDollarValue] = useState<number>(0);
  const [hryvniaValue, setHryvniaValue] = useState<number>(0);
  const [currency, setCurrency] = useState<number>(0);

  const handleAddButtonClick = () => {
    setAddMembersModalOpen(true);
  };

  const handleModalClose = () => {
    setAddMembersModalOpen(false);
  };

  const refineTableAfterCurrencyChanging = () => {
    if (selectedPersons.length === 0) {
      return;
    }

    let dollarsRest = dollarValue;
    const updatedSelectedPersons = selectedPersons.map(
      (personPayment: PersonPayment) => {
        let updatedPersonPayment: PersonPayment;

        if (personPayment.isPercent) {
          let dollar = dollarsRest / 100 * personPayment.rate;
          dollar = parseFloat(dollar.toFixed(2));

          let hryvnia = dollar * currency;
          hryvnia = parseFloat(hryvnia.toFixed(2));

          updatedPersonPayment = {
            ...personPayment,
            dollar,
            hryvnia,
          };
        } else {
          dollarsRest -= personPayment.rate;

          const dollar = parseFloat(personPayment.rate.toFixed(2));

          let hryvnia = dollar * currency;
          hryvnia = parseFloat(hryvnia.toFixed(2));

          updatedPersonPayment = {
            ...personPayment,
            dollar,
            hryvnia,
          };
        }

        return updatedPersonPayment;
      }
    );

    setSelectedPersons(updatedSelectedPersons);
  };

  const processTable = (persons: Person[]) => {
    let dollarsRest = dollarValue;
    const updatedSelectedPersons = persons.map((person: Person) => {
      const personPayment: PersonPayment = {
        id: 0,
        name: person.name,
        rate: person.rate,
        isPercent: person.isPercent,
        hryvnia: 0,
        dollar: 0,
      };

      if (personPayment.isPercent) {
        const dollarValue = dollarsRest / 100 * personPayment.rate;
        personPayment.dollar = parseFloat(dollarValue.toFixed(2));

        const hryvniaValue = dollarValue * currency;
        personPayment.hryvnia = parseFloat(hryvniaValue.toFixed(2));
      } else {
        dollarsRest -= personPayment.rate;

        personPayment.dollar = parseFloat(personPayment.rate.toFixed(2));

        const hryvniaValue = personPayment.dollar * currency;
        personPayment.hryvnia = parseFloat(hryvniaValue.toFixed(2));
      }

      return personPayment;
    });

    setSelectedPersons(updatedSelectedPersons);
  };

  const createTransaction = (payments: PersonPayment[]) => {
    if(payments.length != 0)
    {
      Api.createTransaction(payments);
    }
  }

  return (
    <div>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <CurrencyButtons
          dollarValue={dollarValue}
          hryvniaValue={hryvniaValue}
          currency={currency}
          onDollarChange={setDollarValue}
          onHryvniaChange={setHryvniaValue}
          onCurrencyChange={setCurrency}
          onInputChange={refineTableAfterCurrencyChanging}
        />
        <Box sx={{ marginTop: 3 }}>
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              color="success"
              size="large"
              onClick={handleAddButtonClick}
            >
              Add members
            </Button>
            <Button
              variant="contained"
              color="success"
              size="large"
              onClick={() => createTransaction(selectedPersons)}
            >
              Save
            </Button>
          </Stack>
        </Box>
      </Box>
      <hr />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Percent/Rate</TableCell>
              <TableCell>Hryvnia</TableCell>
              <TableCell>Dollar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedPersons.map((row: PersonPayment) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{row.name}</TableCell>
                {row.isPercent ? (
                  <TableCell>{row.rate} %</TableCell>
                ) : (
                  <TableCell>{row.rate}</TableCell>
                )}
                <TableCell>{row.hryvnia}</TableCell>
                <TableCell>{row.dollar}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <AddMembersModal
        open={isAddMembersModalOpen}
        onClose={handleModalClose}
        getSelectedPersons={processTable}
      />
    </div>
  );
}

export default MoneyDistributionPage;
