import styled from "styled-components";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import { useMoveBack } from "../../hooks/useMoveBack.js";
import useBooking from "./useBooking.js";
import Spinner from "../../ui/Spinner.js";
import BookingDataBox from "./BookingDataBox.js";
import { useNavigate } from "react-router-dom";
import { useCheckOut } from "../check-in-out/useCheckout.js";
import Modal from "../../ui/Modal.js";
import ConfirmDelete from "../../ui/ConfirmDelete.js";
import { useDeleteBooking } from "./useDeleteBooking.js";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const navigate = useNavigate();
  const { isLoading, booking } = useBooking();
  const { checkOut, isCheckIngOut } = useCheckOut();
  const { deleteBooking, isDeleting } = useDeleteBooking();
  const status = "checked-in";

  const moveBack = useMoveBack();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  if (isLoading) return <Spinner />;
  if (!booking) return null;
  const { id: bookingId } = booking;

  return (
    <Modal>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        <Modal.Open opens="delete">
          <Button>Delete</Button>
        </Modal.Open>
        {booking.status === "checked-in" && (
          <Button disabled={isCheckIngOut} onClick={() => checkOut(bookingId)}>
            Check Out
          </Button>
        )}
        {booking.status === "unconfirmed" && (
          <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
            Check In
          </Button>
        )}
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
      <Modal.Window name="delete">
        <ConfirmDelete
          resourceName="Booking"
          onConfirm={() => deleteBooking(bookingId)}
          disabled={isDeleting}
        />
      </Modal.Window>
    </Modal>
  );
}

export default BookingDetail;
