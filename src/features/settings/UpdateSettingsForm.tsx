// import { useUpdateSetting } from 'features/settings/useUpdateSetting';
import { useRef } from "react";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import useSettings from "./useSettings";
import useUpdateSetting from "./useUpdateSetting";
import toast from "react-hot-toast";

function UpdateSettingsForm() {
  const { settings, isLoading } = useSettings();
  const toastRef = useRef<string | undefined>();
  const { updateSetting, isUpdating } = useUpdateSetting(toastRef);

  if (isLoading || !settings) return <Spinner />;

  const {
    maxBookingLength,
    breakFastPrice,
    maxGuestPerBooking,
    minBookingLength,
  } = settings;

  function handleBlur(
    e: React.FocusEvent<HTMLInputElement, Element>,
    field: string
  ) {
    const { value } = e.target;
    if (!value) return;
    toastRef.current = toast.loading("Updating settings...");
    updateSetting({ [field]: value });
  }

  // This time we are using UNCONTROLLED fields, so we will NOT store state
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          defaultValue={minBookingLength}
          onBlur={(e) => handleBlur(e, "minBookingLength")}
          disabled={isUpdating}
          id="min-nights"
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          defaultValue={maxBookingLength}
          onBlur={(e) => handleBlur(e, "maxBookingLength")}
          disabled={isUpdating}
          id="max-nights"
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          defaultValue={maxGuestPerBooking}
          onBlur={(e) => handleBlur(e, "maxGuestPerBooking")}
          disabled={isUpdating}
          id="max-guests"
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          defaultValue={breakFastPrice}
          onBlur={(e) => handleBlur(e, "breakFastPrice")}
          disabled={isUpdating}
          id="breakfast-price"
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
