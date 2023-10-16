import styled from "styled-components";
import GlobalStyle from "./styles/GlobalStyles";
import Button from "./ui/Button";

const H1 = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
`;

const App = () => {
  return (
    <>
      <GlobalStyle />
      <div>
        <H1>Hello World!</H1>
        <Button onClick={() => alert("checkIn")}>Check In!</Button>
        <Button onClick={() => alert("checkOut")}>Check Out!</Button>
      </div>
    </>
  );
};

export default App;
