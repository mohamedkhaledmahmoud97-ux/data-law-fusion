import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Mohamed Khaled Mahmoud — Data Analyst & AI Specialist" },
      { name: "description", content: "Professional Data Analyst at MCIT. LL.M International Law. AI & Data Science specialist. 150+ projects." },
      { name: "author", content: "Mohamed Khaled Mahmoud" },
      { property: "og:title", content: "Mohamed Khaled Mahmoud — Data Analyst & AI Specialist" },
      { property: "og:description", content: "Professional Data Analyst at MCIT. LL.M International Law. AI & Data Science specialist. 150+ projects." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "Mohamed Khaled Mahmoud — Data Analyst & AI Specialist" },
      { name: "twitter:description", content: "Professional Data Analyst at MCIT. LL.M International Law. AI & Data Science specialist. 150+ projects." },
      { property: "og:image", content: "https://mohamedkhaledel-shayp.lovable.app/og-image.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Mohamed Khaled Mahmoud — Data Analyst & AI Specialist · LL.M International Law" },
      { property: "og:url", content: "https://mohamedkhaledel-shayp.lovable.app/" },
      { name: "twitter:image", content: "https://mohamedkhaledel-shayp.lovable.app/og-image.png" },
      { name: "twitter:image:alt", content: "Mohamed Khaled Mahmoud — Data Analyst & AI Specialist" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "canonical", href: "https://mohamedkhaledel-shayp.lovable.app/" },
      { rel: "preconnect", href: "https://mcoylnfztgaqvefyzrsn.supabase.co", crossOrigin: "anonymous" },
      { rel: "dns-prefetch", href: "https://drive.google.com" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
