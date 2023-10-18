import supabase, { supabaseUrl } from "./supabaseClient";

export const createEditCabin = async (data: FormDataI, id?: number) => {
  const imageName =
    typeof data.image !== "string"
      ? `${Date.now()}-${Math.random()}-${data.image.name}`
      : "";
  const imagePath =
    typeof data.image === "string"
      ? data.image
      : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // Create/Edit Cabin
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let query = supabase.from("cabins") as any;

  // Create Cabin
  if (!id)
    query = query.insert([
      {
        ...data,
        image: imagePath,
      },
    ]);

  // Edit Cabin
  if (id) query = query.update({ ...data, image: imagePath }).eq("id", id);

  // Actual creating or updating cabins
  const { error, data: workingData } = await query.select();
  if (error) {
    console.error(error);
    throw new Error(`Getting Error when ${id ? "Update" : "Create"} Cabin`);
  }

  // if image is file then upload image file
  if (imageName) {
    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, data.image);

    // if upload image time getting error then delete cabin
    if (storageError) {
      const { error: deleteError } = await supabase
        .from("cabins")
        .delete()
        .eq("id", workingData[0].id);

      if (deleteError) {
        console.error(error);
        throw new Error("Getting Error when deleting Cabin");
      }

      console.error(error);
      throw new Error(
        "Getting Error when Uploading Cabin image && Creating Cabin"
      );
    }
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
