import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { CookieConsent } from "@/components/site/cookie-consent";
import {
  canonical,
  organizationJsonLd,
  pageMeta,
  websiteJsonLd,
} from "@/lib/seo";

function NotFoundComponent() {
  return (
    <div className="grain flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-xl text-center">
        <p className="eyebrow">404</p>
        <h1 className="font-display mt-4 text-5xl font-extrabold uppercase text-foreground sm:text-7xl">
          Lost in the night?
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/"
            hash="events"
            className="bg-heat inline-flex items-center justify-center rounded-full px-8 py-4 text-xs font-bold uppercase tracking-[0.22em] text-primary-foreground"
          >
            Explore Events
          </Link>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full border border-border/70 px-8 py-4 text-xs font-bold uppercase tracking-[0.22em] text-foreground transition-colors hover:bg-surface-2"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      ...pageMeta({
        title: "AWAARA — Desi Events, Concerts & Nightlife in Canada",
        description:
          "Discover premium Desi concerts, DJ nights, live music and unforgettable nightlife experiences with AWAARA across Canada.",
      }),
      // SEO keywords
      {
        name: "keywords",
        content:
          "AWAARA, Desi events Canada, Indian events Canada, Bollywood events Canada, Punjabi events Canada, Desi concerts Toronto, Desi nightlife Toronto, DJ events Canada, Indian concerts Canada, South Asian events Canada",
      },
      { name: "theme-color", content: "#231208" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      canonical("/"),
      // Favicon — AWAARA branded SVG (displays in all modern browsers)
      { rel: "icon", href: "/brand/awaara-favicon.svg", type: "image/svg+xml" },
      // Fallback .ico for older browsers
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      // Apple touch icon
      { rel: "apple-touch-icon", href: "/brand/awaara-apple-touch-icon.png" },
      // Fonts
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify([websiteJsonLd(), organizationJsonLd()]),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
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
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      <CookieConsent />
    </QueryClientProvider>
  );
}
