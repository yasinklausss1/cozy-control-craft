import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  username: string | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const ADMIN_USERNAME = "Admin";
const ADMIN_PASSWORD = "101010mX";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("admin_session");
    if (stored === ADMIN_USERNAME) {
      setIsLoggedIn(true);
      setUsername(stored);
    }
  }, []);

  const login = (user: string, pass: string): boolean => {
    if (user === ADMIN_USERNAME && pass === ADMIN_PASSWORD) {
      sessionStorage.setItem("admin_session", user);
      setIsLoggedIn(true);
      setUsername(user);
      return true;
    }
    return false;
  };

  const logout = () => {
    sessionStorage.removeItem("admin_session");
    setIsLoggedIn(false);
    setUsername(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
