import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, ArrowRight, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="bg-primary py-3 px-6 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2">
          <Mail className="h-7 w-7 text-primary-foreground" />
          <span className="text-xl font-bold text-primary-foreground tracking-tight">GMX</span>
        </div>
        <button
          onClick={() => navigate("/admin")}
          className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors"
        >
          Admin
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md shadow-lg border-border">
          <CardContent className="p-8">
            {!submitted ? (
              <>
                <div className="flex items-center gap-3 mb-6">
                  <ShieldCheck className="h-8 w-8 text-primary" />
                  <h1 className="text-2xl font-bold text-foreground">
                    Passwort zurücksetzen
                  </h1>
                </div>

                <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                  Geben Sie Ihre E-Mail-Adresse oder Ihren Benutzernamen ein. 
                  Wir senden Ihnen einen Link zum Zurücksetzen Ihres Passworts.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-foreground mb-1.5"
                    >
                      E-Mail-Adresse oder Benutzername
                    </label>
                    <Input
                      id="email"
                      type="text"
                      placeholder="beispiel@gmx.de"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-11"
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full h-11 text-base font-semibold gap-2">
                    Weiter
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </form>

                <div className="mt-6 pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground text-center leading-relaxed">
                    Falls Sie keinen Zugriff mehr auf Ihre hinterlegte 
                    Kontakt-E-Mail-Adresse oder Mobiltelefonnummer haben, 
                    wenden Sie sich bitte an den Kundenservice.
                  </p>
                </div>
              </>
            ) : (
              <div className="text-center py-4">
                <ShieldCheck className="h-12 w-12 text-primary mx-auto mb-4" />
                <h2 className="text-xl font-bold text-foreground mb-2">
                  E-Mail gesendet
                </h2>
                <p className="text-muted-foreground text-sm mb-6">
                  Falls ein Konto mit <strong>{email}</strong> existiert, 
                  haben wir Ihnen einen Link zum Zurücksetzen gesendet.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSubmitted(false);
                    setEmail("");
                  }}
                  className="gap-2"
                >
                  Erneut versuchen
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="py-4 px-6 text-center border-t border-border bg-card">
        <p className="text-xs text-muted-foreground">
          © 2026 GMX · Datenschutzhinweise · Impressum · AGB
        </p>
      </footer>
    </div>
  );
};

export default Index;
