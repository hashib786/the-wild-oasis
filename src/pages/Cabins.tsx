import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import Button from "../ui/Button";
import { useState } from "react";

function Cabins() {
  const [isCreating, setIsCreating] = useState(false);
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter/Sort</p>
      </Row>
      <Row>
        <CabinTable />
        <Button onClick={() => setIsCreating(!isCreating)}>
          Add New Cabin
        </Button>
        {isCreating && <CreateCabinForm />}
      </Row>
    </>
  );
}

export default Cabins;
