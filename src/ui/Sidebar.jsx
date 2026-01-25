import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";
import { HiXMark } from "react-icons/hi2";
import { useRef } from "react";
import { useClick } from "../hooks/useClick";

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);
  grid-row: 1/-1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;

  @media (max-width: 768px) {
    /* On small screens the sidebar becomes an off-canvas drawer */
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 80vw;
    max-width: 28rem;
    padding: 2.4rem;
    transform: translateX(-110%);
    transition: transform 0.25s ease-in-out;
    z-index: 1500;
    box-shadow: var(--shadow-lg);
  }
`;

const CloseButton = styled.button`
  display: none;
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  padding: 0.4rem;

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-600);
  }

  @media (max-width: 768px) {
    display: inline-flex;
  }
`;

function Sidebar({ isOpen, onClose }) {
  const sideBarRef = useRef();
  useClick(sideBarRef, onClose);

  return (
    <StyledSidebar
      style={isOpen ? { transform: "translateX(0)" } : undefined}
      aria-hidden={!isOpen && window.innerWidth <= 768}
      ref={sideBarRef}
    >
      <CloseButton onClick={onClose} aria-label="Close menu">
        <HiXMark />
      </CloseButton>
      <Logo />
      <MainNav />
    </StyledSidebar>
  );
}

export default Sidebar;
