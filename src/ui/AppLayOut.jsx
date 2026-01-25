import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import styled from "styled-components";
import { useState } from "react";

const StyledAppLayOut = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;

  @media (max-width: 768px) {
    /* Stack layout on small screens; sidebar will be hidden via its own styles */
    grid-template-columns: 1fr;
    grid-template-rows: auto auto 1fr;
    height: auto;
    min-height: 100vh;
  }

  @media (max-width: 480px) {
    /* Ensure header and main stack cleanly on very small screens */
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
  }
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow: scroll;

  @media (max-width: 768px) {
    padding: 1.6rem 1.6rem 3.2rem;
  }

  @media (max-width: 480px) {
    padding: 1.2rem 1rem 2.4rem;
  }
`;

const Container = styled.div`
  max-width: 110rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  padding: 0 1.6rem;

  @media (min-width: 769px) {
    padding: 0;
  }

  @media (max-width: 480px) {
    gap: 1.6rem;
  }
`;
function AppLayOut() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen((s) => !s);
  return (
    <StyledAppLayOut>
      <Header onToggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayOut>
  );
}

export default AppLayOut;
