"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import axios from "axios";

export async function login(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  return { success: true };
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;

  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  try {
    // Generate initials from name
    const nameParts = name.split(" ");
    const initials =
      nameParts.length > 1
        ? nameParts
            .map((part) => part[0])
            .join("")
            .slice(0, 2)
        : name.slice(0, 2);

    // Update user profile
    const origin = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    await axios.post(`${origin}/api/user/updateUserByEmail`, {
      email,
      user: {
        name,
        initials: initials.toUpperCase(),
      },
    });

    revalidatePath("/", "layout");
    return { success: true };
  } catch (error) {
    return { error: "Failed to update user profile" };
  }
}

export async function logout() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}
