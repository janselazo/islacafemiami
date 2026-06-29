const DEFAULT_WHATSAPP_NUMBER = "13055550147";

function normalizeWhatsAppNumber(value: string | undefined): string {
  const digits = (value ?? DEFAULT_WHATSAPP_NUMBER).replace(/\D/g, "");
  return digits || DEFAULT_WHATSAPP_NUMBER;
}

export const WHATSAPP_NUMBER = normalizeWhatsAppNumber(
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
);

export function buildWhatsAppUrl(message: string): string {
  const url = new URL(`https://wa.me/${WHATSAPP_NUMBER}`);

  if (message.trim()) {
    url.searchParams.set("text", message);
  }

  return url.toString();
}
