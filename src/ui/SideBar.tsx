import styled from "styled-components";

const StyledSideBar = styled.aside`
  padding: 2.4rem 3rem;
  grid-row: 1 / -1;
  background-color: var(--color-grey-0);
  border-right: 1px solid var(--color-grey-200);
`;

const SideBar = () => {
  return <StyledSideBar>SideBar</StyledSideBar>;
};

export default SideBar;
