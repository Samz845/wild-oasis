import { HiOutlineChartBar, HiOutlineScale } from "react-icons/hi";
import Stat from "./Stat";
import { HiOutlineBanknotes, HiOutlineCalendarDays } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";
import styled from "styled-components";

const StyledStats = styled.div`
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.6rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    /* On phones show a horizontal, scrollable strip */
    display: flex;
    flex-direction: row;
    gap: 1rem;
    padding: 0 1.2rem;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;

    &::-webkit-scrollbar {
      display: none;
    }
    & > * {
      min-width: 14rem;
      flex: 0 0 auto;
    }
  }
`;

function Stats({ bookings, confirmedStays, cabinCount, numDays }) {
  const numOfBookings = bookings.length;

  const sales = bookings.reduce((acc, curr) => acc + curr.totalPrice, 0);

  const checkIns = confirmedStays.length;

  const occupancy =
    confirmedStays.reduce((acc, curr) => acc + curr.numNights, 0) /
    (numDays * cabinCount);

  return (
    <StyledStats>
      <Stat
        title={"bookings"}
        icon={<HiOutlineChartBar />}
        color="blue"
        value={numOfBookings}
      />

      <Stat
        title={"sales"}
        icon={<HiOutlineBanknotes />}
        color="green"
        value={formatCurrency(sales)}
      />

      <Stat
        title={"check-ins"}
        icon={<HiOutlineCalendarDays />}
        color="indigo"
        value={checkIns}
      />

      <Stat
        title={"occupancy rates"}
        icon={<HiOutlineScale />}
        color="silver"
        value={Math.round(occupancy * 100) + "%"}
      />
    </StyledStats>
  );
}

export default Stats;
