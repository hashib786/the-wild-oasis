import { useState } from "react";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";

const AddCabin = () => {
  const [isCreating, setIsCreating] = useState(false);
  return (
    <div>
      <Button onClick={() => setIsCreating(!isCreating)}>Add New Cabin</Button>
      {isCreating && <CreateCabinForm />}
    </div>
  );
};

export default AddCabin;
