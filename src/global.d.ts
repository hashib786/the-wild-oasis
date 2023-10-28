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
  interface Cabin {
    cabinId: number;
    cabinPrice: number;
    cabins: {
      created_at: string;
      description: string;
      discount: number;
      id: number;
      image: string;
      maxCapacity: number;
      name: string;
      regularPrice: number;
    };
  }

  interface Guest {
    countryFlag: string;
    created_at: string;
    email: string;
    fullName: string;
    id: number;
    nationalID: string;
    nationality: string;
  }

  interface Booking {
    hasBreakfast: boolean;
    id: number;
    isPaid: boolean;
    numGuests: number;
    numNights: number;
    observations: string;
    startDate: string;
    endDate: string;
    status: string;
    totalPrice: number;
  }

  interface BookingDataI {
    id: number;
    created_at: string;
    startDate: string;
    endDate: string;
    numGuests: number;
    numNights: number;
    totalPrice: number;
    status: "unconfirmed" | "checked-in" | "checked-out";
    cabins: {
      created_at: string;
      description: string;
      discount: number;
      id: number;
      image: string;
      maxCapacity: number;
      name: string;
      regularPrice: number;
    };
    guests: Guest;
    booking: Booking;
  }
}
const hello = "Hashib";
export default hello;
