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
import { useCheckin } from "./useCheckin.js";
import useSettings from "../settings/useSettings.js";
import { formatCurrency } from "../../utils/helpers.js.js";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();
  const { isLoading, booking } = useBooking();
  const [confirmPaid, setConfirmPaid] = useState(false);
  const { checkin, isCheckIn } = useCheckin();
  const [addBreakFast, setAddBreakFast] = useState(false);
  const { isLoading: isSettings, settings } = useSettings();

  useEffect(() => {
    setConfirmPaid(() => booking?.isPaid || false);
  }, [booking]);

  if (isLoading || isSettings) return <Spinner />;
  if (!booking) return null;

  const {
    id: bookingId,
    numNights,
    numGuests,
    hasBreakfast,
    totalPrice,
    guests: { fullName },
  } = booking;

  function handleCheckin() {
    if (!confirmPaid || !bookingId) return;
    if (addBreakFast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakFastPrice,
          totalPrice: totalPrice + optionalBreakFastPrice,
        },
      });
    } else {
      checkin({ bookingId });
    }
  }

  const optionalBreakFastPrice =
    (settings?.breakFastPrice || 1) * numNights * numGuests;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakFast}
            onChange={() => {
              setAddBreakFast((add) => !add);
              setConfirmPaid(false);
            }}
            id="breakFast"
          >
            Want to add a breakfast {optionalBreakFastPrice}?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmPaid || isCheckIn}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
          disabled={confirmPaid}
          id="confirm"
        >
          I Confirm that {fullName} has paid the total amount of{" "}
          {!addBreakFast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(
                totalPrice + optionalBreakFastPrice
              )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                optionalBreakFastPrice
              )})`}
          the booking.
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckIn}>
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
