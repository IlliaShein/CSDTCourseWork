import EditPersonModal from '../../../Modals/EditPersonModal';
import ViewPersonModal from '../../../Modals/ViewPersonMadal';
import { Person } from '../../../../Interfaces/Person';

interface ModalComponentProps {
  modalType: string | null;
  selectedPerson: Person | null;
  onClose: () => void;
}

function PeopleTableModalsComponent({ modalType, selectedPerson, onClose }: ModalComponentProps) {
  return (
    <>
      {modalType === 'edit' && selectedPerson && (
        <EditPersonModal person={selectedPerson} open={true} onClose={onClose} />
      )}
      {modalType === 'view' && selectedPerson && (
        <ViewPersonModal person={selectedPerson} open={true} onClose={onClose} />
      )}
    </>
  );
}

export default PeopleTableModalsComponent;
