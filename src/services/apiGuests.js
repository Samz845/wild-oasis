import supabase from "./supabase";

export const getGuests = async () => {
  const { data, error } = await supabase.from("guests").select("*");
  if (error) {
    throw new Error("guests could not be loaded");
  }
  return data;
};
