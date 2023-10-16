import styled from "styled-components";

const H1 = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
`;

const Button = styled.button`
  background-color: red;
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  margin: 10px;
`;

const App = () => {
  return (
    <div>
      <H1>Hello World!</H1>
      <Button onClick={() => alert("checkIn")}>Check In!</Button>
      <Button onClick={() => alert("checkOut")}>Check Out!</Button>
    </div>
  );
};

export default App;
