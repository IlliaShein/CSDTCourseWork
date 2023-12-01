import Header from "./Components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PeoplePage from "./Components/Pages/PeoplePage/PeoplePage";
import MoneyDistributionPage from "./Components/Pages/MoneyDistributionPage/MoneyDistributionPage";
import HistoryPage from "./Components/Pages/HistoryPage/HistoryPage";
import { createContext, useEffect, useState } from "react";
import { Person } from "./Interfaces/Person";
import * as Api from "./APIs/Api";

interface GetPersonsContextProps {
  updatePersons: () => Promise<void>;
  persons: Person[];
}

export const GetPersonsContext = createContext<GetPersonsContextProps | undefined>(undefined);

function App() {
  const [persons, setPersons] = useState<Person[]>([]);

  useEffect(() => {
    updatePersons();
  }, []);

  const updatePersons = async () => {
    const data: Person[] = await Api.GetPersons();
    setPersons(data);
  };

  return (
    <GetPersonsContext.Provider value={{ persons, updatePersons }}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<PeoplePage />} />
          <Route path="money-distribution" element={<MoneyDistributionPage />} />
          <Route path="history" element={<HistoryPage />} />
        </Routes>
      </BrowserRouter>
    </GetPersonsContext.Provider>
  );
}

export default App;

