// global/global.d.ts

declare global {
  interface CabinI {
    id: number;
    name: string;
    maxCapacity: number;
    regularPrice: number;
    discount: number;
    description: string;
    image: string;
  }
  interface BookingI {
    id: 1;
    created_at: string;
    startDate: string;
    endDate: string;
    numGuests: 2;
    numNights: 6;
    totalPrice: 320;
    status: "unconfirmed" | "checked-in" | "checked-out";
    cabins: {
      name: string;
    };
    guests: {
      email: string;
      fullName: string;
    };
  }

  interface FormDataGet {
    id: number;
    name: string;
    maxCapacity: number;
    regularPrice: number;
    discount: number;
    description: string;
    image: FileList | string;
  }

  interface FormDataI {
    name: string;
    maxCapacity: number;
    regularPrice: number;
    discount: number;
    description: string;
    image: File | string;
  }

  interface SettingI {
    breakFastPrice: number;
    created_at: string;
    id: number;
    maxBookingLength: number;
    maxGuestPerBooking: number;
    minBookingLength: number;
  }

  interface NewSettingI {
    breakFastPrice?: string;
    maxBookingLength?: string;
    maxGuestPerBooking?: string;
    minBookingLength?: string;
  }

  interface FilterI {
    label: string;
    value: string;
  }
}

const hello = " asdf";

export default hello;
