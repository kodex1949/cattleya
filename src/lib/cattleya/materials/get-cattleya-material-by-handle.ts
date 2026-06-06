import { createClient } from "@supabase/supabase-js";

import type { CattleyaMaterial } from "./get-cattleya-materials";

export async function getCattleyaMaterialByHandle(
  handle: string,
): Promise<CattleyaMaterial | null> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const { data, error } = await supabase
    .from("cattleya_materials")
    .select(`
      id,
      handle,
      label,
      title,
      description,
      media_type,
      media_url,
      hero_title,
      hero_description,
      hero_media_url
    `)
    .eq("handle", handle)
    .eq("is_active", true)
    .single();

  if (error || !data) {
    return null;
  }

  return data as CattleyaMaterial;
}