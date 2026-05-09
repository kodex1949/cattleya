"use client";

import { useState } from "react";

import MobileCartPanel from "@/components/mobile/cattleya/cart/MobileCartPanel";

export default function MobileCartPageClient() {
  const [open, setOpen] = useState(true);

  return (
    <main className="min-h-screen bg-[#101010] text-white">
      <MobileCartPanel open={open} onClose={() => setOpen(false)} />
    </main>
  );
}