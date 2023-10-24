import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers.js";
import toast from "react-hot-toast";
import { useRef } from "react";
import CreateCabinForm from "./CreateCabinForm.js";
import useDeleteCabin from "./useDeleteCabin.js";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import useCreateEditCabin from "./useCreateEditCabin.js";
import Modal from "../../ui/Modal.js";
import ConfirmDelete from "../../ui/ConfirmDelete.js";
import Table from "../../ui/Table.js";
import Menus from "../../ui/Menus.js";

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

type Props = {
  cabin: CabinI;
};

const CabinRow = ({ cabin }: Props) => {
  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    description,
  } = cabin;
  const toastRef = useRef<string | undefined>();
  const { isDeleting, deleteCabin } = useDeleteCabin(toastRef);
  const { createEditMutateCabin } = useCreateEditCabin(toastRef);

  const duplicateCabin = () => {
    toastRef.current = toast.loading("Duplicating cabin...");

    createEditMutateCabin({
      cabin: {
        name: `copy Of ${name}`,
        maxCapacity,
        regularPrice,
        discount,
        image,
        description,
      },
    });
  };

  const handleDelete = (id: number) => {
    toastRef.current = toast.loading("Deleting cabin...");
    deleteCabin(id);
  };

  return (
    <Table.Row>
      <Img src={image} alt={`Cabin ${name}`} />
      <Cabin>{name}</Cabin>

      <div>Fits up to {maxCapacity} guests</div>

      <Price>{formatCurrency(regularPrice)}</Price>

      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}

      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={cabinId} />
            <Menus.List id={cabinId}>
              {/* For Duplicate */}
              <Menus.Button icon={<HiSquare2Stack />} onClick={duplicateCabin}>
                Duplicate
              </Menus.Button>

              {/* For Edit */}
              <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencil />}> Edit </Menus.Button>
              </Modal.Open>

              {/* For Delete */}
              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}> Delete </Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="edit">
              <CreateCabinForm cabin={cabin} />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="cabin"
                onConfirm={() => handleDelete(cabinId)}
                disabled={isDeleting}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
};

export default CabinRow;
