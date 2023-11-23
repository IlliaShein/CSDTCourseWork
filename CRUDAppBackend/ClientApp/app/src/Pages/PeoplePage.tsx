import { createContext, useEffect, useState } from "react";
import PeopleTableWithActions from "../Components/PeopleTableWithActions/PeopleTableWithActions";
import AddButtonWithModal from "../Components/AddButtonWithModal";
import { Person } from "../Interfaces/Person";
import * as Api from "../APIs/Api";
import "../Styles/Modal.css";

interface GetPersonsContextProps {
  updatePersons: () => Promise<void>;
}

export const GetPersonsContext = createContext<GetPersonsContextProps | undefined>(undefined);

function PeoplePage() {
  const [persons, setPersons] = useState<Person[]>([]);

  useEffect(() => {
    updatePersons();
  }, []);

  const updatePersons = async () => {
    const data: Person[] = await Api.GetPersons();
    setPersons(data);
  };

  return (
    <GetPersonsContext.Provider value={{ updatePersons }}>
      <AddButtonWithModal/>
      <hr />
      <PeopleTableWithActions persons={persons} />
    </GetPersonsContext.Provider>
  );
}

export default PeoplePage;