import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins.js";
import toast from "react-hot-toast";
import { useRef, useState } from "react";
import CreateCabinForm from "./CreateCabinForm.js";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

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
  const [isEditing, setIsEditing] = useState(false);
  const toastRef = useRef<string | undefined>();
  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
  } = cabin;

  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate } = useMutation({
    mutationFn: (id: number) => deleteCabin(id),
    onSuccess: () => {
      toast.dismiss(toastRef.current);
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      toast.success("Cabin deleted successfully");
    },
    onError: (err: Error) => {
      toast.dismiss(toastRef.current);
      console.log(toastRef.current);

      toast.error(err?.message);
    },
  });

  const handleDelete = (id: number) => {
    toastRef.current = toast.loading("Deleting cabin...");
    mutate(id);
  };

  return (
    <>
      <TableRow role="row">
        <Img src={image} alt={`Cabin ${name}`} />
        <Cabin>{name}</Cabin>

        <div>Fits up to {maxCapacity} guests</div>

        <Price>{formatCurrency(regularPrice)}</Price>

        <Discount>{formatCurrency(discount)}</Discount>
        <div className="">
          <button
            onClick={() => setIsEditing(!isEditing)}
            disabled={isDeleting}
          >
            Edit
          </button>
          <button onClick={() => handleDelete(cabinId)} disabled={isDeleting}>
            Delete
          </button>
        </div>
      </TableRow>
      {isEditing && <CreateCabinForm cabin={cabin} />}
    </>
  );
};

export default CabinRow;
