import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Mail, Lock, LogIn, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(username, password);
    if (success) {
      navigate("/admin/dashboard");
    } else {
      toast({
        title: "Anmeldung fehlgeschlagen",
        description: "Benutzername oder Passwort ist falsch.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="bg-primary py-3 px-6 flex items-center gap-2 shadow-md">
        <Mail className="h-7 w-7 text-primary-foreground" />
        <span className="text-xl font-bold text-primary-foreground tracking-tight">GMX</span>
        <span className="text-primary-foreground/70 text-sm ml-2">Admin</span>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm bg-card rounded-lg shadow-lg border border-border p-8">
          <div className="flex items-center gap-3 mb-6">
            <Lock className="h-7 w-7 text-primary" />
            <h1 className="text-xl font-bold text-foreground">Admin-Anmeldung</h1>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="admin-user" className="block text-sm font-medium text-foreground mb-1.5">
                Benutzername
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  id="admin-user"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Benutzername"
                  className="w-full h-11 pl-10 pr-3 rounded-md border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="admin-password" className="block text-sm font-medium text-foreground mb-1.5">
                Passwort
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  id="admin-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-11 pl-10 pr-3 rounded-md border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-11 rounded-md bg-primary text-primary-foreground text-base font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            >
              Anmelden
              <LogIn className="h-4 w-4" />
            </button>
          </form>

          <div className="mt-4 text-center">
            <button
              onClick={() => navigate("/")}
              className="text-sm text-primary hover:underline"
            >
              ← Zurück zur Startseite
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminLogin;
