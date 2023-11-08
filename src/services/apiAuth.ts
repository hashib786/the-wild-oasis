import supabase from "./supabaseClient";

export const login = async ({ email, password }: LoginI) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  console.log(data);
  return data;
};
