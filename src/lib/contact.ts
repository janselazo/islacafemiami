const DEFAULT_WHATSAPP_NUMBER = "13055550147";

export const GOOGLE_MAPS_PLACE_URL =
  "https://www.google.com/maps/place/Isla+Caf%C3%A9/@25.5902086,-80.3647198,17z/data=!3m1!4b1!4m6!3m5!1s0x88d9c5cb5ae84f77:0x1f09ae5aa86452aa!8m2!3d25.5902086!4d-80.3621449!16s%2Fg%2F11npy929vc?entry=ttu&g_ep=EgoyMDI2MDYyNC4wIKXMDSoASAFQAw%3D%3D";

export const ISLA_CAFE_ADDRESS = "18901 SW 106th Ave, Unit 101, Cutler Bay, FL 33157";

export const GOOGLE_MAPS_EMBED_URL =
  "https://www.google.com/maps?q=18901%20SW%20106th%20Ave%20Unit%20101%20Cutler%20Bay%20FL%2033157&output=embed&z=16";

export const GOOGLE_MAPS_DIRECTIONS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=18901+SW+106th+Ave+Unit+101+Cutler+Bay+FL+33157";

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
