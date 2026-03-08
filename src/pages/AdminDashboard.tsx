import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, LogOut, Users, Settings, BarChart3 } from "lucide-react";
import type { User } from "@supabase/supabase-js";

const AdminDashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
        if (!session?.user) {
          navigate("/admin");
        }
        setLoading(false);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (!session?.user) {
        navigate("/admin");
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Laden...</p>
      </div>
    );
  }

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
            {user?.email}
          </span>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleLogout}
            className="gap-1.5"
          >
            <LogOut className="h-4 w-4" />
            Abmelden
          </Button>
        </div>
      </header>

      <main className="flex-1 p-6 max-w-5xl mx-auto w-full">
        <h1 className="text-2xl font-bold text-foreground mb-6">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="border-border">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Benutzer</p>
                <p className="text-2xl font-bold text-foreground">1.247</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Anfragen heute</p>
                <p className="text-2xl font-bold text-foreground">89</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Settings className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">System</p>
                <p className="text-lg font-semibold text-green-600">Online</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-border">
          <CardContent className="p-6">
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
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminDashboard;
