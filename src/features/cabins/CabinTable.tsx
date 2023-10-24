import { useSearchParams } from "react-router-dom";
import Menus from "../../ui/Menus";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import CabinRow from "./CabinRow";
import useCabins from "./useCabins";

const CabinTable = () => {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();

  const discountParams = searchParams.get("discount") || "all";
  let filteredCabins: CabinI[] = [];

  if (isLoading) return <Spinner />;
  if (discountParams === "all") filteredCabins = cabins;
  if (discountParams === "no-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  if (discountParams === "with-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

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
        {filteredCabins && (
          <Table.Body
            data={filteredCabins}
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
