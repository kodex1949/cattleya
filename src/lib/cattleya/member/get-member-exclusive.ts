import "server-only";

import { createClient } from "@supabase/supabase-js";

type MemberExclusive = {
  media_url: string;
  media_type: "image" | "video";
};

export async function getMemberExclusive(): Promise<MemberExclusive | null> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data, error } = await supabase
    .from("member_exclusive")
    .select("media_url, media_type")
    .eq("is_active", true)
    .maybeSingle();

  if (error) return null;

  return data;
}