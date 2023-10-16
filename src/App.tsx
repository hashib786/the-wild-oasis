import GlobalStyle from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Heading from "./ui/Heading";
import Input from "./ui/Input";
import Row from "./ui/Row";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Row>
        <Row type="horizontal">
          <Heading as="h1">Hello World!</Heading>
          <div>
            <Button onClick={() => alert("checkIn")}>Check In!</Button>
            <Button
              variation="secondary"
              size="small"
              onClick={() => alert("checkOut")}
            >
              Check Out!
            </Button>
          </div>
        </Row>
        <Row>
          <Heading as="h2">Hello World!</Heading>
          <Heading as="h3">Hello World!</Heading>
          <div>
            <Input type="text" />
            <Input type="text" />
          </div>
        </Row>
      </Row>
    </>
  );
};

export default App;
