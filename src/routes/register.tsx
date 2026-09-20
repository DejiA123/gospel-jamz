import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { RegisterForm } from "@/components/site/RegisterForm";
const flyer = { url: "/flyer.jpg" };

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Register — Gospel Jamz 2026 | To Live Is Christ" },
      {
        name: "description",
        content:
          "Reserve your free place at Gospel Jamz 2026, the youth conference and creative arts festival, 16-18 October. Register in under a minute.",
      },
      { property: "og:title", content: "Register — Gospel Jamz 2026" },
      {
        property: "og:description",
        content: "Reserve your free place at Gospel Jamz 2026, 16-18 October. To live is Christ.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main className="pt-32 pb-20 md:pb-28">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 md:px-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="panel p-6 sm:p-8">
            <p className="eyebrow">Gospel Jamz 2026</p>
            <h1 className="mt-4 text-5xl uppercase leading-[0.95] md:text-6xl">
              Save your <span className="text-primary">seat</span>.
            </h1>
            <p className="mt-6 max-w-md text-muted-foreground">
              Three nights of worship, word and creative arts. Entry is free — registering just
              helps us plan the room, the resources and the food.
            </p>
            <img
              src={flyer.url}
              alt="Gospel Jamz 2026 official flyer"
              loading="lazy"
              className="mt-10 w-full border border-border"
            />
          </div>
          <div className="border-t-4 border-primary bg-card p-6 sm:p-10">
            <RegisterForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
