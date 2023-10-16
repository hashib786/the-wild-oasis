import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar";
import styled from "styled-components";

const StyledLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const Main = styled.main`
  background-color: var(--color-grey-100);
  padding: 2.4rem 3rem;
`;

const AppLayout = () => {
  return (
    <StyledLayout>
      <Header />
      <SideBar />
      <Main>
        <Outlet />
      </Main>
    </StyledLayout>
  );
};

export default AppLayout;
