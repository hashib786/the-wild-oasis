import supabase from "./supabaseClient";

export const getCabins = async (): Promise<CabinI[]> => {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  if (!data) return [];

  return data;
};
