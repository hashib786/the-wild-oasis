import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

const { Open, Window } = Modal;

const AddCabin = () => {
  return (
    <>
      <Modal>
        <Open opens="add-cabin">
          <Button>Add New Cabin</Button>
        </Open>
        <Window name="add-cabin">
          <CreateCabinForm />
        </Window>
      </Modal>
    </>
  );
};

export default AddCabin;
