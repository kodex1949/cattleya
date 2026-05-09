export const dynamic = "force-dynamic";

export const revalidate = 0;

import SignInFormMobileCattleya from "@/components/mobile/cattleya/account/SignInFormMobileCattleya";

export default function SignInPage() {
  return (
    <main className="min-h-screen bg-[#f7f3ec]">
      <SignInFormMobileCattleya />
    </main>
  );
}