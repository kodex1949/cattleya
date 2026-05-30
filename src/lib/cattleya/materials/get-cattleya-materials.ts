import { createClient } from "@supabase/supabase-js";

export type CattleyaMaterial = {
  id: string;
  label: string;
  title: string;
  description: string;
  href: string;
  media_type: "image" | "video";
  media_url: string;
};

export async function getCattleyaMaterials() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return [];
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const { data } = await supabase
    .from("cattleya_materials")
    .select("id, label, title, description, href, media_type, media_url")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  return (data ?? []) as CattleyaMaterial[];
}