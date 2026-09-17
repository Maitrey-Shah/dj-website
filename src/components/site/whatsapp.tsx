import { cn } from "@/lib/utils";
import { whatsappLink } from "@/data/site";
import { trackEvent } from "@/lib/analytics";

/** Official WhatsApp glyph (brand asset path), not an emoji or text stand-in. */
export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      fill="currentColor"
      className={cn("h-5 w-5", className)}
    >
      <path d="M16.004 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.26.6 4.47 1.73 6.41L3.2 28.8l6.55-1.7a12.74 12.74 0 0 0 6.25 1.62h.01c7.06 0 12.8-5.74 12.8-12.8s-5.75-12.72-12.8-12.72Zm0 23.09h-.01a10.6 10.6 0 0 1-5.4-1.48l-.39-.23-3.88 1.01 1.04-3.78-.25-.39a10.55 10.55 0 0 1-1.62-5.64c0-5.86 4.77-10.63 10.64-10.63a10.57 10.57 0 0 1 10.62 10.64c0 5.86-4.77 10.5-10.63 10.5Zm5.83-7.86c-.32-.16-1.89-.93-2.18-1.04-.29-.11-.5-.16-.71.16-.21.32-.82 1.04-1 1.25-.19.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.58-.95-.85-1.59-1.89-1.78-2.21-.19-.32-.02-.5.14-.66.15-.14.32-.37.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.71-1.72-.98-2.35-.26-.62-.52-.54-.71-.55l-.61-.01c-.21 0-.56.08-.85.4-.29.32-1.11 1.09-1.11 2.65s1.14 3.08 1.3 3.29c.16.21 2.24 3.42 5.43 4.8.76.33 1.35.52 1.81.67.76.24 1.45.21 2 .13.61-.09 1.89-.77 2.16-1.52.27-.75.27-1.39.19-1.52-.08-.13-.29-.21-.61-.37Z" />
    </svg>
  );
}

export function FloatingWhatsApp({ message }: { message: string }) {
  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      onClick={() => trackEvent("click_whatsapp", { source: "floating_button" })}
      className="group fixed right-4 bottom-24 z-50 flex items-center gap-3 sm:right-6 sm:bottom-6"
    >
      <span className="bg-surface-2 text-foreground pointer-events-none hidden rounded-full border px-4 py-2 text-xs font-medium opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100 lg:block">
        Chat with us
      </span>
      <span className="bg-whatsapp text-background flex h-14 w-14 items-center justify-center rounded-full shadow-[0_18px_40px_-12px_rgba(0,0,0,0.9)] transition-transform duration-300 group-hover:scale-105">
        <WhatsAppIcon className="h-7 w-7" />
      </span>
    </a>
  );
}
