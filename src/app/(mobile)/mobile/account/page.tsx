import { redirect } from "next/navigation";

import AccountMobileCattleya from "@/components/mobile/cattleya/account/AccountMobileCattleya";

import { createClient } from "@/lib/supabase/server";

export default async function AccountPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/mobile/sign-in");
  }

  return (
    <main className="min-h-screen bg-[#080706]">
      <AccountMobileCattleya
        email={user.email ?? ""}
      />
    </main>
  );
}