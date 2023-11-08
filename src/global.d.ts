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
    id: number;
    created_at: string;
    startDate: string;
    endDate: string;
    numGuests: number;
    numNights: number;
    totalPrice: number;
    status: "unconfirmed" | "checked-in" | "checked-out";
    cabins: {
      name: string;
    };
    guests: {
      email: string;
      fullName: string;
    };
  }

  interface NewBookingI {
    created_at: string;
    startDate: string;
    endDate: string;
    cabinId: number;
    guestId: number;
    hasBreakfast: boolean;
    observations: string;
    isPaid: boolean;
    numGuests: number;
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
  interface BookingDataI {
    id: number;
    created_at: string;
    startDate: string;
    endDate: string;
    numNights: number;
    numGuests: number;
    cabinPrice: number;
    extrasPrice: number;
    totalPrice: number;
    status: "unconfirmed" | "checked-in" | "checked-out";
    hasBreakfast: boolean;
    isPaid: boolean;
    observations: string;
    cabinId: number;
    guestId: number;
    cabins: {
      id: number;
      created_at: string;
      name: string;
      maxCapacity: number;
      regularPrice: number;
      discount: number;
      description: string;
      image: string;
    };
    guests: {
      id: number;
      created_at: string;
      fullName: string;
      email: string;
      nationalID: string;
      nationality: string;
      countryFlag: string;
      country: string;
    };
  }

  interface LoginI {
    email: string;
    password: string;
  }
}
const hello = "Hashib";
export default hello;
