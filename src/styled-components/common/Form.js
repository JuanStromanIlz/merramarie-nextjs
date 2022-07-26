import styled from "styled-components";

const FormContainer = styled.form`
  .form__wrapper {
    display: flex;
    flex-flow: column nowrap;
    gap: 2rem;
  }
  .formInput {
    display: flex;
    flex-flow: column nowrap;
    input,
    select,
    button,
    textarea {
      appeareance: none;
      resize: none;
      color: ${(props) => props.theme.colors.pink};
      border: none;
      box-shadow: 0 1px 0 0 rgba(255, 255, 255, 0.2);
      background: #000;
      ::placeholder {
        color: ${(props) => props.theme.colors.red};
      }
      option {
        background: #000;
      }
      :focus,
      :hover,
      :active {
        outline: none;
        background: rgba(255, 255, 255, 0.2);
        box-shadow: 0 1px 0 0 ${(props) => props.theme.colors.pink};
      }
    }
    label {
      text-transform: uppercase;
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
      color: ${(props) => props.theme.colors.pink};
    }
    .errorWrapper {
      position: relative;
      opacity: 0;
      transition: opacity 0.3s;
      > div {
        position: absolute;
        inset: 0;
        margin-top: 5px;
        color: ${(props) => props.theme.colors.red};
      }
    }
    .showError {
      opacity: 1;
    }
  }
  .formInput__label {
    flex-direction: row;
    label {
      margin-right: 1rem;
    }
    input {
      background: #000;
    }
  }
  .formInput__images {
    padding-bottom: 3rem;
    input {
      visibility: hidden;
      border: none;
      box-shadow: 0 0 0 0 !important;
    }
    input:before {
      visibility: visible;
      content: "Subir imagenes";
      display: inline-block;
      padding: 0.3rem 1rem;
      border-radius: 25px;
      color: ${(props) => props.theme.colors.pink};
      text-transform: uppercase;
      font-weight: 400;
      border: 1px solid rgba(255, 255, 255, 0.2);
      cursor: pointer;
    }
  }
  /* Styles for validation */
  .errorStyle {
    input,
    select,
    textarea {
      box-shadow: 0 1px 0 0 ${(props) => props.theme.colors.red};
    }
  }
  .okStyle {
    input,
    select,
    textarea {
      box-shadow: 0 1px 0 0 #64b450;
    }
    input:before,
    select:before,
    textarea:before {
      border-color: #64b450;
    }
  }
  .imagesEdit {
    display: grid;
    grid-template-columns: repeat(2, auto);
    grid-gap: 2rem;
    .imageSelect {
      position: relative;
      input {
        inset: 0;
        margin-top: 1rem;
        margin-left: 1rem;
        transform: scale(1.5);
      }
      label {
        position: absolute;
        inset: 0;
      }
      label:hover {
        box-shadow: 0 0 0 1px ${(props) => props.theme.colors.pink};
      }
      img {
        height: 100%;
        width: 100%;
        object-fit: scale-down;
      }
    }
  }
  button {
    border: none;
    width: fit-content;
    background: ${(props) => props.theme.colors.red};
    padding: 0.3rem 1rem;
    border-radius: 25px;
    box-shadow: 0 0 1px 1px ${(props) => props.theme.colors.pink};
    transition: 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    span {
      text-transform: uppercase;
      font-weight: 400;
      color: ${(props) => props.theme.colors.pink};
    }
  }
  @media (hover: hover) {
    button:hover {
      transform: scale(0.9);
    }
    input:hover:before {
      border-color: ${(props) => props.theme.colors.pink};
    }
  }
  @media (min-width: 920px) {
    .formInput {
      max-width: 60% !important;
    }
    .imagesEdit {
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)) !important;
    }
  }
`;

const Form = ({ children, onSubmit }) => {
  return (
    <FormContainer onSubmit={onSubmit}>
      <div className="form__wrapper">{children}</div>
    </FormContainer>
  );
};

export default Form;
