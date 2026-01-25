import { useSearchParams } from "react-router-dom";
import Menus from "../../ui/Menus";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import CabinRow from "./CabinRow";
import { useCabinData } from "./useCabinData";

function CabinTable() {
  //custom react query hook for cabins
  const { cabins, isLoading, cabinError } = useCabinData();
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("discount") || "all";
  const sortBy = searchParams.get("sortBy") || "startDate-asc";

  const cabinsList = cabins || [];
  let filterCabins = cabinsList;

  // 1). FILTER
  if (filterValue === "all") filterCabins = cabinsList;

  if (filterValue === "no-discount")
    filterCabins = cabinsList.filter((cabin) => cabin.discount === 0);

  if (filterValue === "with-discount")
    filterCabins = cabinsList.filter((cabin) => cabin.discount > 0);

  // 2). SORT
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;

  const sortedCabins = filterCabins.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  if (isLoading) return <Spinner />;
  if (!cabins.length) return <Empty resourceName="cabins" />;
  if (cabinError) return <p>{cabinError.message}</p>;

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

        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
