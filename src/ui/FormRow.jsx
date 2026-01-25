import styled from "styled-components";

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }

  @media (max-width: 480px) {
    /* Stack label, control and error for small screens */
    grid-template-columns: 1fr;
    gap: 0.8rem;
    align-items: stretch;
    padding: 0.8rem 0;

    & > label {
      display: block;
      font-size: 1.4rem;
    }

    /* When there is a button (actions row), keep buttons in a row and right aligned */
    &:has(button) {
      flex-direction: row;
      justify-content: flex-end;
      gap: 0.8rem;
    }

    & > *:not(label) {
      width: 100%;
    }
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function FormRow({ label, error, children }) {
  return (
    <StyledFormRow>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRow;
