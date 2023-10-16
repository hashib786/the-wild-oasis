import styled from "styled-components";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 2.4rem 3rem;
  border-bottom: 1px solid var(--color-grey-200);
`;

const Header = () => {
  return <StyledHeader>Header</StyledHeader>;
};

export default Header;
