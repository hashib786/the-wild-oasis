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
}

const hello = " asdf";

export default hello;
