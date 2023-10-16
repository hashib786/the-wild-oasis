import supabase from "./supabaseClient";

export const getCabins = async () => {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return data;
};
