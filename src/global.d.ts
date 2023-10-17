// global/global.d.ts

declare global {
  interface CabinI {
    id: number;
    created_at: string;
    name: string;
    maxCapacity: number;
    regularPrice: number;
    discount: number;
    description: string;
    image: string;
    hello: RootState;
  }

  interface FormData {
    description: string;
    discount: string;
    maxCapacity: string;
    name: string;
    regularPrice: string;
  }
}

const hello = " asdf";

export default hello;
