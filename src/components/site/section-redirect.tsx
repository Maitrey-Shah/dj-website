import { useEffect } from "react";
import { Link } from "@tanstack/react-router";

export function SectionRedirect({ hash, label }: { hash: string; label: string }) {
  useEffect(() => {
    window.location.replace(`/#${hash}`);
  }, [hash]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-5 text-center text-foreground">
      <div>
        <p className="eyebrow">AWAARA</p>
        <h1 className="font-display mt-4 text-4xl font-extrabold uppercase">{label}</h1>
        <p className="text-muted-foreground mt-3">Taking you to the right section.</p>
        <Link
          to="/"
          hash={hash}
          className="bg-heat text-primary-foreground mt-8 inline-block rounded-full px-8 py-4 text-xs font-bold tracking-[0.22em] uppercase"
        >
          Continue
        </Link>
      </div>
    </main>
  );
}
