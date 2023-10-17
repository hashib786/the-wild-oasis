import supabase from "./supabaseClient";

export const getCabins = async (): Promise<CabinI[]> => {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Getting Error when fetching Cabins");
  }

  if (!data) return [];

  return data;
};

export const deleteCabin = async (id: number) => {
  const { error, data } = await supabase.from("cabins").delete().eq("id", id);
  console.log(data, id);

  if (error) {
    console.error(error);
    throw new Error("Getting Error when deleting Cabin");
  }
};
