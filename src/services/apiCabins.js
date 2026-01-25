import supabase, { supabaseUrl } from "./supabase";

export const getCabins = async () => {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    throw new Error("Cabins could not be loaded");
  }
  return data;
};

export const deleteCabin = async (id) => {
  const { error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    throw new Error("Cabin could not be deleted");
  }
};

export const createEditCabin = async (newCabin, id) => {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  //Create the file name
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  //create the file path
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //Insert the cabin data to the database
  let query = supabase.from("cabins");

  // 1. Create new Cabin
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // 2. Edit existing Cabin
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  const { data, error } = await query.select().single();

  if (error) {
    throw new Error("Cabin could not be created");
  }

  //Upload the image to the supabase storage
  if (hasImagePath) return data;

  const { error: imageEError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image); //this contains the imageName and the imagePath(newCabin.image)

  if (imageEError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error("Image could not be uploaded and cabin has been deleted");
  }

  return data;
};

//https://rhpnijgbhkcfntlvbyit.supabase.co/storage/v1/object/public/cabin-images/0.8427169447601015-cabin-002.jpg (this is an example of imagePath)
