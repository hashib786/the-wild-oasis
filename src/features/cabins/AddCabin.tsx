import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

const { Open, Window } = Modal;

const AddCabin = () => {
  return (
    <div>
      <Modal>
        <Open opens="add-cabin">
          <Button>Add New Cabin</Button>
        </Open>
        <Window name="add-cabin">
          <CreateCabinForm />
        </Window>
      </Modal>
    </div>
  );
};

export default AddCabin;
