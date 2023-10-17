import supabase from "./supabaseClient";

export const createCabin = async (data: FormDataI) => {
  const { error } = await supabase.from("cabins").insert([data]).select();

  if (error) {
    console.error(error);
    throw new Error("Getting Error when Creating Cabin");
  }
};

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
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Getting Error when deleting Cabin");
  }
};
