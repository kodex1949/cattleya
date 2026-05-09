import { unstable_noStore as noStore } from "next/cache";

import MobileCartPageClient from "@/components/mobile/cattleya/cart/MobileCartPageClient";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default function MobileCartPage() {
  noStore();

  return <MobileCartPageClient />;
}