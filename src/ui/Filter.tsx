import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button<{ active: boolean }>`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.active
      ? css`
          background-color: var(--color-brand-600);
          color: var(--color-brand-50);
        `
      : css``}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

type FilterProps = {
  filters: FilterI[];
  filter: string;
};

const Filter = ({ filter, filters }: FilterProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  if (!filters.length) return null;
  const params = searchParams.get(filter) || filters.at(0)?.value;

  const handleClick = (value: string) => {
    searchParams.set(filter, value);
    setSearchParams(searchParams);
  };

  return (
    <StyledFilter>
      {filters.map(({ label, value }) => (
        <FilterButton
          active={params === value}
          disabled={params === value}
          onClick={() => handleClick(value)}
          key={value}
        >
          {label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
};

export default Filter;
