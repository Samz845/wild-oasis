import supabase, { supabaseUrl } from "./supabase";

export const signUp = async ({ fullName, email, password }) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const login = async ({ email, password }) => {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const getCurrentUser = async () => {
  const { data: Session } = await supabase.auth.getSession();
  if (!Session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
};

export const updateCurrentUser = async ({ fullName, password, avatar }) => {
  let updateData;

  //update password or fullName
  if (password) updateData = { password };
  if (fullName)
    updateData = {
      data: { fullName },
    };

  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) throw new Error(error.message);
  if (!avatar) return data;

  //upload avatar if there is any
  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: imageError } = await supabase.storage
    .from("Avatars")
    .upload(fileName, avatar);

  if (imageError) throw new Error(imageError.message);

  //update the user after uploading the avatar
  const { data: updatedUser, error: updatedUserError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/Avatars/${fileName}`,
      },
    });

  if (updatedUserError) throw new Error(updatedUserError.message);

  return updatedUser;
};

//https://rhpnijgbhkcfntlvbyit.supabase.co/storage/v1/object/public/Avatars/avatar-a80f6e0f-9fd9-4161-9500-a224bd3b6d70-0.8652085461094661
