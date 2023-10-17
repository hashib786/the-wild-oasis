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

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

const AppLayout = () => {
  return (
    <StyledLayout>
      <Header />
      <SideBar />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledLayout>
  );
};

export default AppLayout;
