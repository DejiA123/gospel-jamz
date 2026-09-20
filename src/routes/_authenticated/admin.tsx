import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Download, Loader2, LogOut, RefreshCw } from "lucide-react";
import { listRegistrations, type RegistrationRow } from "@/lib/registrations.functions";
import { supabase } from "@/integrations/supabase/client";
import { Nav } from "@/components/site/Nav";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Registrations — Gospel Jamz 2026 Organiser Desk" },
      {
        name: "description",
        content: "Private organiser desk: view and export Gospel Jamz 2026 registrations.",
      },
      { property: "og:title", content: "Registrations — Gospel Jamz 2026" },
      {
        property: "og:description",
        content: "Private organiser desk for Gospel Jamz 2026 registrations.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const navigate = useNavigate();
  const fetchRows = useServerFn(listRegistrations);
  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ["registrations"],
    queryFn: () => fetchRows({}),
  });

  const rows = data ?? [];

  const exportExcel = async () => {
    if (rows.length === 0) {
      toast.error("No registrations to export yet");
      return;
    }
    const XLSX = await import("xlsx");
    const sheetRows = rows.map((r: RegistrationRow, i: number) => ({
      "#": i + 1,
      "Full name": r.full_name,
      Email: r.email,
      Phone: r.phone ?? "",
      "Days attending": (r.days_attending ?? []).join(", "),
      "Church / group": r.group_name ?? "",
      "Heard about us from": r.heard_from ?? "",
      Notes: r.notes ?? "",
      "Registered on": new Date(r.created_at).toLocaleString("en-GB"),
    }));
    const sheet = XLSX.utils.json_to_sheet(sheetRows);
    sheet["!cols"] = [
      { wch: 5 },
      { wch: 26 },
      { wch: 30 },
      { wch: 18 },
      { wch: 28 },
      { wch: 24 },
      { wch: 24 },
      { wch: 40 },
      { wch: 22 },
    ];
    sheet["!autofilter"] = { ref: XLSX.utils.encode_range({ s: { r: 0, c: 0 }, e: { r: sheetRows.length, c: 8 } }) };
    const book = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, sheet, "Registrations");
    XLSX.writeFile(book, `gospel-jamz-2026-registrations-${new Date().toISOString().slice(0, 10)}.xlsx`);
    toast.success("Excel file downloaded");
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main className="pt-32 pb-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-6">
            <div>
              <p className="eyebrow">Organiser desk</p>
              <h1 className="mt-3 truncate text-4xl uppercase leading-[0.95]">
                {rows.length} <span className="text-primary">registered</span>.
              </h1>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                onClick={() => refetch()}
                variant="outline"
                className="h-auto rounded-none px-5 py-3 text-xs font-bold uppercase"
              >
                <RefreshCw size={14} className={isFetching ? "animate-spin" : ""} /> Refresh
              </Button>
              <Button
                onClick={exportExcel}
                className="h-auto rounded-none px-5 py-3 text-xs font-bold uppercase hover:bg-secondary"
              >
                <Download size={14} /> Download Excel
              </Button>
              <Button
                onClick={signOut}
                variant="outline"
                className="h-auto rounded-none px-5 py-3 text-xs font-bold uppercase"
              >
                <LogOut size={14} /> Sign out
              </Button>
            </div>
          </div>

          {isLoading && (
            <p className="mt-16 flex items-center gap-3 text-sm text-muted-foreground">
              <Loader2 className="animate-spin" size={16} /> Loading registrations…
            </p>
          )}

          {isError && (
            <p className="mt-16 text-sm text-muted-foreground">
              {String((error as Error)?.message).includes("Forbidden")
                ? "This account isn't an organiser account. Sign in with youths.powerhouse@gmail.com."
                : "Couldn't load registrations. Try refreshing."}
            </p>
          )}

          {!isLoading && !isError && (
            <div className="mt-12 overflow-x-auto border border-border bg-card">
              <table className="w-full min-w-[900px] text-left text-sm">
                <thead className="bg-primary text-primary-foreground">
                  <tr className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                    <th className="p-4">Name</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Phone</th>
                    <th className="p-4">Days</th>
                    <th className="p-4">Church / group</th>
                    <th className="p-4">Registered</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r: RegistrationRow) => (
                    <tr key={r.id} className="border-t border-border align-top">
                      <td className="p-4">{r.full_name}</td>
                      <td className="p-4 text-muted-foreground">{r.email}</td>
                      <td className="p-4 text-muted-foreground">{r.phone ?? "—"}</td>
                      <td className="p-4 text-muted-foreground">
                        {(r.days_attending ?? []).join(", ") || "—"}
                      </td>
                      <td className="p-4 text-muted-foreground">{r.group_name ?? "—"}</td>
                      <td className="p-4 text-muted-foreground">
                        {new Date(r.created_at).toLocaleDateString("en-GB")}
                      </td>
                    </tr>
                  ))}
                  {rows.length === 0 && (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-muted-foreground">
                        No registrations yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
