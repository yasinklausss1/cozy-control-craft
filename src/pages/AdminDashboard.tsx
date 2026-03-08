import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Mail, LogOut, Users, Settings, BarChart3, Power } from "lucide-react";

const AdminDashboard = () => {
  const { isLoggedIn, username, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/admin");
    }
  }, [isLoggedIn, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/admin");
  };

  if (!isLoggedIn) return null;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="bg-primary py-3 px-6 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2">
          <Mail className="h-7 w-7 text-primary-foreground" />
          <span className="text-xl font-bold text-primary-foreground tracking-tight">GMX</span>
          <span className="text-primary-foreground/70 text-sm ml-2">Admin Panel</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-primary-foreground/80 text-sm hidden sm:inline">
            {username}
          </span>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-primary-foreground/90 hover:text-primary-foreground text-sm transition-colors"
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
            { icon: BarChart3, label: "Anfragen heute", value: "89" },
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

        <div className="bg-card rounded-lg border border-border p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Letzte Aktivitäten</h2>
          <div className="space-y-3">
            {[
              { action: "Passwort zurückgesetzt", user: "max@gmx.de", time: "vor 5 Min." },
              { action: "Konto gesperrt", user: "test@gmx.de", time: "vor 12 Min." },
              { action: "Neues Konto erstellt", user: "julia@gmx.de", time: "vor 1 Std." },
              { action: "Passwort zurückgesetzt", user: "info@gmx.de", time: "vor 2 Std." },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <p className="text-sm font-medium text-foreground">{item.action}</p>
                  <p className="text-xs text-muted-foreground">{item.user}</p>
                </div>
                <span className="text-xs text-muted-foreground">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
