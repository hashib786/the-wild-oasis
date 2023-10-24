import { useSearchParams } from "react-router-dom";
import Menus from "../../ui/Menus";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import CabinRow from "./CabinRow";
import useCabins from "./useCabins";

type SortableFields = keyof CabinI;
const CabinTable = () => {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  const discountParams = searchParams.get("discount") || "all";
  const sortParams = searchParams.get("sortBy");

  let filteredCabins: CabinI[] = [];
  if (discountParams === "all") filteredCabins = cabins;
  if (discountParams === "no-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  if (discountParams === "with-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

  let sortedCabins: CabinI[] = filteredCabins;
  if (sortParams && sortParams.split("-").length === 2) {
    const [field, direction] = sortParams.split("-");
    const modifier = direction === "desc" ? -1 : 1;

    sortedCabins = sortedCabins.sort((a, b) => {
      const aValue = a[field as SortableFields] as number;
      const bValue = b[field as SortableFields] as number;
      return (aValue - bValue) * modifier;
    });
  }

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
        {sortedCabins && (
          <Table.Body
            data={sortedCabins}
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
