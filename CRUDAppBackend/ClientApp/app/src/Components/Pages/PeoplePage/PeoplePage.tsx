import PeopleTableWithActions from "./PeopleTableWithActions/PeopleTableWithActions";
import AddButtonWithModal from "./AddButtonWithModal";
import "../../../Styles/PeoplePageModals.css";
function PeoplePage() {

  return (
    <div>
      <AddButtonWithModal/>
      <hr />
      <PeopleTableWithActions/>
    </div>
  );
}

export default PeoplePage;