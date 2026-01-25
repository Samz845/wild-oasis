import styled from "styled-components";

const DashboardBox = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 3.2rem;

  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

// Reduce padding on small screens
const ResponsiveDashboardBox = styled(DashboardBox)`
  @media (max-width: 480px) {
    padding: 1.2rem;
  }
`;

export { ResponsiveDashboardBox };

export default DashboardBox;
