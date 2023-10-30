import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import { useMoveBack } from "../../hooks/useMoveBack.js";
import useBooking from "../bookings/useBooking.js";
import Spinner from "../../ui/Spinner.js";
import BookingDataBox from "../bookings/BookingDataBox.js";
import Checkbox from "../../ui/Checkbox.js";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const { isLoading, booking } = useBooking();
  const [confirmPaid, setConfirmPaid] = useState(false);
  const moveBack = useMoveBack();

  useEffect(() => {
    setConfirmPaid(() => booking?.isPaid || false);
  }, [booking]);

  function handleCheckin() {
    
  }

  if (isLoading) return <Spinner />;
  if (!booking) return null;

  const {
    id: bookingId,
    guests: { fullName },
  } = booking;
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
          disabled={confirmPaid}
          id="confirm"
        >
          I Confirm that {fullName} has paid the total amount of the booking.
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
