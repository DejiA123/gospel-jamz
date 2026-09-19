import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

export type RegistrationRow = {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  days_attending: string[];
  group_name: string | null;
  heard_from: string | null;
  notes: string | null;
  created_at: string;
};

export const listRegistrations = createServerFn({ method: "GET" }).handler(
  async (): Promise<RegistrationRow[]> => {
    // On hosts where only build-time VITE_* values exist (e.g. Vercel), fall back to those.
    const url = process.env["SUPABASE_URL"] || import.meta.env["VITE_SUPABASE_URL"];
    const key =
      process.env["SUPABASE_PUBLISHABLE_KEY"] || import.meta.env["VITE_SUPABASE_PUBLISHABLE_KEY"];
    if (!url || !key) {
      console.error("[admin] Missing database configuration on this host");
      throw new Error("Registrations are temporarily unavailable. Please try again later.");
    }

    const request = getRequest();
    const authHeader = request?.headers?.get("authorization") ?? "";
    if (!authHeader.startsWith("Bearer ")) throw new Error("Unauthorized");
    const token = authHeader.slice("Bearer ".length).trim();
    if (!token || token.split(".").length !== 3) throw new Error("Unauthorized");

    const supabase = createClient<Database>(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: {
        headers: { Authorization: `Bearer ${token}` },
        fetch: (input, init) => {
          const h = new Headers(init?.headers);
          if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) {
            h.delete("Authorization");
          }
          h.set("apikey", key);
          return fetch(input, { ...init, headers: h });
        },
      },
    });

    const { data: claimsData, error: claimsError } = await supabase.auth.getClaims(token);
    if (claimsError || !claimsData?.claims?.sub) throw new Error("Unauthorized");
    const userId = claimsData.claims.sub;

    const { data: isAdmin, error: roleError } = await supabase.rpc("has_role", {
      _user_id: userId,
      _role: "admin",
    });
    if (roleError) throw new Error(roleError.message);
    if (!isAdmin) throw new Error("Forbidden");

    const { data, error } = await supabase
      .from("registrations")
      .select("id, full_name, email, phone, days_attending, group_name, heard_from, notes, created_at")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return (data ?? []) as RegistrationRow[];
  },
);
