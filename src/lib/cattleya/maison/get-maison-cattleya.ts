import { createClient } from "@supabase/supabase-js";

export type MaisonCattleyaData = {
  eyebrow: string;
  title: string;
  description: string;

  button_label: string;
  button_href: string;

  media_type: "image" | "video";
  media_url: string;

  left_title: string;
  left_content: string;

  right_title: string;
  right_content: string;
};

export async function getMaisonCattleya() {
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL;

  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  const supabase = createClient(
    supabaseUrl,
    supabaseAnonKey,
  );

  const { data } = await supabase
    .from("maison_cattleya")
    .select("*")
    .eq("is_active", true)
    .single();

  return data as MaisonCattleyaData | null;
}