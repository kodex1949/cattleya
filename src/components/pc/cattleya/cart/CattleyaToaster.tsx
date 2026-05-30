"use client";

import { Toaster } from "sonner";

export default function CattleyaToaster() {
  return (
    <Toaster
      theme="light"
      position="top-right"
      offset={{
        top: "104px",
        right: "32px",
      }}
      duration={6500}
      visibleToasts={3}
      closeButton={false}
      richColors
    />
  );
}