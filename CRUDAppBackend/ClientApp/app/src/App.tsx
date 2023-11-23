import Header from "./Components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PeoplePage from "./Pages/PeoplePage";
import MoneyDistributionPage from "./Pages/MoneyDistributionPage";
import HistoryPage from "./Pages/HistoryPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<PeoplePage />} />
        <Route path="money-distribution" element={<MoneyDistributionPage />} />
        <Route path="history" element={<HistoryPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

