import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import { submitRegistration } from "@/lib/register.functions";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const DAYS = ["Fri 16 Oct", "Sat 17 Oct", "Sun 18 Oct"];
const DAY_TIMES: Record<string, string> = {
  "Fri 16 Oct": "6PM",
  "Sat 17 Oct": "12PM",
  "Sun 18 Oct": "11AM",
};

const schema = z.object({
  full_name: z.string().trim().min(2, "Please enter your name").max(120),
  email: z.string().trim().email("Enter a valid email address").max(255),
  phone: z.string().trim().max(40).optional(),
  group_name: z.string().trim().max(120).optional(),
  heard_from: z.string().trim().max(120).optional(),
  notes: z.string().trim().max(1000).optional(),
});

export function RegisterForm() {
  const [days, setDays] = useState<string[]>([...DAYS]);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const register = useServerFn(submitRegistration);

  const toggleDay = (d: string) =>
    setDays((cur) => (cur.includes(d) ? cur.filter((x) => x !== d) : [...cur, d]));

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      full_name: String(fd.get("full_name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      group_name: String(fd.get("group_name") ?? ""),
      heard_from: String(fd.get("heard_from") ?? ""),
      notes: String(fd.get("notes") ?? ""),
    });

    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    if (days.length === 0) {
      toast.error("Pick at least one day you're coming");
      return;
    }

    setLoading(true);
    try {
      await register({
        data: {
          full_name: parsed.data.full_name,
          email: parsed.data.email,
          phone: parsed.data.phone || null,
          group_name: parsed.data.group_name || null,
          heard_from: parsed.data.heard_from || null,
          notes: parsed.data.notes || null,
          days_attending: days,
        },
      });
      setDone(true);
      toast.success("You're registered. Check your email!");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="border border-primary bg-card p-10 text-center">
        <CheckCircle2 className="mx-auto text-primary" size={48} />
        <h3 className="mt-6 text-2xl">You&apos;re in.</h3>
        <p className="mt-3 text-sm text-muted-foreground">
          Your spot for Gospel Jamz 2026 is booked. Keep an eye on your inbox — we&apos;ll send the
          full running order closer to the date.
        </p>
      </div>
    );
  }

  const field =
    "w-full border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-hidden";

  return (
    <form onSubmit={onSubmit} className="space-y-7">
      <div className="grid gap-7 sm:grid-cols-2">
        <input name="full_name" placeholder="Full name" className={field} required />
        <input name="email" type="email" placeholder="Email address" className={field} required />
        <input name="phone" placeholder="Phone (optional)" className={field} />
        <input name="group_name" placeholder="Church / group (optional)" className={field} />
      </div>

      <div>
        <p className="eyebrow mb-4">Days attending</p>
        <div className="flex flex-wrap gap-3">
          {DAYS.map((d) => {
            const active = days.includes(d);
            return (
              <Button
                type="button"
                key={d}
                onClick={() => toggleDay(d)}
                aria-pressed={active}
                className={`h-auto rounded-none border px-5 py-3 text-xs font-bold uppercase transition-colors ${
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-transparent text-muted-foreground hover:border-primary hover:bg-transparent hover:text-foreground"
                }`}
              >
                {d} <span className="ml-1 opacity-75 font-normal">({DAY_TIMES[d]})</span>
              </Button>
            );
          })}
        </div>
      </div>

      <input name="heard_from" placeholder="How did you hear about us?" className={field} />
      <textarea
        name="notes"
        rows={3}
        placeholder="Anything we should know? (accessibility, kids, dietary)"
        className={field}
      />

      <Button
        type="submit"
        disabled={loading}
        className="h-auto w-full rounded-none bg-primary px-8 py-4 text-xs font-bold uppercase text-primary-foreground hover:bg-secondary sm:w-auto"
      >
        {loading && <Loader2 className="animate-spin" size={16} />}
        Reserve my place
      </Button>
    </form>
  );
}
