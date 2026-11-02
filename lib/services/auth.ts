import { createSupabaseClient } from "../supabase/client";

const supabase = createSupabaseClient();

export async function loginUser(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error("Email atau password salah");
  }

  return data;
}
