import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

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

export const listRegistrations = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<RegistrationRow[]> => {
    const { data: isAdmin, error: roleError } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (roleError) throw new Error(roleError.message);
    if (!isAdmin) throw new Error("Forbidden");

    const { data, error } = await context.supabase
      .from("registrations")
      .select("id, full_name, email, phone, days_attending, group_name, heard_from, notes, created_at")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return (data ?? []) as RegistrationRow[];
  });
