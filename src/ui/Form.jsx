import styled, { css } from "styled-components";

const Form = styled.form`
  ${(props) =>
    props.type === "regular" &&
    css`
      padding: 2.4rem 4rem;

      /* Box */
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);
    `}

  ${(props) =>
    props.type === "modal" &&
    css`
      width: 100%;
      max-width: 80rem;
      max-height: calc(100vh - 12rem);
      overflow: auto;
    `}
    
  overflow: auto;
  /* For non-modal forms we keep overflow visible; modal form handles scrolling */
  font-size: 1.4rem;
`;

export default Form;
