import { ReactNode, isValidElement } from "react";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
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
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

type ErrorType =
  | string
  | FieldError
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | Merge<FieldError, FieldErrorsImpl<any>>
  | undefined;

type Props = {
  label?: string;
  error?: ErrorType;
  children: ReactNode;
};

const FormRow = ({ label, error, children }: Props) => {
  console.log(error);
  return (
    <StyledFormRow>
      {label && isValidElement(children) && (
        <Label htmlFor={children.props.id}>{label}</Label>
      )}
      {children}
      {error && <Error>{typeof error === "string" ? error : ""}</Error>}
    </StyledFormRow>
  );
};

export default FormRow;
