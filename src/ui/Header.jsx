import styled from "styled-components";
import LogOut from "../features/authentication/LogOut";
import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../features/authentication/UserAvatar";
import { HiBars3 } from "react-icons/hi2";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border: 1px solid var(--color-grey-100);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 2.4rem;

  @media (max-width: 768px) {
    padding: 0.8rem 1.6rem;
    gap: 0.8rem;
  }
`;

const MobileToggle = styled.button`
  display: none;
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }

  @media (max-width: 768px) {
    display: inline-flex;
    margin-right: auto;
  }
`;

function Header({ onToggleSidebar }) {
  return (
    <StyledHeader>
      <MobileToggle onClick={onToggleSidebar} aria-label="Toggle menu">
        <HiBars3 />
      </MobileToggle>
      <UserAvatar />
      <HeaderMenu />
    </StyledHeader>
  );
}

export default Header;
