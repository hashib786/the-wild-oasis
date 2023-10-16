import GlobalStyle from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Heading from "./ui/Heading";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <div>
        <Heading as="h1">Hello World!</Heading>
        <Button onClick={() => alert("checkIn")}>Check In!</Button>
        <Heading as="h2">Hello World!</Heading>
        <Button onClick={() => alert("checkOut")}>Check Out!</Button>
        <Heading as="h3">Hello World!</Heading>
      </div>
    </>
  );
};

export default App;
