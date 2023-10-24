import { ReactNode, createContext, useContext, useState } from "react";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { HiEllipsisVertical } from "react-icons/hi2";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

type PositionT = {
  x: number;
  y: number;
};
const StyledList = styled.ul<{ position: PositionT }>`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

interface IntialStateI {
  openId: number | null;
  close: () => void;
  setPosition: React.Dispatch<React.SetStateAction<PositionT | null>>;
  open: React.Dispatch<React.SetStateAction<number | null>>;
  position: PositionT | null;
}

const IntialState = {
  openId: null,
  close: () => {},
  open: () => {},
  setPosition: () => {},
  position: null,
};

const MenuContext = createContext<IntialStateI>(IntialState);

const Menus = ({ children }: { children: ReactNode }) => {
  const [openId, setOpenId] = useState<number | null>(null);
  const [position, setPosition] = useState<PositionT | null>(null);

  const close = () => setOpenId(null);
  const open = setOpenId;

  return (
    <MenuContext.Provider
      value={{ close, open, position, openId, setPosition }}
    >
      {children}
    </MenuContext.Provider>
  );
};

const Toggle = ({ id }: { id: number }) => {
  const { close, openId, setPosition, open } = useContext(MenuContext);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const targetButton = e.target as HTMLButtonElement;
    const rect = targetButton.closest("button")?.getBoundingClientRect();
    if (!rect) return;

    setPosition({
      x: window.innerWidth - rect.x - rect.width,
      y: rect.y + rect.height + 8,
    });
    openId === null || openId !== id ? open(id) : close();
  };

  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
};

const List = ({ children, id }: { children: ReactNode; id: number }) => {
  const { close, openId, position } = useContext(MenuContext);
  const ref = useOutsideClick<HTMLUListElement>(close);

  if (openId !== id || position === null) return null;

  return (
    <StyledList ref={ref} position={position}>
      {children}
    </StyledList>
  );
};

type ButtonProps = {
  children: ReactNode;
  icon: ReactNode;
  onClick?: () => void;
};
const Button = ({ children, icon, onClick }: ButtonProps) => {
  const { close } = useContext(MenuContext);

  const handleClick = () => {
    onClick?.();
    close();
  };
  return (
    <li>
      <StyledButton onClick={handleClick}>
        {" "}
        {icon} <span>{children}</span>
      </StyledButton>
    </li>
  );
};

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
