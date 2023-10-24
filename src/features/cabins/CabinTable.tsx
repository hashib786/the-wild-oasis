import Menus from "../../ui/Menus";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import CabinRow from "./CabinRow";
import useCabins from "./useCabins";

const CabinTable = () => {
  const { isLoading, cabins } = useCabins();

  if (isLoading) return <Spinner />;

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        {cabins && (
          <Table.Body
            data={cabins}
            render={(cabin: CabinI) => (
              <CabinRow key={cabin.id} cabin={cabin} />
            )}
          />
        )}
      </Table>
    </Menus>
  );
};

export default CabinTable;
