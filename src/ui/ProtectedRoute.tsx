import { ReactNode, useEffect } from "react";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const FullPage = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-grey-0);
`;

type Props = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
  const navigate = useNavigate();
  // 1. Get current user data
  const { isLoading, isAuthenticated } = useUser();

  // 2. check user is authenticated or not
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate("/login");
    }
  });

  // 3. if isLoading, show spinner

  if (isLoading)
    <FullPage>
      <Spinner />
    </FullPage>;

  // 4. if user then show app
  if (isAuthenticated) return children;
};

export default ProtectedRoute;
