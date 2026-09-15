import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Organiser Sign In — Gospel Jamz 2026" },
      {
        name: "description",
        content:
          "Organiser sign in for the Gospel Jamz 2026 registration desk. Team members only.",
      },
      { property: "og:title", content: "Organiser Sign In — Gospel Jamz 2026" },
      {
        property: "og:description",
        content: "Organiser sign in for the Gospel Jamz 2026 registration desk.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [loading, setLoading] = useState(false);

  const field =
    "w-full border-0 border-b border-border bg-transparent py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none";

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") ?? "").trim();
    const password = String(fd.get("password") ?? "");
    if (!email || password.length < 6) {
      toast.error("Enter your email and a password of at least 6 characters");
      return;
    }
    setLoading(true);
    const result =
      mode === "signin"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({
            email,
            password,
            options: { emailRedirectTo: `${window.location.origin}/admin` },
          });
    setLoading(false);

    if (result.error) {
      toast.error(result.error.message);
      return;
    }
    if (mode === "signup" && !result.data.session) {
      toast.success("Check your inbox to confirm your email, then sign in.");
      setMode("signin");
      return;
    }
    navigate({ to: "/admin" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main className="stage-glow pt-32 pb-24">
        <div className="mx-auto max-w-md px-5 md:px-8">
          <p className="eyebrow">Team access</p>
          <h1 className="mt-4 text-4xl leading-[0.95]">
            Organiser <span className="text-primary">sign in</span>.
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">
            This area is for the Gospel Jamz team. Registrations are private.
          </p>

          <form onSubmit={onSubmit} className="mt-10 space-y-7">
            <input name="email" type="email" placeholder="Email address" className={field} required />
            <input
              name="password"
              type="password"
              placeholder="Password"
              className={field}
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center gap-3 bg-primary px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {loading && <Loader2 className="animate-spin" size={16} />}
              {mode === "signin" ? "Sign in" : "Create account"}
            </button>
          </form>

          <button
            type="button"
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            className="mt-6 text-xs uppercase tracking-[0.16em] text-muted-foreground hover:text-foreground"
          >
            {mode === "signin" ? "First time? Create your account" : "Already have an account? Sign in"}
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
