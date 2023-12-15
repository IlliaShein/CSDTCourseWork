import { Box } from "@mui/material";
import { useState } from "react";
import AddMembersModal from "../../Modals/AddMembersModal/AddMembersModal";
import "../../../Styles/MoneyDistributionPageModals.css";
import { Person } from "../../../Interfaces/Person";
import { PersonPayment } from "../../../Interfaces/PersonPayment";
import * as Api from '../../../APIs/HistoryApi';
import MoneyDistributionPageButtons from "./MoneyDistributionPageButtons";
import CurrencyInputs from "./CurrencyInputs";
import MoneyDistributionPageTable from "./MoneyDistributionPageTable";

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

  const createTransaction = () => {
    if(selectedPersons.length !== 0)
    {
      Api.createTransaction(selectedPersons);
    }
  }

  return (
    <div>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <CurrencyInputs
          dollarValue={dollarValue}
          hryvniaValue={hryvniaValue}
          currency={currency}
          onDollarChange={setDollarValue}
          onHryvniaChange={setHryvniaValue}
          onCurrencyChange={setCurrency}
          onInputChange={refineTableAfterCurrencyChanging}
        />
        <MoneyDistributionPageButtons handleAddButtonClick={handleAddButtonClick} createTransaction={createTransaction}/>
      </Box>

      <hr />
      <MoneyDistributionPageTable selectedPersons={selectedPersons} />

      <AddMembersModal
        open={isAddMembersModalOpen}
        onClose={handleModalClose}
        getSelectedPersons={processTable}
      />
    </div>
  );
}

export default MoneyDistributionPage;
