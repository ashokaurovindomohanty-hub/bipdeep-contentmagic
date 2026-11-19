import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { BarChart3, FileText, Loader2, Sparkles, Wand2 } from "lucide-react";

const features = [
  {
    icon: Wand2,
    title: "AI Content Generation",
    description: "Generate posts, captions, stories and more with AI.",
  },
  {
    icon: FileText,
    title: "Smart Templates",
    description: "Start from proven templates for any platform.",
  },
  {
    icon: BarChart3,
    title: "Performance Analytics",
    description: "Track engagement and optimize your content strategy.",
  },
];

export default function LoginPage() {
  const { login, isLoading } = useAuth();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Background gradient accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />
      </div>

      <div
        className="relative w-full max-w-md space-y-6"
        data-ocid="login.page"
      >
        {/* Logo & brand */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-primary shadow-lg">
              <Sparkles className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold font-display text-foreground tracking-tight">
              BipDeep ContentMagic
            </h1>
            <p className="mt-1 text-base text-muted-foreground italic">
              Create. Enchant. Repeat.
            </p>
          </div>
        </div>

        {/* Sign-in card */}
        <Card className="border border-border shadow-lg" data-ocid="login.card">
          <CardContent className="p-6 space-y-5">
            <div className="text-center space-y-1">
              <h2 className="text-lg font-semibold font-display text-foreground">
                Welcome back
              </h2>
              <p className="text-sm text-muted-foreground">
                Sign in with Internet Identity to continue
              </p>
            </div>

            <Button
              className="w-full h-11 button-primary text-base font-semibold"
              onClick={login}
              disabled={isLoading}
              data-ocid="login.sign_in_button"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Sign in with Internet Identity
                </>
              )}
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              Secure, decentralized authentication powered by the Internet
              Computer
            </p>
          </CardContent>
        </Card>

        {/* Features preview */}
        <div className="grid grid-cols-3 gap-3">
          {features.map((feat) => (
            <div
              key={feat.title}
              className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-3 text-center shadow-sm"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <feat.icon className="h-4 w-4 text-primary" />
              </div>
              <p className="text-xs font-medium text-foreground leading-tight">
                {feat.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
