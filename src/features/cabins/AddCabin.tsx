import { useState } from "react";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

const AddCabin = () => {
  const [isCreating, setIsCreating] = useState(false);
  return (
    <div>
      <Button onClick={() => setIsCreating(!isCreating)}>Add New Cabin</Button>
      {isCreating && (
        <Modal onClose={() => setIsCreating(false)}>
          <CreateCabinForm onClose={() => setIsCreating(false)} />
        </Modal>
      )}
    </div>
  );
};

export default AddCabin;
