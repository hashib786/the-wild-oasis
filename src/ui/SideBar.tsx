import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";

const StyledSideBar = styled.aside`
  padding: 3.2rem 2.4rem;
  grid-row: 1 / -1;
  background-color: var(--color-grey-0);
  border-right: 1px solid var(--color-grey-100);

  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

const SideBar = () => {
  return (
    <StyledSideBar>
      <Logo />
      <MainNav />
    </StyledSideBar>
  );
};

export default SideBar;
