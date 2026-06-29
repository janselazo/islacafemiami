export type OrderPlatformKey = "uberEats" | "toast" | "doordash" | "grubhub";

export type OrderPlatform = {
  key: OrderPlatformKey;
  href: string;
};

export const orderPlatforms: OrderPlatform[] = [
  {
    key: "uberEats",
    href: process.env.NEXT_PUBLIC_ORDER_UBER_EATS_URL ?? "#",
  },
  {
    key: "toast",
    href: process.env.NEXT_PUBLIC_ORDER_TOAST_URL ?? "#",
  },
  {
    key: "doordash",
    href: process.env.NEXT_PUBLIC_ORDER_DOORDASH_URL ?? "#",
  },
  {
    key: "grubhub",
    href: process.env.NEXT_PUBLIC_ORDER_GRUBHUB_URL ?? "#",
  },
];
