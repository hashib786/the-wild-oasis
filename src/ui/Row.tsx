import styled, { css } from "styled-components";

// Define the type for the `type` prop
interface RowProps {
  type?: "horizontal" | "vertical";
}

const Row = styled.div<RowProps>`
  display: flex;
  ${(props) =>
    props.type === "horizontal" &&
    css`
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    `}
  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
      gap: 1.5rem;
    `}
`;

Row.defaultProps = {
  type: "vertical",
};

export default Row;
