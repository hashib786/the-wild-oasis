import supabase, { supabaseUrl } from "./supabaseClient";

export const createCabin = async (data: FormDataI) => {
  const imageName = `${Date.now()}-${Math.random()}-${data.image.name}`;
  const { error, data: createdData } = await supabase
    .from("cabins")
    .insert([
      {
        ...data,
        image: `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`,
      },
    ])
    .select();
  if (error) {
    console.error(error);
    throw new Error("Getting Error when Creating Cabin");
  }

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, data.image);
  if (storageError) {
    const { error: deleteError } = await supabase
      .from("cabins")
      .delete()
      .eq("id", createdData[0].id);
    if (deleteError) {
      console.error(error);
      throw new Error("Getting Error when deleting Cabin");
    }

    console.error(error);
    throw new Error(
      "Getting Error when Uploading Cabin image && Creating Cabin"
    );
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
