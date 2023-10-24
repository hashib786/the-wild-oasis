import styled from "styled-components";

const StyledSelect = styled.select<{ type: string }>`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

type Props = {
  type: string;
  options: FilterI[];
  value: string;
  onChange: (value: React.ChangeEvent<HTMLSelectElement>) => void;
};

const Select = ({ type, options, value, onChange }: Props) => {
  return (
    <StyledSelect type={type} value={value} onChange={onChange}>
      {options.map(({ label, value }) => (
        <option value={value} key={value}>
          {label}
        </option>
      ))}
    </StyledSelect>
  );
};

export default Select;
